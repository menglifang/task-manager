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

ActiveRecord::Schema.define(:version => 20121203030133) do

  create_table "callbacks", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "departments", :force => true do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "task_manager_assignables", :force => true do |t|
    t.integer  "target_id"
    t.string   "target_type"
    t.integer  "assignee_id"
    t.string   "assignee_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "task_manager_assignables", ["assignee_id", "assignee_type"], :name => "index_task_manager_assignables_on_assignee_id_and_assignee_type"
  add_index "task_manager_assignables", ["target_id", "target_type"], :name => "index_task_manager_assignables_on_target_id_and_target_type"

  create_table "task_manager_callables", :force => true do |t|
    t.integer  "callback_id"
    t.string   "callback_type"
    t.integer  "target_id"
    t.string   "target_type"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  add_index "task_manager_callables", ["callback_id", "callback_type"], :name => "index_task_manager_callables_on_callback_id_and_callback_type"
  add_index "task_manager_callables", ["target_id", "target_type"], :name => "index_task_manager_callables_on_target_id_and_target_type"

  create_table "task_manager_plans", :force => true do |t|
    t.string   "name"
    t.hstore   "data"
    t.boolean  "autocompletable"
    t.string   "plan_type"
    t.integer  "begin_to_remind"
    t.datetime "enabled_at"
    t.datetime "last_task_created_at"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
  end

  create_table "task_manager_tasks", :force => true do |t|
    t.string   "name"
    t.string   "task_type"
    t.string   "status"
    t.boolean  "autocompletable"
    t.hstore   "data"
    t.datetime "deadline"
    t.datetime "reminding_at"
    t.datetime "finished_at"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

end
