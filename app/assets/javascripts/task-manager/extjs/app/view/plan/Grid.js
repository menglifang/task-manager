Ext.define('TM.view.plan.Grid', {
  extend: 'Ext.ux.MultiSelectablePagingGrid',
  xtype: 'plan_grid',

  requires: [
    'Ext.ux.RowExpander'
  ],

  store: 'TM.store.Plans',

  tbar: [{
    text: '添加',
    iconCls: 'btn-add-icon',
    action: 'add'
  }, '-', {
    text: '修改',
    iconCls: 'btn-edit-icon',
    action: 'edit'
  }, '-', {
    text: '删除',
    iconCls: 'btn-delete-icon',
    action: 'delete'
  }],

  plugins: [{
    ptype: 'rowexpander',
    rowBodyTpl: [
      '<table class="data">',
        '<tr>',
          '<th>名称</th>',
          '<th>内容</th>',
        '</tr>',
        '<tr>',
          '<td class="name">截止时限:</td>',
          '<td class="value">{data.deadline_month}月:{data.deadline_day}日:{data.deadline_hour}时{data.deadline_minute}分</td>',
        '</tr>',
        '<tr>',
          '<td class="name">横向指标:</td>',
          '<td class="value">{data.x}</td>',
        '</tr>',
        '<tr>',
          '<td class="name">纵向指标:</td>',
          '<td class="value">{data.y}</td>',
        '</tr>',
      '</table>'
     ]
  }],

  columns: [{
    text: '计划名称',
    dataIndex: 'name',
    width: 140
  }, {
    text: '计划类型',
    width: 60,
    renderer: function(v, m, record) {
      switch (record.get('plan_type')) {
        case 'yearly':
          return '年计划';
        case 'yearly':
          return '季计划';
        case 'yearly':
          return '月计划';
        case 'yearly':
          return '周计划';
        case 'yearly':
          return '日计划';
        default:
          return '';
      }
    }
  }, {
    text: '最后任务生成时间',
    dataIndex: 'last_task_created_at',
    width: 100
  }, {
    text: '生效时间',
    dataIndex: 'enabled_at',
    width: 100
  }, {
    text: '执行者',
    width: 80,
    dataIndex: 'assignee'
    //renderer: function(v, m, record) {
    //return record.get('assignee').name;
    //}
  }]
});
