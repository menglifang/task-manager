Ext.define('TM.view.task.Index', {
	extend: 'Ext.panel.Panel',
	xtype: 'task_index',

	requires: ['TM.view.task.Search'],
	title: '任务管理',
	closable: true,

	// store: '',
	layout: {
    type: 'vbox',
    align: 'stretch'
  },

	items: [{
		xtype: 'task_search'
	}, {
		xtype: 'task_grid',
		flex: 1
	}]
});
