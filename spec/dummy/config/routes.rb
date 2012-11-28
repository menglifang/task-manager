Rails.application.routes.draw do

  mount TaskManager::Engine => "/task-manager"
  mount Siesta::Engine => '/' if Rails.env.development?

  resources :extjs
  resources :assignees
end
