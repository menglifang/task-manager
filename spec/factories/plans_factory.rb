FactoryGirl.define do
  factory :plan, class: TaskManager::Plan do
    sequence(:name) { |n| "plan-#{n}" }
    plan_type { [:daily, :weekly, :monthly, :quarterly, :yearly].sample }
    data {{
      x: ['A', 'B', 'C'],
      y: [1, 2, 3],
      deadline_month: (plan_type == :daily || plan_type == :weekly) ? nil : rand(12)+1,
      deadline_day: plan_type == :daily ? nil : rand(28)+1,
      deadline_hour: rand(23),
      deadline_minute: rand(59)
    }}
    last_task_created_at  {
      case plan_type
      when :daily     then 1.day.ago
      when :weekly    then 1.week.ago
      when :monthly   then 1.month.ago
      when :quarterly then 4.month.ago
      when :yearly    then 1.year.ago
      end
    }
    autocompletable false
    enabled_at { Time.now }
    begin_to_remind 24

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
