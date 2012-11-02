module TaskManager
  class Plan < ActiveRecord::Base
    has_many :assignables
    has_many :assignees, through: :assignables

    has_many :callables
    has_many :callbacks, through: :callables

    serialize :data, ActiveRecord::Coders::Hstore

    attr_accessible :autocompletable, :data, :last_task_created_at, :name

    validates :name, presence: true, uniqueness: true
  end
end
