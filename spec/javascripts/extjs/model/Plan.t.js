StartTest(function(t) {
  var validAttributes = {
    name: 'name-' + Math.random(),
    plan_type: 'daily',
    autocompletable: false,
    begin_to_remind: 0,
    enabled_at: new Date(),
    data: {
      x: 'x',
      y: 'y',
      deadline_hour: '3',
      deadline_minute: '13'
    },
    assignables_attributes: [{
      assignee_id: 1,
      assignee_type: 'Department'
    }],
    callables_attributes: []
  };

  var plan = Ext.create('TM.model.Plan', validAttributes);

  t.is(plan.get('id'), 0, 'Id is 0');

  plan.save({
    success: function(record) {
      t.isGreater(plan.get('id'), 0, 'Id is assigned');
    }
  });
});
