//= require ./Shared.js
StartTest(function(t) {
  createForm();

  // Load a monthly plan
  var record = Ext.create('TM.model.Plan', {
    plan_type: 'monthly',
    data: {
      deadline_day: 2,
      deadline_hour: 3,
      deadline_minute: 4
    }
  });

  form.loadRecord(record);

  [
    deadlineDayCombo, deadlineHourCombo, deadlineMinuteCombo
  ].forEach(function(cmp) {
    t.isElementShow(cmp);
  });
  t.isElementHidden(deadlineMonthCombo);

  t.is(
    Ext.getClassName(deadlineDayCombo.getStore()),
    'TM.store.Days', 'List days of months'
  )

  t.fieldHasValue(deadlineMonthCombo, null, 'data.deadline_month is set properly');
  t.fieldHasValue(deadlineDayCombo, 2, 'data.deadline_day is set properly');
  t.fieldHasValue(deadlineHourCombo, 3, 'data.deadline_hour is set properly');
  t.fieldHasValue(deadlineMinuteCombo, 4, 'data.deadline_minute is set properly');
  // End load a monthly plan
});
