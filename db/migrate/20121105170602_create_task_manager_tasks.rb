class CreateTaskManagerTasks < ActiveRecord::Migration
  def change
    create_table :task_manager_tasks do |t|
      t.string :name
      t.string :task_type
      t.string :status
      t.boolean :autocompletable

      t.hstore :data

      t.timestamp :deadline
      t.timestamp :reminding_at

      t.timestamp :finished_at

      t.timestamps
    end
  end
end
