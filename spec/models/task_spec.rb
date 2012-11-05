require 'spec_helper'

describe TaskManager::Task do
  describe 'associations' do
    it { should have_many :assignables }
    it { should have_many :callables }
  end

  describe 'validations' do
    [:name, :task_type, :status, :assignables, :deadline].each do |a|
      it { should validate_presence_of a }
    end

    it { should ensure_inclusion_of(:task_type).in_array(TaskManager::Task.task_type.values) }
    it { should ensure_inclusion_of(:status).in_array(TaskManager::Task.status.values) }
  end
end
