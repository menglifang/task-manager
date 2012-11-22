Rails.application.routes.draw do

  mount TaskManager::Engine => "/task-manager"
  mount Siesta::Engine => '/'

  resources :extjs
  resources :assignees
end
