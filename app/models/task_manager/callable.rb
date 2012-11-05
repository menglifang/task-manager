module TaskManager
  class Callable < ActiveRecord::Base
    belongs_to :callback, polymorphic: true
    belongs_to :target, polymorphic: true

    validates_presence_of :callback_id, :callback_type

    attr_accessible :callback_id, :callback_type
  end
end
