FactoryGirl.define do
  factory :assignable, class: TaskManager::Assignable do
    assignee_id { rand(1000) + 1 }
    assignee_type 'User'
  end
end
