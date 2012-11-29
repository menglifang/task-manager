Ext.define('TM.view.plan.FormWindow', {
	extend: 'Ext.window.Window',
	xtype: 'plan_formwindow',

	requires: [
    'TM.view.plan.Form'
  ],

	modal: true,

	width: 600,
	height: 550,

	layout: {
		type: 'fit',
		align: 'stretch'
	},

	items: [{
	    xtype: 'plan_form',
	    border: false
  }]
});
