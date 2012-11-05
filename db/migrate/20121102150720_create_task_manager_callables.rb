class CreateTaskManagerCallables < ActiveRecord::Migration
  def change
    create_table :task_manager_callables do |t|
      t.belongs_to :callback, polymorphic: true
      t.belongs_to :target, polymorphic: true

      t.timestamps
    end

    add_index :task_manager_callables, [:callback_id, :callback_type]
    add_index :task_manager_callables, [:target_id, :target_type]
  end
end
