# -*- encoding: utf-8 -*-
module TaskManager
  class Plan < ActiveRecord::Base
    include TaskManager::DeadlineCalculator
    extend Enumerize

    has_many :assignables, as: :target
    has_many :callables, as: :target

    enumerize :plan_type, in: [:daily, :weekly, :monthly, :quarterly, :yearly]

    serialize :data, ActiveRecord::Coders::Hstore

    accepts_nested_attributes_for :assignables, :callables

    attr_accessible :autocompletable, :data, :last_task_created_at,
      :name, :plan_type, :begin_to_remind, :enabled_at,
      :assignables_attributes, :callables_attributes

    validates_presence_of :name, :plan_type, :begin_to_remind,
      :enabled_at, :assignables
    validates_uniqueness_of :name
    validates_numericality_of :begin_to_remind, greater_than_or_equal_to: 0

    # validate the deadline
    validates :data, presence: true, deadline: true

    def assignees
      assignables.collect(&:assignee)
    end

    def callbacks
      callables.collect(&:callback)
    end

    # 生成计划任务
    #
    # 为每一个计划的执行者创建一个计划任务。
    def generate_tasks
      tasks = []
      Plan.transaction do
        assignables.each do |a|
          tasks << generate_task_for_assignable(a)
        end
      end

      update_attributes(last_task_created_at: Time.now)

      tasks
    end

    def generate_task_for_assignable(a)
      data.symbolize_keys!

      reminding_at = default_deadline.ago(begin_to_remind * 60)
      if autocompletable
        status, finished_at = :finished, Time.now
      else
        status, finished_at = :new, nil
      end

      Task.create! do |t|
        t.name = name
        t.data = { x: data[:x], y: data[:y] }
        t.task_type = plan_type
        t.deadline = calculate_deadline(plan_type, data)
        t.reminding_at = reminding_at
        t.status = status
        t.finished_at = finished_at
        t.create_assignable(
          assignee_id: a.assignee_id,
          assignee_type: a.assignee_type,
        )
        t.callables = callables
      end
    end

    def default_deadline
      now = Time.now
      case plan_type.to_sym
      when :daily then now.end_of_day
      when :weekly then now.end_of_week
      when :monthly then now.end_of_month
      when :quarterly then now.end_of_quarter
      when :yearly then now.end_of_year
      end
    end

    class << self
      # 返回所有需要创建新任务的计划
      #
      # 判断条件：
      # 1) `enabled_at`在当前时间之前；
      # 2) `last_task_created_at`在周期内。
      #   2.1) 日计划：`Time.now.beginning_of_day <= last_task_created_at <= Time.now.end_of_day`
      #   2.2) 周计划：`Time.now.beginning_of_week <= last_task_created_at <= Time.now.end_of_week`
      #   2.3) 月计划：`Time.now.beginning_of_month <= last_task_created_at <= Time.now.end_of_month`
      #   2.4) 季计划：`Time.now.beginning_of_quarter <= last_task_created_at <= Time.now.end_of_quarter`
      #   2.5) 年计划：`Time.now.beginning_of_year <= last_task_created_at <= Time.now.end_of_year`
      def active
        where{
          sift(:active_by_type, 'daily') |
          sift(:active_by_type, 'weekly') |
          sift(:active_by_type, 'monthly') |
          sift(:active_by_type, 'quarterly') |
          sift(:active_by_type, 'yearly')

        }
      end

      def active_by_type(type)
        now = Time.now
        beginning_at = case type.to_sym
                       when :daily then now.beginning_of_day
                       when :weekly then now.beginning_of_week
                       when :monthly then now.beginning_of_month
                       when :quarterly then now.beginning_of_quarter
                       when :yearly then now.beginning_of_year
                       end

        squeel{ (plan_type == type) &
                ((last_task_created_at <= beginning_at) | (last_task_created_at == nil)) &
                (enabled_at <= now) }
      end
    end
  end
end
