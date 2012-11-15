Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
  ],

  refs: [{
    ref: 'searchForm',
    selector: 'plan_search'
  }],

  init: function() {
    this.control({
      'plan_search button[action="query"]': {
        click: this.onQueryClick
      }
    });
  },

  onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();

    Ext.getStore('TM.store.Plans').load({ params: params });
  },

  index: function() {
    this.render('TM.view.plan.Index');
  }
});
