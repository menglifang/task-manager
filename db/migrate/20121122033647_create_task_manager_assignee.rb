class CreateTaskManagerAssignee < ActiveRecord::Migration
  def change
    create_table :task_manager_assignees do |t|
      t.string :name

      t.timestamps
    end
  end
end
