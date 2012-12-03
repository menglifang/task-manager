class CallbacksController < ApplicationController
  respond_to :json

  def index
    callbacks = ::Callback.all.inject([]) { |c, i| c << {id: i.id, name: i.name, class_name: 'Callback'} }

    result = {
      total: callbacks.count,
      callbacks: callbacks
    }

    render json: result, status: :ok
  end
end
