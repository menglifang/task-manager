require 'spec_helper'

describe TaskManager::Assignable do
  describe 'associations' do
    it { should belong_to :plan }
    it { should belong_to :assignee }
  end

  describe 'validations' do
    it { should validate_presence_of :plan }
    it { should validate_presence_of :assignee }
  end
end
