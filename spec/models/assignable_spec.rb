require 'spec_helper'

describe TaskManager::Assignable do
  describe 'associations' do
    it { should belong_to :target }
    it { should belong_to :assignee }
  end

  describe 'validations' do
    it { should validate_presence_of :assignee_id }
    it { should validate_presence_of :assignee_type }
  end
end
