class Department < ActiveRecord::Base

  attr_accessible :name, :parent_id
  validates_presence_of :name

end
