Ext.define('Dummy.view.Sidebar', {
  extend: 'Ext.panel.Panel',
  xtype: 'sidebar',
  baseCls: 'x-plain',
  width: 85,
  layout: 'vbox',
  defaults: {
    xtype: 'button',
    scale: 'medium',
    iconAlign: 'top',
    arrowAlign: 'bottom',
    width: 75,
    margin: 5
  },
  items: [{
    iconCls: 'btn-monitor-icon',
    text: '计划管理',
    uri: 'plan',
    //menu: [{
      
    //}]

  }, {
    iconCls: 'btn-monitor-icon',
    text: '任务管理',
    uri: 'task'
  }]
});
