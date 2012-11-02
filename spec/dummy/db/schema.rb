# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121102151448) do

  create_table "task_manager_assignables", :force => true do |t|
    t.integer  "plan_id"
    t.integer  "assignee_id"
    t.string   "assignee_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "task_manager_callables", :force => true do |t|
    t.integer  "callback_id"
    t.string   "callback_type"
    t.integer  "plan_id"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "task_manager_callables", ["callback_id", "callback_type"], :name => "index_task_manager_callables_on_callback_id_and_callback_type"
  add_index "task_manager_callables", ["plan_id"], :name => "index_task_manager_callables_on_plan_id"

  create_table "task_manager_plans", :force => true do |t|
    t.string   "name"
    t.hstore   "data"
    t.boolean  "autocompletable"
    t.string   "plan_type"
    t.integer  "ahead_of_time"
    t.integer  "begin_to_remind"
    t.datetime "enabled_at"
    t.datetime "last_task_created_at"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
  end

end
