//= require ./Shared.js
StartTest(function(t) {
  createForm();

  t.pass('TM.view.plan.Form could be created');

  // Default view
  t.fieldHasValue(planTypeCombo, 'yearly', 'Default value of plan_type is yearly');
  t.fieldHasValue(form.query('textfield[name="begin_to_remind"]')[0], 0, 'Default value of begin_to_remind is 0');

  [
    deadlineMonthCombo, deadlineDayCombo,
    deadlineHourCombo, deadlineMinuteCombo
  ].forEach(function(cmp) {
    t.isElementShow(cmp);
  });

  t.is(
    Ext.getClassName(deadlineMonthCombo.getStore()),
    'TM.store.Months', 'List months of years'
  )
  t.is(
    Ext.getClassName(deadlineDayCombo.getStore()),
    'TM.store.Days', 'List days of months'
  )
  // End default view
});
