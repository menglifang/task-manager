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
          '<td rowspan="3" class="title">内容</td>',
          '<td class="name">截止时间:</td>',
          '<td class="value">第{data.deadline_month}个月，第{data.deadline_day}天，{data.deadline_hour}时{data.deadline_minute}分</td>',
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
    text: '名称',
    dataIndex: 'name',
    flex: 2
  }, {
    text: '类型',
    renderer: function(v, m, record) {
      switch (record.get('plan_type')) {
        case 'yearly':
          return '年计划';
        case 'quarterly':
          return '季计划';
        case 'monthly':
          return '月计划';
        case 'weekly':
          return '周计划';
        case 'daily':
          return '日计划';
        default:
          return '';
      }
    },
    flex: 1
  }, {
    text: '执行者',
    renderer: function(v, m, record) {
      var names = new Array();
      Ext.Array.forEach(record.get('assignees'), function(assignee, index, assignees) {names.push(assignee.name)});
      return names.join(', ');
    },
    flex: 3
  }, {
    text: '最后任务生成时间',
    dataIndex: 'last_task_created_at',
    flex: 2
  }, {
    text: '生效时间',
    renderer: function(v, m, record) {
      return Ext.Date.format(record.get('enabled_at'), 'Y年m月j日 H:m:s');
    },
    flex: 2
  }, {
    text: '是否自动完成',
    renderer: function(v, m, record) {
      return record.get('autocompletable') == true ? '是' : '否';
    },
    flex: 1
  }, {
    text: '开始提醒天数',
    dataIndex: 'begin_to_remind',
    flex: 1
  }]
});
