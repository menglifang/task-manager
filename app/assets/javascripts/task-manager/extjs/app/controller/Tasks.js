Ext.define('TM.controller.Tasks', {
	extend: 'Ext.app.Controller',

	views: ['task.Index'],

	refs: [{
		ref: 'searchForm',
		selector: 'task_search'
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
		    // click: this.onDeleteClick
		  }
		});
	},

	onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();
    if(!this.getSearchForm().hasQueryParams()) {
      Ext.Msg.alert('提示', '您要查找的条件不能全为空，至少要有一项！');
      return;
    }
    // Ext.getStore('TM.store.Plans').load({ params: params });
  },

  onSearchResetClick: function(btn) {
    this.getSearchForm().getForm().reset();
  },

	index: function() {
		this.render('TM.view.task.Index');
	}
});