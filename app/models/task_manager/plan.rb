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
      :name, :plan_type, :ahead_of_time

    validates :name, presence: true, uniqueness: true
    validates :plan_type, presence: true
    validates :ahead_of_time, numericality: { greater_than_or_equal_to: 0 }
  end
end
