Ext.define('TM.view.task.Grid', {
	extend: 'Ext.ux.MultiSelectablePagingGrid',
	xtype: 'task_grid',

	// stores: '',

	tbar: [ {
    text: '删除',
    iconCls: 'btn-delete-icon',
    action: 'delete'
  }],

  columns: [{
  	text: '任务名称',
  }]
})