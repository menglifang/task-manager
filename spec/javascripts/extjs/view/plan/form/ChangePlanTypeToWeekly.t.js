//= require ./Shared.js
StartTest(function(t) {
  createForm();

  // Change plan_type to weekly
  planTypeCombo.setValue('weekly');

  [
    deadlineDayCombo,
    deadlineHourCombo, deadlineMinuteCombo
  ].forEach(function(cmp) {
    t.isElementShow(cmp);
    t.fieldHasValue(cmp, null, cmp.name + ' is set properly');
  });

  t.isElementHidden(deadlineMonthCombo);
  t.fieldHasValue(deadlineMonthCombo, null, deadlineMonthCombo.name + ' is set properly');

  t.is(
    Ext.getClassName(deadlineDayCombo.getStore()),
    'TM.store.WeekDays', 'List days of weeks'
  );
  // End change plan_type to weekly
});
