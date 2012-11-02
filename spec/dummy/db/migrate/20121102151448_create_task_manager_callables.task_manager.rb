# This migration comes from task_manager (originally 20121102150720)
class CreateTaskManagerCallables < ActiveRecord::Migration
  def change
    create_table :task_manager_callables do |t|
      t.belongs_to :callback, polymorphic: true
      t.belongs_to :plan

      t.timestamps
    end

    add_index :task_manager_callables, [:callback_id, :callback_type]
    add_index :task_manager_callables, :plan_id
  end
end
