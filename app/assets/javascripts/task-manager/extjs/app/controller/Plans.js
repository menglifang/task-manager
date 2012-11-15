Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
  ],

  refs: [{
    ref: 'searchForm',
    selector: 'plan_search'
  }, {
    ref: 'planWindow',
    selector: 'plan_window'
  }, {
    ref: 'planNew',
    selector: 'plan_new'
  }, {
    ref: 'planType',
    selector: 'plan_new combo[name="plan_type"]'
  }],

  init: function() {
    this.control({
      'plan_search button[action="query"]': {
        click: this.onQueryClick
      },
      'plan_grid button[action="add"]': {
        click: this.onAddClick
      },
      'plan_new': {
        afterrender: this.onNewFormAfterRender
      },
      'plan_new combo': {
        change: this.onPlanTypeChange
      }
    });
  },

  onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();

    Ext.getStore('TM.store.Plans').load({ params: params });
  },

  onAddClick: function() {
    Ext.create('TM.view.plan.Window').show();
  },

  onNewFormAfterRender: function() {
    this.getPlanType().setValue('daily');
  },

  onPlanTypeChange: function(combo, value, oldValue) {
    if (value == oldValue) return;

    if(value == 'yearly') {
      this.getPlanNew().showYearlyField();
    } else if(value == 'quarterly') {
      this.getPlanNew().showMonthlyField();
    } else if(value == 'monthly') {
      this.getPlanNew().showQuarterlyField();
    } else if(value == 'weekly') {
      this.getPlanNew().showWeeklyField();
    } else if(value == 'daily') {
      this.getPlanNew().showDailyField();
    }
  },

  index: function() {
    this.render('TM.view.plan.Index');
  }
});
