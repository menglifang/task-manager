module TaskManager
  class Task < ActiveRecord::Base
    extend Enumerize

    has_one :assignable, as: :target
    has_many :callables, as: :target

    enumerize :task_type, in: [:daily, :weekly, :monthly, :quarterly, :yearly]
    enumerize :status, in: [:new, :in_process, :finished]

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
  end
end
