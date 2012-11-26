Ext.define('TM.controller.Tasks', {
	extend: 'Ext.app.Controller',

	views: ['task.Index'],

	refs: [{
		ref: 'searchForm',
		selector: 'task_search'
	}, {
		ref: 'lastTaskField',
		selctor: 'task_search fieldset datefield[id="last_task"]'
	}, {
		ref: 'taskTypeField',
		selctor: 'task_search combo[id="types"]'
	}],

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
		  'task_search datefield[id="last_task"]': {
		  	change: this.onLastTaskChange
		  }
		});
	},

	onLastTaskChange: function() {
		this.getLastTaskField().getEl().on('render', this.onLastTaskAfterRender);
	},

	onLastTaskAfterRender: function() {
		this.getTaskTypeField().setValue('true');
	},

	onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();
    if(!this.getSearchForm().hasQueryParams()) {
      Ext.Msg.alert('提示', '您要查找的条件不能全为空，至少要有一项！');
      return;
    }
    Ext.getStore('TM.store.Types').load({ params: params });
  },

  onSearchResetClick: function(btn) {
    this.getSearchForm().getForm().reset();
  },

	onDeleteClick: function(btn) {
		var select = btn.up('task_grid').getSelectionModel().getSelection()[0];
    if(select == null) {
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

	index: function() {
		this.render('TM.view.task.Index');
	}
});