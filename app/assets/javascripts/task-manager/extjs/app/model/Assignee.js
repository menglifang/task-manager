Ext.define('TM.model.Assignee', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int' },
    { name: 'name' },
    { name: 'class_name' }
  ],

  proxy: {
    type: 'rest',
    url: '/assignees',
    reader: {
      root: 'assignees',
      totalProperty: 'total'
    }
  },
});