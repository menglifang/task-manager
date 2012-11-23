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

      var assignables_attributes = new Array();
      Ext.Array.forEach(attrs.assignees, function(record, index, assignees) {
        assignables_attributes.push({
          assignee_id: record.get('id'),
          assignee_type: record.get('class_name')
        })
      });

      var callables_attributes = new Array();

      Ext.apply(opts, {
        url: '/task-manager/api/plans',
        method: 'POST',
        jsonData: {
          plan: {
            data: {
              x: attrs.dataX,
              y: attrs.dataY,
              deadline_month: attrs.plan_type == 'quarterly' ? attrs.quarterly_month : attrs.month,
              deadline_day: attrs.plan_type == 'weekly' ? attrs.weekly_day : attrs.day,
              deadline_hour: attrs.hour,
              deadline_minute: attrs.minute
            },
            name: attrs.name,
            plan_type: attrs.plan_type,
            enabled_at: attrs.enabled_at,
            begin_to_remind: attrs.begin_to_remind,
            autocompletable: attrs.autocompletable,
            assignables_attributes: assignables_attributes,
            callables_attributes: callables_attributes
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

