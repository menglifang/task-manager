Rails.application.routes.draw do

  mount TaskManager::Engine => "/task-manager"
  mount Siesta::Engine => '/'

  resources :extjs
end
