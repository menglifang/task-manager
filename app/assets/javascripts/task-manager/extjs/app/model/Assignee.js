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
  }
});
