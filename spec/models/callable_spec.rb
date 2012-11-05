require 'spec_helper'

describe TaskManager::Callable do
  describe 'associations' do
    it { should belong_to :target }
    it { should belong_to :callback }
  end

  describe 'validations' do
    it { should validate_presence_of :target }
    it { should validate_presence_of :callback }
  end
end
