Ext.define('TM.view.plan.SelectAssignablesTree', {
	extend: 'Ext.tree.Panel',
	xtype: 'plan_selectassignablestree',
	
  store: Ext.getStore('TM.store.Assignees').toTreeStore(),
	height: 490,
  rootVisible: false,
	border: 0
});
