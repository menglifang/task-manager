module TaskManager
  class Assignable < ActiveRecord::Base
    belongs_to :target, polymorphic: true
    belongs_to :assignee, polymorphic: true

    validates_presence_of :assignee_id, :assignee_type

    attr_accessible :assignee_id, :assignee_type
  end
end
