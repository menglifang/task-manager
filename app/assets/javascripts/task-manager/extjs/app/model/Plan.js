Ext.define('TM.model.Plan', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int', persist: false },

    { name: 'name' },
    { name: 'plan_type' },
    { name: 'data', type: 'auto' },
    { name: 'autocompletable', type: 'boolean' },

    { name: 'begin_to_remind', type: 'int' },

    { name: 'enabled_at', type: 'date' },
    { name: 'last_task_created_at', type: 'date' },


    { name: 'created_at', type: 'date', persist: false },
    { name: 'updated_at', type: 'date', persist: false },

    { name: 'assignees', type: 'auto', persist: false, defaultValue: [] },
    { name: 'callbacks', type: 'auto', persist: false, defaultValue: [] },
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

  save: function(opts) {
    var self = this;
    opts = opts || {};
    var success = opts.success;
    opts.success = function(record, operation) {
      self.set(Ext.JSON.decode(operation.response.responseText).plan);
      self.commit();
      if (operation.action === 'create') {
        Ext.getStore('TM.store.Plans').insert(0, self);
      }
      if(success) success.call(self);
    };

    this.callParent([opts]);
  },

  destroy: function() {
    this.callParent(arguments);

    if(this.store) this.store.remove(this);
  }
});

