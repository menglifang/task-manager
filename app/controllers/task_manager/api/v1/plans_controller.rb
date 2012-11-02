module TaskManager
  module Api
    module V1
      class PlansController < TaskManager::ApplicationController
        respond_to :json

        def index
          plans = TaskManager::Plan.search(params[:q]).page(params[:page]).per(:limit)

          render json: { plans: plans }, status: :ok
        end

        def create
          plan = TaskManager::Plan.new(params[:plan])

          if plan.save
            render json: plan, status: :created
          else
            render json: { errors: plan.errors }, status: :unprocessable_entity
          end
        end

        def update
          if plan.update_attributes(params[:plan])
            render json: plan, status: :ok
          else
            render json: { errors: plan.errors }, status: :unprocessable_entity
          end
        end

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
