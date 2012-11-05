require 'spec_helper'

describe 'API for deleting a plan', type: :request do
  context 'with valid params' do
    let(:user) { User.create!(name: 'user for test') }

    let(:plan) do
      FactoryGirl.create(:plan, assignables_attributes: [{
        assignee_id: user.id, assignee_type: 'User'
      }])
    end

    it 'deletes a plan successfully' do
      delete "/task-manager/api/plans/#{plan.id}", format: :json

      response.status.should == 204
    end
  end
end

