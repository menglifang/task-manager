# -*- encoding: utf-8 -*-
module TaskManager
  class Task < ActiveRecord::Base
    extend Enumerize

    has_one :assignable, as: :target
    has_many :callables, as: :target

    enumerize :task_type, in: [:daily, :weekly, :monthly, :quarterly, :yearly]
    enumerize :status, in: [:new, :in_process, :expired, :finished]

    serialize :data, ActiveRecord::Coders::Hstore

    default_value_for :status, :new

    attr_accessible :data, :deadline, :name, :reminding_at, :status, :task_type

    validates_presence_of :name, :task_type, :status, :assignable, :deadline

    def assignee
      assignable.assignee
    end

    def callbacks
      callables.collect(&:callback)
    end

    def remindable?
      return false if reminding_at.nil?

      (status == :new || status == :in_process) &&
        (deadline - reminding_at) / 60 >= 2 * 24 * 60 * 60
    end

    def next_reminding_at
      if remindable?
        seconds = (deadline - reminding_at) / 60

        reminding_at.since(seconds)
      end
    end

    # 提醒任务执行者，任务即将到期，并且修改任务下次提醒时间。
    # 如果`next_reminding_at`返回`nil`，则表示该任务不再需要提醒。
    def remind
      Task.transaction do
        assignee.remind_of_expiring_task(self) if assignee.respond_to?(:remind_of_expiring_task)

        update_attributes!(reminding_at: next_reminding_at)
      end
    end

    def expire
      Task.transaction do
        callbacks.each do |c|
          c.call(self) if c.respond_to?(:call)
        end

        update_attributes!(status: :expired)
      end
    end

    class << self
      def active
        where("status = ? OR status = ?", :new, :in_process)
      end

      def just_expired
        active.where("deadline <= ?", Time.now)
      end

      def remindable
        active.where("reminding_at <= ?", Time.now)
      end
    end
  end
end
