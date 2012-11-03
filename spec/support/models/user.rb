class User < ActiveRecord::Base
  attr_accessible :name
end

unless User.table_exists?
  ActiveRecord::Base.connection.instance_eval do
    create_table :users do |t|
      t.string :name
    end
  end
end
