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
            name: attrs.name,
            plan_type: attrs.plan_type,
            data: {
              x: attrs.data[x],
              y: attrs.data[y]
            },
            enabled_at: attrs.enabled_at,
            ahead_of_time: attrs.ahead_of_time,
            begin_to_remind: attrs.begin_to_remind,
            autocompletable: attrs.autocompletable,
            assignables_attributes: [{
              assignee_id: 1,
              assignee_type: 'User'
            }],
            callables_attributes: null
          }
        }
      });

    }
  }
});
