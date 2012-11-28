//= require ./Shared.js
StartTest(function(t) {
  createForm();

  // Change plan_type to monthly
  planTypeCombo.setValue('monthly');

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
    'TM.store.Days', 'List days of months'
  );
  // End change plan_type to monthly
});
