Ext.define('TM.view.plan.Grid', {
  extend: 'Ext.ux.MultiSelectablePagingGrid',
  xtype: 'plan_grid',

  title: '计划管理',
  closable: true,

  columns: [{
    text: '名称'
  }]

});
