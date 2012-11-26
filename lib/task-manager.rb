# -*- encoding: utf-8 -*-

require "enumerize"
require "default_value_for"
require "active_model_serializers"

require "task-manager/api_constraints"
require "task-manager/engine"
require "task-manager/deadline_calculator"
require "task-manager/deadline_validator"

module TaskManager

  # 创建计划任务
  #
  # 首先，获取所有需要生成计划任务的计划，参见{TaskManager::Plan.active}。
  # 然后调用{TaskManager::Plan#generate_tasks}生成计划任务。
  def self.generate_tasks
    Plan.active.collect(&:generate_tasks).flatten
  end

  # 找到刚刚过期的计划任务，然后调用{TaskManager::Task#expire}。
  def self.expire_tasks
    tasks = Task.just_expired
    tasks.each(&:expire)

    tasks
  end

  # 通知任务执行者，任务即将到期。参见{TaskManager::Task#remind}
  def self.remind_assignees_of_expiring_tasks
    tasks = Task.remindable
    tasks.each(&:remind)

    tasks
  end
end
