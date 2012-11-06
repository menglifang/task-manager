require 'spec_helper'

describe TaskManager::Callable do
  describe 'associations' do
    it { should belong_to :target }
    it { should belong_to :callback }
  end

  describe 'validations' do
    [:callback_id, :callback_type].each do |a|
      it { should validate_presence_of a }
    end
  end
end
