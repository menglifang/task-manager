Ext.define('TM.controller.Tasks', {
	extend: 'Ext.app.Controller',

	views: ['task.Index'],

	refs: [{
		ref: 'searchForm',
		selector: 'task_search'
	}],

	index: function() {
		this.render('TM.view.task.Index');
	},

	init: function() {
		this.control({
		  'task_search button[action="query"]': {
		    click: this.onQueryClick
		  },
		  'task_search button[action="reset"]': {
		    click: this.onSearchResetClick
		  },
		  'task_grid button[action="delete"]': {
		    click: this.onDeleteClick
		  },
      'task_grid': {
        render: this.onGridRender
      }
		});
	},

  // @protected
	onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();
    Ext.getStore('TM.store.Tasks').load({ params: params });
  },

  // @protected
  onSearchResetClick: function(btn) {
    this.getSearchForm().getForm().reset();
  },

  // @protected
	onDeleteClick: function(btn) {
		var select = btn.up('task_grid').getSelectionModel().getSelection()[0];
    if(select === null) {
      Ext.Msg.alert('提示','请选择要删除的计划任务');
      return;
    }

    Ext.Msg.confirm('提示','您确认要删除选中的计划任务吗？', function(b){
      if(b != 'yes') return;

      var selected = btn.up('task_grid').getSelectionModel().getSelection();
      Ext.each(selected, function(s){
        this.callParent(arguments);

    		if(this.store) this.store.remove(this);
      });
    });
	},

  // @protected
  onGridRender: function(grid) {
    if(grid.getStore().getCount() <= 0) {
      grid.getStore().load();
    }
  }
});
