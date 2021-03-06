Ext.define('TM.model.Assignee', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int' },
    { name: 'name' },
    { name: 'class_name' },
    { name: 'parent_id', type: 'int' }
  ],

  proxy: {
    type: 'rest',
    url: '/assignees.json',
    reader: {
      root: 'assignees',
      totalProperty: 'total'
    }
  },

  getId: function(detailed) {
    if(detailed) {
      return this.get('class_name') + '-' + this.get('id');
    } else {
      return this.get('id');
    }
  },

  getParentId: function(detailed) {
    if(this.get('parent_id') && detailed) {
      return this.get('class_name') + '-' + this.get('parent_id');
    } else {
      return this.get('parent_id');
    }
  }
});
