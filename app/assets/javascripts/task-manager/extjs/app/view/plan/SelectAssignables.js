Ext.define('TM.view.plan.SelectAssignables', {
  extend: 'Ext.panel.Panel',
  xtype: 'plan_selectassignables',
  
  requires: [
    'TM.view.plan.SelectAssignablesGrid',
  ],

  items: [{
    xtype: 'plan_selectassignablesGrid',
    flex: 1
  }],

  buttons: [{
    text: '确定',
    action: 'save'
  }, {
    text: '取消',
    action: 'cancel'
  }]
});