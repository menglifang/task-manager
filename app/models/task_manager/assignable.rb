module TaskManager
  class Assignable < ActiveRecord::Base
    belongs_to :plan
    belongs_to :assignee, polymorphic: true

    validates_presence_of :plan, :assignee
  end
end
