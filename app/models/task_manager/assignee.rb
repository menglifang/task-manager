module TaskManager
  class Assignee < ActiveRecord::Base
    validates_presence_of :name

    attr_accessible :name
  end
end
