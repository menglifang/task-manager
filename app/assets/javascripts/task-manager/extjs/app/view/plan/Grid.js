Ext.define('TM.view.plan.Grid', {
  extend: 'Ext.ux.MultiSelectablePagingGrid',
  xtype: 'plan_grid',

  title: '计划管理',
  closable: true,
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

	columns :[
		{ text: 'ID', dataIndex: 'id', hidden: true },
		{ text: '名称', flex: 1, dataIndex: 'name'},
		{ text: '内容', flex: 3, dataIndex: '',  },
		{ text: '类型', flex: 1,
			renderer: function(value, meta, record) {
				return record.getPlan().get('name');
			} 
		}
	]
});
