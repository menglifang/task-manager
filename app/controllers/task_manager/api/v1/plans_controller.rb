# -*- encoding: utf-8 -*-
module TaskManager
  module Api
    module V1
      class PlansController < TaskManager::ApplicationController
        respond_to :json

        # 查询计划
        #
        # 支持的查询属性有：
        #   name                      计划名
        #   plan_type                 计划类型
        #   autocompletable           是否自动完成
        #   last_task_created_at      最后任务生成时间
        #   enabled_at                生效时间
        #
        # 支持的查询操作参见 https://github.com/ernie/ransack/wiki/Basic-Searching
        #
        # 分页查询参数：
        #   page    请求的页码，缺省值1
        #   limit   每页记录数，缺省值25
        #
        # @example
        #   # 请求
        #   GET /api/plans?q[name_cont]=... HTTP/1.1
        #   Accept: application/vnd.menglifang.com.cn; version=1
        #
        #   # 响应
        #   HTTP/1.1 200 OK
        #   {
        #     "total": ...,
        #     "plans": [{
        #       "id": ...,
        #       "name": ...,
        #       "data": ...,
        #       "plan_type": ...,
        #       "enabled_at": ...,
        #       "last_task_created_at": ...,
        #       "ahead_of_time": ...,
        #       "begin_to_remind": ...,
        #       "autocompletable": ...,
        #       "created_at": ...,
        #       "updated_at": ...,
        #       "assignees": [{
        #         "id": ...,
        #         "name": ...
        #       }, ...]
        #     }, ...]
        #   }
        def index
          plans = TaskManager::Plan.search(params[:q]).result
          result = {
            total: plans.count,
            plans: ActiveModel::ArraySerializer.new(
              plans.page(params[:page]).per(params[:limit])
            ).as_json
          }

          render json: result, status: :ok
        end

        # 创建计划
        #
        # @example
        #   # 请求
        #   POST /api/plans HTTP/1.1
        #   Accept: application/vnd.menglifang.com.cn; version=1
        #
        #   {
        #     "plan": {
        #       "name": ...,                     # 必填且唯一
        #       "plan_type": ...,                # 必填，有效取值：'daily',
        #                                        # 'weekly', 'monthly',
        #                                        # 'quarterly', 'yearly'
        #       "data": ...,                     # 可选
        #       "enabled_at": ...,               # 必填
        #       "ahead_of_time": ...,            # 必填且大于等于0，缺省值为0
        #       "begin_to_remind": ...,          # 必填且小于等于0
        #       "autocompletable": ...,          # 必填，缺省值为false
        #
        #       "assignables_attributes": [{     # 至少需要一个assignable
        #         "assignee_id": ...,
        #         "assignee_type": ...
        #       }, ...],
        #
        #       "callables_attributes": [{       # 可选
        #         "callback_id": ...,
        #         "callback_type": ...
        #       }]
        #     }
        #   }
        #
        #   # 响应
        #   ## 成功
        #   HTTP/1.1 201 Created
        #   {
        #     "id": ...,
        #     "name": ...,
        #     "plan_type": ...,
        #     "data": ...,
        #     "enabled_at": ...,
        #     "ahead_of_time": ...,
        #     "begin_to_remind": ...,
        #     "autocompletable": ...,
        #     "created_at": ...,
        #     "updated_at": ...,
        #     "assignees": [{
        #       "id": ...,
        #       "name": ...
        #     }, ...]
        #   }
        #   ## 失败
        #   HTTP/1.1 422 Unprocessable Entity
        #   {
        #     "errors": {
        #       "name": [...],
        #       ...
        #     }
        #   }
        def create
          plan = TaskManager::Plan.new(params[:plan])

          if plan.save
            render json: plan, status: :created
          else
            render json: { errors: plan.errors }, status: :unprocessable_entity
          end
        end

        # 更新计划
        #
        # @example
        #   # 请求
        #   PUT /api/plans/... HTTP/1.1
        #   Accept: application/vnd.menglifang.com.cn; version=1
        #
        #   {
        #     "plan": {
        #       "name": ...,                     # 必填且唯一
        #       "plan_type": ...,                # 必填，有效取值：'daily',
        #                                        # 'weekly', 'monthly',
        #                                        # 'quarterly', 'yearly'
        #       "data": ...,                     # 可选
        #       "enabled_at": ...,               # 必填
        #       "ahead_of_time": ...,            # 必填且大于等于0，缺省值为0
        #       "begin_to_remind": ...,          # 必填且小于等于0
        #       "autocompletable": ...,          # 必填，缺省值为false
        #
        #       "assignables_attributes": [{
        #         "id": ...,                     ## 可选，
        #                                        ## 如果有，则更新，否则创建
        #         "assignee_id": ...,          ## 必填
        #         "assignee_type": ...,        ## 必填
        #         "_destroy": "1"                ## 可选，
        #                                        ## 如果设置，存在则删除，
        #                                        ## 不存在则忽略
        #       }, ...],
        #
        #       "callables_attributes": [{       # 可选
        #         "id": ...,                     ## 可选，
        #                                        ## 如果有，则更新，否则创建
        #         "callback_id": ...,            ## 必填
        #         "callback_type": ...,          ## 必填
        #         "_destroy": "1"                ## 可选，
        #                                        ## 如果设置，存在则删除，
        #                                        ## 不存在则忽略
        #       }]
        #     }
        #   }
        #
        #   # 响应
        #   ## 成功
        #   HTTP/1.1 202 Accepted
        #   {
        #     "id": ...,
        #     "name": ...,
        #     "plan_type": ...,
        #     "data": ...,
        #     "enabled_at": ...,
        #     "ahead_of_time": ...,
        #     "begin_to_remind": ...,
        #     "autocompletable": ...,
        #     "created_at": ...,
        #     "updated_at": ...,
        #     "assignees": [{
        #       "id": ...,
        #       "name": ...
        #     }, ...]
        #   }
        #   ## 失败
        #   HTTP/1.1 422 Unprocessable Entity
        #   {
        #     "errors": {
        #       "name": [...],
        #       ...
        #     }
        #   }
        def update
          if plan.update_attributes(params[:plan])
            render json: plan, status: :ok
          else
            render json: { errors: plan.errors }, status: :unprocessable_entity
          end
        end

        # 删除计划
        #
        # @example
        #   # 请求
        #   DELETE /api/plans/... HTTP/1.1
        #   Accept: application/vnd.menglifang.com.cn; version=1
        #
        #   # 响应
        #   ## 成功
        #   HTTP/1.1 204 No Content
        def destroy
          plan.destroy

          head :no_content
        end

        private
        def plan
          TaskManager::Plan.find(params[:id])
        end
      end
    end
  end
end
