Ext.define('TM.model.Plan', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int' },

    { name: 'name' },
    { name: 'plan_type' },
    { name: 'data', type: 'auto' },
    { name: 'autocompletable', type: 'boolean' },

    { name: 'ahead_of_time', type: 'int' },
    { name: 'begin_to_remind', type: 'int' },

    { name: 'enabled_at', type: 'date' },
    { name: 'last_task_created_at', type: 'date' },

    { name: 'created_at', type: 'date' },
    { name: 'updated_at', type: 'date' },

    { name: 'assignees', type: 'auto' }
  ],

  proxy: {
    type: 'rest',
    url: '/task-manager/api/plans',
    reader: {
      root: 'plans',
      totalProperty: 'total'
    }
  },

  statics: {
    create: function(attrs, opts) {
      var plan = Ext.create('TM.model.Plan', attrs);

      opts = opts || {};
      var success = opts.success;

      Ext.apply(opts, {
        url: '/task-manager/api/plans',
        method: 'POST',
        jsonData: {
          plan: {
            data: {
              x: attrs.dataX,
              y: attrs.dataY,
              ahead_of_time: {
                month: attrs.month,
                quartely_month: attrs.month,
                day: attrs.month,
                weekly_day: attrs.month,
                hour: attrs.month,
                minute: attrs.month
              }
            },
            name: attrs.name,
            plan_type: attrs.plan_type,
            enabled_at: attrs.enabled_at,
            begin_to_remind: attrs.begin_to_remind,
            autocompletable: attrs.autocompletable,
            ahead_of_time: attrs.ahead_of_time,
            assignables_attributes: [{
              assignee_id: 1,
              assignee_type: 'User'
            }],
            callables_attributes: null
          }
        },
        success: function() {
          var obj = Ext.JSON.decode(response.responseText);
          exam.set(obj);
          exam.commit();

          if(success) success.call(opts.scope || this);
        }
      });
      Ext.Ajax.request(opts);

      return plan;
    }
  },

  destroy: function() {
    this.callParent(arguments);

    if(this.store) this.store.remove(this);
  }
});

