Ext.define('TM.view.plan.EditWindow', {
	extend: 'Ext.window.Window',
	requires: ['TM.view.plan.Edit'],
	xtype: 'plan_editwindow',

	title: '修改计划',
	modal: true,

	width: 600,
	height: 550,

	layout: {
		type: 'fit',
		align: 'stretch'
	},

	items: [{
	    xtype: 'plan_edit',
	    border: false
  }]
});