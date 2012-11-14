Rails.application.routes.draw do

  mount TaskManager::Engine => "/task-manager"

  root to: 'home#show'
end
