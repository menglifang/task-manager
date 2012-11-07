FactoryGirl.define do
  factory :assignable, class: TaskManager::Assignable do
    association :assignee, factory: :user
  end
end
