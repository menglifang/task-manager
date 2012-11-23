# -*- encoding: utf-8 -*-
root = Department.create!(name: '组织机构')
3.times do |i|
  root.children.create!(name: "组织-#{i}")
end
