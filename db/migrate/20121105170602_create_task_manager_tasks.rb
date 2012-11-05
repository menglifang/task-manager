class CreateTaskManagerTasks < ActiveRecord::Migration
  def change
    create_table :task_manager_tasks do |t|
      t.string :name
      t.string :task_type
      t.string :status

      t.hstore :data

      t.timestamp :deadline
      s.timestamp :reminding_at

      t.timestamps
    end
  end
end