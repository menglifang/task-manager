//= require ./Shared.js
StartTest(function(t) {
  createForm();

  // Change plan_type to quarterly
  planTypeCombo.setValue('quarterly');

  [
    deadlineMonthCombo, deadlineDayCombo,
    deadlineHourCombo, deadlineMinuteCombo
  ].forEach(function(cmp) {
    t.isElementShow(cmp);
    t.fieldHasValue(cmp, null, cmp.name + ' is set properly');
  });

  t.is(
    Ext.getClassName(deadlineMonthCombo.getStore()),
    'TM.store.QuarterlyMonths', 'List months of quarters'
  );
  t.is(
    Ext.getClassName(deadlineDayCombo.getStore()),
    'TM.store.Days', 'List days of months'
  );
  // End change plan_type to quarterly
});
