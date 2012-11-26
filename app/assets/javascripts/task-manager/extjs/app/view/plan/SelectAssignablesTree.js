Ext.define('TM.view.plan.SelectAssignablesTree', {
	extend: 'Ext.tree.Panel',
	xtype: 'plan_selectassignablestree',
	
  store: 'TM.store.AssigneesTree',
	height: 490,
  rootVisible: false,
	border: 0
});
