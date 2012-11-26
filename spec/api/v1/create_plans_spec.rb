require 'spec_helper'

describe 'API for creating a plan', type: :request do
  context 'with valid params' do
    let(:user) { User.create!(name: 'user for test') }

    let(:params) do
      {
        plan: FactoryGirl.attributes_for(:plan).merge(assignables_attributes: [{
          assignee_id: user.id, assignee_type: 'User'
        }])
      }
    end

    it 'creates a plan successfully' do
      post '/task-manager/api/plans', params.merge(format: :json)

      response.status.should == 201
    end
  end
end

