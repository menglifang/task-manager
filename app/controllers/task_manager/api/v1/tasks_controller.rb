# -*- encoding: utf-8 -*-
module TaskManager
  module Api
    module V1
      class TasksController < TaskManager::ApplicationController
        respond_to :json

        # 查询任务
        #
        # 支持的查询属性有：
        #   name                      任务名
        #   task_type                 任务类型
        #   deadline                  截止时间
        #   status                    状态
        #   updated_at                完成时间
        #
        # 支持的查询操作参见 https://github.com/ernie/ransack/wiki/Basic-Searching
        #
        # 分页查询参数：
        #   page    请求的页码，缺省值1
        #   limit   每页记录数，缺省值25
        #
        # @example
        #   # 请求
        #   GET /api/tasks?q[name_cont]=... HTTP/1.1
        #   Accept: application/vnd.menglifang.com.cn; version=1
        #
        #   # 响应
        #   HTTP/1.1 200 OK
        #   {
        #     "total": ...,
        #     "tasks": [{
        #       "id": ...,
        #       "name": ...,
        #       "data": ...,
        #       "task_type": ...,
        #       "deadline": ...,
        #       "status": ...,
        #       "created_at": ...,
        #       "updated_at": ...,
        #       "assignee": {
        #         "id": ...,
        #         "name": ...
        #       }
        #     }, ...]
        #   }
        def index
          tasks = TaskManager::Task.page(params[:page]).per(params[:limit]).
            order('id DESC').search(params[:q]).result
          result = {
            total: tasks.total_count,
            tasks: ActiveModel::ArraySerializer.new(tasks).as_json
          }

          render json: result, status: :ok
        end

        # 删除任务
        #
        # @example
        #   # 请求
        #   DELETE /api/tasks/... HTTP/1.1
        #   Accept: application/vnd.menglifang.com.cn; version=1
        #
        #   # 响应
        #   ## 成功
        #   HTTP/1.1 204 No Content
        def destroy
          task.destroy

          head :no_content
        end

        private
        def task
          TaskManager::Task.find(params[:id])
        end
      end
    end
  end
end
