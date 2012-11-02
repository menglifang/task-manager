module TaskManager
  class Plan < ActiveRecord::Base
    serialize :data, ActiveRecord::Coders::Hstore

    attr_accessible :autocompletable, :data, :last_task_created_at, :name
  end
end
