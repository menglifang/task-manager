class Department < ActiveRecord::Base
  include ActsAsTree

  acts_as_tree order: "name"

  attr_accessible :name, :parent_id, :children_count

  validates_presence_of :name
end
