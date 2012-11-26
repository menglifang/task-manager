Ext.define('TM.model.Task', {
	extend: 'Ext.data.Model',

	fields: [
		{ name: 'id', type: 'int' },
		{ name: 'name'},
		{ name: 'task_type'},
		{ name: 'data', type: 'auto' },
		{ name: 'status' },
		{ name: 'deadline', type: 'date'},
		{ name: 'created_at', type: 'date' },
    { name: 'updated_at', type: 'date' }
	],

	proxy: {
    type: 'rest',
    url: '/task-manager/api/tasks',
    reader: {
      root: 'tasks',
      totalProperty: 'total'
    }
  },
});