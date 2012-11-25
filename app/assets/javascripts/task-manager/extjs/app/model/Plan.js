Ext.define('TM.model.Plan', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int' },

    { name: 'name' },
    { name: 'plan_type' },
    { name: 'data', type: 'auto' },
    { name: 'dataX', convert: function(v, record) {
      return record.get('data').x;
    }},
    { name: 'dataY', convert: function(v, record) {
      return record.get('data').y;
    }},
    { name: 'quarterly_month', convert: function(v, record) {
      if (record.get('plan_type') == 'quarterly') return record.get('data').deadline_month;
      return null;
    }},
    { name: 'month', convert: function(v, record) {
      if (record.get('plan_type') == 'yearly') return record.get('data').deadline_month;
      return null;
    }},
    { name: 'weekly_day', convert: function(v, record) {
      if (record.get('plan_type') == 'weekly') return record.get('data').deadline_day;
      return null;
    }},
    { name: 'day', convert: function(v, record) {
      if (record.get('plan_type') != 'weekly') return record.get('data').deadline_day;
      return null;
    }},
    { name: 'hour', convert: function(v, record) {
      return record.get('data').deadline_hour;
    }},
    { name: 'minute', convert: function(v, record) {
      return record.get('data').deadline_minute;
    }},
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

  update: function(attrs, opts) {
      var self = this;
      var plan = Ext.create('TM.model.Plan', attrs);

      opts = opts || {};
      var success = opts.success;

      var assignables_attributes = [{
        assignee_id: 1,
        assignee_type: 'Department'
      }];

      var callables_attributes = new Array();

      Ext.apply(opts, {
        url: '/task-manager/api/plans/'+this.get('id'),
        method: 'PUT',
        jsonData: {
          plan: {
            data: {
              x: attrs.dataX,
              y: attrs.dataY,
              deadline_month: attrs.plan_type == 'quarterly' ? attrs.quarterly_month : (attrs.plan_type == 'yearly' ? attrs.month : null),
              deadline_day: attrs.plan_type == 'weekly' ? attrs.weekly_day : (attrs.plan_type == 'daily' ? null : attrs.day),
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
        success: function(response) {
          var obj = Ext.JSON.decode(response.responseText);
          self.set(obj.plan);
          self.commit();

          if(success) success.call(opts.scope || this);
        }
      });
      Ext.Ajax.request(opts);

      return plan;
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
              deadline_month: attrs.plan_type == 'quarterly' ? attrs.quarterly_month : (attrs.plan_type == 'yearly' ? attrs.month : null),
              deadline_day: attrs.plan_type == 'weekly' ? attrs.weekly_day : (attrs.plan_type == 'daily' ? null : attrs.day),
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
        success: function(response) {
          var obj = Ext.JSON.decode(response.responseText);
          plan.set(obj.plan);
          plan.commit();

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

