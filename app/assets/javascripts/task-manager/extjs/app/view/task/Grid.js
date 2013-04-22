Ext.define('TM.view.task.Grid', {
	extend: 'Ext.ux.MultiSelectablePagingGrid',
	xtype: 'task_grid',

  mixins: [
    'TM.helper.ApplicationHelper'
  ],
	store: 'TM.store.Tasks',

  requires: [
    'Ext.ux.RowExpander'
  ],

  plugins: [{
    ptype: 'rowexpander',
    rowBodyTpl: [
      '<table class="data">',
        '<tr>',
          '<td class="name">横向指标:</td>',
          '<td class="value">{[values.data.x == null ? "" : values.data.x]}</td>',
        '</tr>',
        '<tr>',
          '<td class="name">纵向指标:</td>',
          '<td class="value">{[values.data.y == null ? "" : values.data.y]}</td>',
        '</tr>',
      '</table>'
     ]
  }],

	tbar: [ {
    text: '删除',
    iconCls: 'btn-delete-icon',
    action: 'delete'
  }],

  columns: [{
  	text: '名称',
    dataIndex: 'name',
    flex: 2
  }, {
    text: '周期',
    dataIndex: 'task_type',
    renderer: function(v, m, record) {
      return this.translateType(v);
    },
    flex: 2
  }, {
    text: '状态',
    dataIndex: 'status',
    renderer: function(v, m, record) {
      return this.translateStatus(v);
    },
    flex:2
  }, {
    text: '完成时限',
    dataIndex: 'deadline',
    renderer: function(v, m, record) {
      return Ext.Date.format(v, 'Y年m月j日 H:i:s');
    },
    flex:2
  }]
});
