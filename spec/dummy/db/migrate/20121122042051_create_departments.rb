class CreateDepartments < ActiveRecord::Migration
  def change
    create_table :departments do |t|
      t.string :name
      t.integer :parent_id
      t.integer :children_count, default: 0

      t.timestamps
    end
  end
end
