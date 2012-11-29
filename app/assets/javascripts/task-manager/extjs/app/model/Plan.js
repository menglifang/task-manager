Ext.define('TM.model.Plan', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int', persist: false },

    { name: 'name' },
    { name: 'plan_type' },
    { name: 'data', type: 'auto' },
    //{ name: 'dataX', convert: function(v, record) {
      //return record.get('data').x;
    //}},
    //{ name: 'dataY', convert: function(v, record) {
      //return record.get('data').y;
    //}},
    //{ name: 'quarterly_month', convert: function(v, record) {
      //if (record.get('plan_type') == 'quarterly') return record.get('data').deadline_month;
      //return null;
    //}},
    //{ name: 'month', convert: function(v, record) {
      //if (record.get('plan_type') == 'yearly') return record.get('data').deadline_month;
      //return null;
    //}},
    //{ name: 'weekly_day', convert: function(v, record) {
      //if (record.get('plan_type') == 'weekly') return record.get('data').deadline_day;
      //return null;
    //}},
    //{ name: 'day', convert: function(v, record) {
      //if (record.get('plan_type') != 'weekly') return record.get('data').deadline_day;
      //return null;
    //}},
    //{ name: 'hour', convert: function(v, record) {
      //return record.get('data').deadline_hour;
    //}},
    //{ name: 'minute', convert: function(v, record) {
      //return record.get('data').deadline_minute;
    //}},
    { name: 'autocompletable', type: 'boolean' },

    { name: 'begin_to_remind', type: 'int' },

    { name: 'enabled_at', type: 'date' },
    { name: 'last_task_created_at', type: 'date' },


    { name: 'created_at', type: 'date', persist: false },
    { name: 'updated_at', type: 'date', persist: false },

    { name: 'assignees', type: 'auto', persist: false },
    { name: 'assignables_attributes', type: 'auto', defaultValue: [] },
    { name: 'callables_attributes', type: 'auto', defaultValue: [] }
  ],

  proxy: {
    type: 'rest',
    url: '/task-manager/api/plans',
    reader: {
      root: 'plans',
      totalProperty: 'total'
    }
  },

  //set: function() {
    //if (typeof arguments[0] === 'object') {
      //this.callParent(arguments);

      //obj = arguments[0];
      //if (obj.data) {
        //this.set('dataX', obj.dataX || obj.data.x);
        //this.set('dataY', obj.dataY || obj.data.y);

        //var planType = this.get('plan_type');
        //if (planType == 'yearly') {
          //this.set('deadline_month', obj.deadline_month || obj.data.deadline_month);
        //} else if (planType == 'quarterly') {
          //// 发送给服务器端时
          //this.set('deadline_month', obj.deadline_quarterly_month);
          //// 从服务器端接收时
          //this.set('deadline_quarterly_month', obj.data.deadline_month);
        //}

        //if (planType == 'monthly') {
          //this.set('deadline_day', obj.deadline_day || obj.data.deadline_day);
        //} else if (planType == 'weekly') {
          //// 发送给服务器端时
          //this.set('deadline_day', obj.deadline_weekly_day);
          //// 从服务器端接收时
          //this.set('deadline_weekly_day', obj.data.deadline_day);
        //} else if (planType != 'daily') {
          //this.set('deadline_day', obj.deadline_day || obj.data.deadline_day);
        //}

        //this.set('deadline_hour', obj.deadline_hour || obj.data.deadline_hour);
        //this.set('deadline_minute', obj.deadline_minute || obj.data.deadline_minute);
      //}
    //} else {
      //this.callParent(arguments);
    //}
  //},

  save: function(opts) {
    var self = this;
    opts = opts || {};
    var success = opts.success;
    opts.success = function(record, operation) {
      self.set(Ext.JSON.decode(operation.response.responseText).plan);
      self.commit();
      if(success) success.call(self);
    };

    this.callParent([opts]);
  },


  update: function(attrs, opts) {
      var self = this;
      var plan = Ext.create('TM.model.Plan', attrs);

      opts = opts || {};
      var success = opts.success;
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
      opts = opts || {};
      var success = opts.success;

      var plan = Ext.create('TM.model.Plan', attrs);

      Ext.apply(opts, {
        url: '/task-manager/api/plans',
        method: 'POST',
        jsonData: {
          plan: plan.getPersistData()
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

