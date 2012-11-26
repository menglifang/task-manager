require 'spec_helper'

describe TaskManager do
  describe '.generate_tasks' do
    let(:tasks) { TaskManager.generate_tasks }
    let(:enabled_at) { 1.hour.ago }

    context 'when having an enabled plan' do
      before do
        plan = FactoryGirl.create(:plan_with_assignees, assignees_count: assignees_count, enabled_at: enabled_at)
      end

      context 'and only one assignee exists' do
        let(:assignees_count) { 1 }

        it 'creates only one task' do
          tasks.should have(1).item
        end
      end

      context 'and many assignees exist' do
        let(:assignees_count) { 3 }

        it 'creates a task for each assignee' do
          tasks.should have(3).items
        end
      end
    end

    context 'when having enabled plans' do
      before { FactoryGirl.create_list(:plan_with_assignees, 3, enabled_at: enabled_at) }

      it 'creates tasks for each plan' do
        tasks.should have(3).items
      end
    end

    context 'without any enabled plans' do
      let(:enabled_at) { 1.hour.since }

      before { FactoryGirl.create_list(:plan_with_assignees, 3, enabled_at: enabled_at) }

      it 'does nothing' do
        tasks.should be_empty
      end
    end

    context 'without any plans' do
      it 'does nothing' do
        tasks.should be_empty
      end
    end
  end
end
