Rails.application.routes.draw do

  mount TaskManager::Engine => "/task-manager"
end
