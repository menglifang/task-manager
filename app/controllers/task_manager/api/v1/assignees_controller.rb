# -*- encoding: utf-8 -*-
module TaskManager
  module Api
    module V1
      class AssigneesController < TaskManager::ApplicationController
        respond_to :json

        def index
          assignees = TaskManager::Assignee.all
          result = {
            total: assignees.count,
            assignees: assignees
          }

          render json: result, status: :ok
        end
      end
    end
  end
end
