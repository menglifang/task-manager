10.times do |i|
  TaskManager::Assignee.create!(name: "assignee-#{i}")
end
