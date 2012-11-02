class CreateTaskManagerPlans < ActiveRecord::Migration
  def change
    create_table :task_manager_plans do |t|
      t.string :name
      t.hstore :data
      t.timestamp :last_task_created_at
      t.boolean :autocompletable
      t.string :plan_type
      t.integer :ahead_of_time

      t.timestamps
    end
  end
end
