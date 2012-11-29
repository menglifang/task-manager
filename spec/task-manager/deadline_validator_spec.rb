require 'spec_helper'

class MyPlan
  include ActiveModel::Validations

  attr_accessor :my_plan_type, :data

  validates :data, deadline: true

  def initialize(type, data)
    @my_plan_type, @data = type, data
  end
end

describe DeadlineValidator do
  subject { MyPlan.new(type, {}) }

  shared_examples 'valid validations' do
    its(:valid?) { should be_false }

    specify "has some error messages" do
      subject.valid?
      subject.errors.should have(errors_count).items
    end
  end

  { daily: 2, weekly: 3, monthly: 3, quarterly: 4, yearly: 4 }.each do |k, v|
    context "when given a #{k} plan" do
      let(:type) { k }
      let(:errors_count) { v }

      it_behaves_like 'valid validations'
    end
  end
end
