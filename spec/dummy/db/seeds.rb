# -*- encoding: utf-8 -*-
2.times do |r|
  root = Department.create!(name: "组织机构-#{r}")
  3.times do |i|
    Department.create!(name: "组织-#{i}", parent_id: root.id)
  end
end

d = Department.all[2]
Department.create!(name: "组织-#{d.id}-1", parent_id: d.id)

10.times { |i| Callback.create!(name: "超时回调－#{i}") }

