module TaskManager
  class Plan < ActiveRecord::Base
    extend Enumerize

    has_many :assignables
    has_many :assignees, through: :assignables

    has_many :callables
    has_many :callbacks, through: :callables

    enumerize :plan_type, in: [:daily, :weekly, :monthly, :quarterly, :yearly]

    serialize :data, ActiveRecord::Coders::Hstore

    default_value_for :ahead_of_time, 0

    attr_accessible :autocompletable, :data, :last_task_created_at,
      :name, :plan_type, :ahead_of_time, :begin_to_remind, :enabled_at

    validates_presence_of :name, :plan_type, :begin_to_remind,
      :enabled_at, :assignables
    validates_uniqueness_of :name
    validates_numericality_of :ahead_of_time, greater_than_or_equal_to: 0
    validates_numericality_of :begin_to_remind, less_than_or_equal_to: 0
  end
end
