module TaskManager
  class PlanSerializer < ActiveModel::Serializer
    attributes :id, :name, :plan_type, :data, :enabled_at, :ahead_of_time,
      :begin_to_remind, :autocompletable, :created_at, :updated_at

    has_many :assignees
  end
end
