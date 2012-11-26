Ext.define('TM.view.plan.Index', {
  extend: 'Ext.panel.Panel',
  xtype: 'plan_index',

  requires: ['TM.view.plan.Search'],

  title: '计划管理',
  closable: true,

  store: 'TM.store.Plans',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  items: [{
    xtype: 'plan_search',
    width: 50
  }, {
    xtype: 'plan_grid',
    flex: 1,
  }]
});
