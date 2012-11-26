module TaskManager
  class TaskSerializer < ActiveModel::Serializer
    attributes :id, :name, :task_type, :data, :status,
      :deadline, :created_at, :updated_at

    has_one :assignee
  end
end
