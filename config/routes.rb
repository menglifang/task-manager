TaskManager::Engine.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    scope module: :v1, constraints: TaskManager::ApiConstraints.new(version: 1, default: true) do
      resources :plans
    end
  end
end
