# -*- encoding: utf-8 -*-
class AssigneesController < ApplicationController
  respond_to :json

  def index
    departments = Department.all
    #assignees = departments.inject([]) { |c, i| c << {id: i.id, name: i.name, class_name: i.class.name} }
    assignees = departments.inject([]) { |c, i| c << i.as_json }

    result = {
      total: assignees.count,
      assignees: assignees
    }

    render json: result, status: :ok
  end
end
