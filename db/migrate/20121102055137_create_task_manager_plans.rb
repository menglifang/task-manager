class CreateTaskManagerPlans < ActiveRecord::Migration
  def change
    create_table :task_manager_plans do |t|
      t.string :name
      t.hstore :data
      t.boolean :autocompletable
      t.string :plan_type
      t.integer :begin_to_remind

      t.timestamp :enabled_at
      t.timestamp :last_task_created_at

      t.timestamps
    end
  end
end
