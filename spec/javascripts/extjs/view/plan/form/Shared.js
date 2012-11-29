var form, planTypeCombo,
    deadlineMonthCombo, deadlineDayCombo,
    deadlineHourCombo, deadlineMinuteCombo;

var createForm = function() {
  form = Ext.create('TM.view.plan.Form', {
    renderTo: Ext.getBody(),
    defaultPlanType: 'yearly',
    defaultBeginToRemind: 0
  });

  planTypeCombo = form.query('combo[name="plan_type"]')[0];

  deadlineMonthCombo = form.query('combo[name="data.deadline_month"]')[0];
  deadlineDayCombo = form.query('combo[name="data.deadline_day"]')[0];
  deadlineHourCombo = form.query('combo[name="data.deadline_hour"]')[0];
  deadlineMinuteCombo = form.query('combo[name="data.deadline_minute"]')[0];
};
