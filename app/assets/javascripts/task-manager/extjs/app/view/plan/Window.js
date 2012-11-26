Ext.define('TM.view.plan.Window', {
	extend: 'Ext.window.Window',
	requires: ['TM.view.plan.New'],
	xtype: 'plan_window',

	title: '添加计划',
	modal: true,

	width: 600,
	height: 550,

	layout: {
		type: 'fit',
		align: 'stretch'
	},

	items: [{
	    xtype: 'plan_new',
	    border: false
  }]
});
