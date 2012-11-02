# This migration comes from task_manager (originally 20121102054723)
class SetupHstore < ActiveRecord::Migration
  def self.up
    execute "CREATE EXTENSION IF NOT EXISTS hstore"
  end

  def self.down
    execute "DROP EXTENSION IF EXISTS hstore"
  end
end
