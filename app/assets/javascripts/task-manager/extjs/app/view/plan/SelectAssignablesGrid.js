Ext.define('TM.view.plan.SelectAssignablesGrid', {
	extend: 'Ext.grid.Panel',
	xtype: 'plan_selectassignablesgrid',
	
	store: 'TM.store.Assignees',
	height: 490,

	border: 0,

	selType: 'checkboxmodel',
	selModel: {
		mode: 'MULTI',
		allowDeselect: true,
		checkOnly: true
	},

	columns: [{
  	text: '名称',
  	flex: 1,
  	dataIndex: 'name' 
  }]
});