Ext.define('TM.view.task.Grid', {
	extend: 'Ext.ux.MultiSelectablePagingGrid',
	xtype: 'task_grid',

	stores: 'TM.store.Types',

	tbar: [ {
    text: '删除',
    iconCls: 'btn-delete-icon',
    action: 'delete'
  }],

  columns: [{
  	text: '名称',
    dataIndex: 'name',
    flex: 2
  }, {
    text: '类型',
    dataIndex: 'task_type',
    flex: 2
  }, {
    text: '内容',
    dataIndex: 'data',
    flex:2
  }, {
    text: '状态',
    dataIndex: 'status',
    flex:2
  }, {
    text: '截至时间',
    dataIndex: 'deadline',
    flex:2
  }]
});