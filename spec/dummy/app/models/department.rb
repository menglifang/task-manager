class Department < ActiveRecord::Base

  attr_accessible :name, :parent_id
  validates_presence_of :name

  def as_json(opts = {})
    opts[:methods] ||= []
    opts[:methods] << :class_name

    super(opts)
  end

  def class_name
    self.class.name
  end
end
