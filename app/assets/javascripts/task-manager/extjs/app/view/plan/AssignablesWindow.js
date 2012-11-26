Ext.define('TM.view.plan.AssignablesWindow', {
	extend: 'Ext.window.Window',
	requires: ['TM.view.plan.SelectAssignables'],
	xtype: 'plan_assignableswindow',

	title: '选择执行人',
	modal: true,

  action: '',

	width: 480,
	height: 550,

	layout: {
		type: 'fit',
		align: 'stretch'
	},

	items: [{
	    xtype: 'plan_selectassignables',
	    border: false
  	}]
});
