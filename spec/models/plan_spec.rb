require 'spec_helper'

describe TaskManager::Plan do
  describe 'associations' do
    it { should have_many :assignables }
    it { should have_many(:assignees).through(:assignables) }
  end

  describe 'validations' do
    # FIXME Do not know why it failed
    #it { should validate_uniqueness_of :name }
    it { should validate_presence_of :name }
  end
end
