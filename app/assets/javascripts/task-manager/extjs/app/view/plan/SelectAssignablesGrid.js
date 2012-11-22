Ext.define('TM.view.plan.SelectAssignablesGrid', {
	extend: 'Ext.ux.MultiSelectablePagingGrid',
	xtype: 'plan_selectassignablesGrid',


	defaults: {
		margin: 5,
		height: '100%'
	},

	columns: [{
  	text: '任务名称',
  }]
});