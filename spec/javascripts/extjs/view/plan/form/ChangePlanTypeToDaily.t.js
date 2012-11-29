//= require ./Shared.js
StartTest(function(t) {
  createForm();

  // Change plan_type to daily
  planTypeCombo.setValue('daily');

  [
    deadlineHourCombo, deadlineMinuteCombo
  ].forEach(function(cmp) {
    t.isElementShow(cmp);
    t.fieldHasValue(cmp, null, cmp.name + ' is set properly');
  });

  [deadlineDayCombo, deadlineMonthCombo].forEach(function(cmp) {
    t.isElementHidden(cmp);
    t.fieldHasValue(cmp, null, cmp.name + ' is set properly');
  });
  // End change plan_type to daily
});
