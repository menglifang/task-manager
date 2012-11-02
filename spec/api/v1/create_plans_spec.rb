require 'spec_helper'

describe 'Creating a plan', type: :request do
  context 'with valid params' do
    let(:params) {{ plan: FactoryGirl.attributes_for(:plan) }}

    it 'creates a plan successfully' do
      post '/task-manager/api/plans', params.merge(format: :json)

      response.status.should == 201
    end
  end
end

