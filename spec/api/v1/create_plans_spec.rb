require 'spec_helper'

describe 'Creating a plan', type: :request do
  context 'with valid params' do
    let(:params) do
      {
        plan: FactoryGirl.attributes_for(:plan).merge(assignables_attributes: [
          FactoryGirl.attributes_for(:assignable),
          FactoryGirl.attributes_for(:assignable)
        ])
      }
    end

    it 'creates a plan successfully' do
      post '/task-manager/api/plans', params.merge(format: :json)

      response.status.should == 201
    end
  end
end

