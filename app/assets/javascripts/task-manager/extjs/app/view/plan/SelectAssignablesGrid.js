Ext.define('TM.view.plan.SelectAssignablesGrid', {
	extend: 'Ext.ux.MultiSelectablePagingGrid',
	xtype: 'plan_selectassignablesGrid',
	
	store: 'TM.store.Assignees',
	height: 490,

	border: 0,

	columns: [{
  	text: '名称',
  	flex: 1,
  	dataIndex: 'name' 
  }]
});