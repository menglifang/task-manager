# This migration comes from task_manager (originally 20121102142657)
class CreateTaskManagerAssignables < ActiveRecord::Migration
  def change
    create_table :task_manager_assignables do |t|
      t.belongs_to :plan
      t.belongs_to :assignee, polymorphic: true

      t.timestamps
    end
  end
end
