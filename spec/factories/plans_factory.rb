FactoryGirl.define do
  factory :plan, class: TaskManager::Plan do
    name 'A test plan'
    plan_type :daily
    data {{ x: ['A', 'B', 'C'], y: [1, 2, 3] }}
    last_task_created_at 1.day.ago
    autocompletable false
    enabled_at { Time.now }
    begin_to_remind -24

    factory :plan_with_assignees do
      ignore do
        assignees_count 1
      end

      after(:create) do |p, e|
        FactoryGirl.create_list(:assignable, assignees_count, target: p)
      end
    end
  end
end
