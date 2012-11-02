class CreateTaskManagerAssignables < ActiveRecord::Migration
  def change
    create_table :task_manager_assignables do |t|
      t.belongs_to :plan
      t.belongs_to :assignee, polymorphic: true

      t.timestamps
    end

    add_index :task_manager_assignables, [:assignee_id, :assignee_type]
    add_index :task_manager_assignables, :plan_id
  end
end
