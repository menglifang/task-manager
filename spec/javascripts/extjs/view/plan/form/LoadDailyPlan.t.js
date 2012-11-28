//= require ./Shared.js
StartTest(function(t) {
  createForm();

  // Load a daily plan
  var record = Ext.create('TM.model.Plan', {
    plan_type: 'daily',
    data: {
      deadline_hour: 3,
      deadline_minute: 4
    },
    assignables_attributes: [{
      assignee_id: 1,
      assignee_type: 'Department'
    }]
  });

  t.loadStoresAndThen(Ext.getStore('TM.store.Assignees'), function() {
    form.loadRecord(record);

    [deadlineHourCombo, deadlineMinuteCombo].forEach(function(cmp) {
      t.isElementShow(cmp);
    });
    [deadlineMonthCombo, deadlineDayCombo].forEach(function(cmp) {
      t.isElementHidden(cmp);
    });

    t.fieldHasValue(deadlineMonthCombo, null, 'data.deadline_month is set properly');
    t.fieldHasValue(deadlineDayCombo, null, 'data.deadline_day is set properly');
    t.fieldHasValue(deadlineHourCombo, 3, 'data.deadline_hour is set properly');
    t.fieldHasValue(deadlineMinuteCombo, 4, 'data.deadline_minute is set properly');

    var assigneeTreeCombo = t.cq1('assignee_treecombo');
    t.isDeeply(assigneeTreeCombo.getSubmitValue(), [{
        assignee_id: 1,
        assignee_type: 'Department'
      }], 'assignables_attributes is set properly');
  });
  // End load a daily plan
});
