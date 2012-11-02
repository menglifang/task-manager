module TaskManager
  class Callable < ActiveRecord::Base
    belongs_to :callback, polymorphic: true
    belongs_to :plan

    validates :plan, presence: true
    validates :callback, presence: true
  end
end
