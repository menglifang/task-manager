FactoryGirl.define do
  factory :plan, class: TaskManager::Plan do
    sequence(:name) { |n| "plan-#{n}" }
    plan_type [:daily, :weekly, :monthly, :quarterly, :yearly].sample
    data {{
      x: ['A', 'B', 'C'],
      y: [1, 2, 3],
      deadline_month: rand(12)+1,
      deadline_day: rand(28)+1,
      deadline_hour: rand(23),
      deadline_minute: rand(59)
    }}
    last_task_created_at 1.day.ago
    autocompletable false
    enabled_at { Time.now }
    begin_to_remind -24

    factory :plan_with_assignees do
      ignore do
        assignees_count 1
      end

      after(:build) do |p, e|
        p.assignables = FactoryGirl.build_list(:assignable, e.assignees_count, target: p)
      end
    end
  end
end
