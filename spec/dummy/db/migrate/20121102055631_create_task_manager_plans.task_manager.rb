# This migration comes from task_manager (originally 20121102055137)
class CreateTaskManagerPlans < ActiveRecord::Migration
  def change
    create_table :task_manager_plans do |t|
      t.string :name
      t.hstore :data
      t.timestamp :last_task_created_at
      t.boolean :autocompletable

      t.timestamps
    end
  end
end
