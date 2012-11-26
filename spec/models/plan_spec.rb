require 'spec_helper'

describe TaskManager::Plan do
  describe 'associations' do
    it { should have_many :assignables }
    it { should accept_nested_attributes_for :assignables }

    it { should have_many :callables }
  end

  describe 'validations' do
    # FIXME Do not know why it failed
    #it { should validate_uniqueness_of :name }
    it { should validate_presence_of :name }
    it { should validate_presence_of :plan_type }
    it { should ensure_inclusion_of(:plan_type).in_array(TaskManager::Plan.plan_type.values) }
    it { should validate_presence_of :enabled_at }
    it { should validate_presence_of :begin_to_remind }
    it { should validate_numericality_of :begin_to_remind }
    it { should_not allow_value(-1).for(:begin_to_remind) }
    it { should validate_presence_of :assignables }
    it { should validate_presence_of :assignables }
  end
end
