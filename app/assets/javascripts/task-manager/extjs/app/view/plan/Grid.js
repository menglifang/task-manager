Ext.define('TM.view.plan.Grid', {
  extend: 'Ext.ux.MultiSelectablePagingGrid',
  xtype: 'plan_grid',

  store: 'TM.store.Plans',

	tbar: [{
		text: '添加',
		// iconCls: '',
		action: 'add'
	}, {
		text: '修改',
		// iconCls: '',
		action: 'edit'
	}, {
		text: '删除',
		// iconCls: '',
		action: 'delete'
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
    text: '计划内容',
    width: 300
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
