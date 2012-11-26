class CreateTaskManagerAssignables < ActiveRecord::Migration
  def change
    create_table :task_manager_assignables do |t|
      t.belongs_to :target, polymorphic: true
      t.belongs_to :assignee, polymorphic: true

      t.timestamps
    end

    add_index :task_manager_assignables, [:assignee_id, :assignee_type]
    add_index :task_manager_assignables, [:target_id, :target_type]
  end
end
