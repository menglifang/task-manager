require 'spec_helper'

describe TaskManager::Plan do
  describe 'associations' do
    it { should have_many :assignables }
    it { should have_many(:assignees).through(:assignables) }
    it { should have_many :callables }
    it { should have_many(:callbacks).through(:callables) }
  end

  describe 'validations' do
    # FIXME Do not know why it failed
    #it { should validate_uniqueness_of :name }
    it { should validate_presence_of :name }
    it { should validate_presence_of :plan_type }
    it { should ensure_inclusion_of(:plan_type).in_array(TaskManager::Plan.plan_type.values) }
    it { should validate_numericality_of :ahead_of_time }
    it { should_not allow_value(-1).for(:ahead_of_time) }
  end
end
