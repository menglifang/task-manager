# -*- encoding: utf-8 -*-

require "enumerize"
require "default_value_for"
require "active_model_serializers"

require "task-manager/api_constraints"
require "task-manager/engine"

module TaskManager

  # 创建计划任务
  #
  # 首先，获取所有需要生成计划任务的计划，详细方法参见{TaskManager::Plan.active}。
  # 然后调用{TaskManager::Plan#generate_tasks}生成计划任务。
  def self.generate_tasks
    Plan.active.collect(&:generate_tasks).flatten
  end
end
