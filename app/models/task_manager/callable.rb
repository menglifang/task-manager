module TaskManager
  class Callable < ActiveRecord::Base
    belongs_to :callback, polymorphic: true
    belongs_to :target, polymorphic: true

    validates :target, presence: true
    validates :callback, presence: true
  end
end
