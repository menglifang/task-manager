Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
  ],

  // stores: [
  //   'Plan'
  // ],

  models: [
    'Plan'
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
  }],

  init: function() {
    this.control({
      'plan_search button[action="query"]': {
        click: this.onQueryClick
      },
      'plan_grid button[action="add"]': {
        click: this.onAddClick
      },
      'plan_new combo': {
        change: this.onPlanTypeChange
      },
      'plan_new button[action="save"]': {
        click: this.onSaveClick
      },
      'plan_new button[action="reset"]': {
        click: this.onResetClick
      }
    });
  },

  onResetClick: function(btn) {
    this.getPlanNew().getForm().reset();
  },

  onSaveClick: function(btn) {
    var attrs = this.getPlanNew().getValues();

    var self = this;

    var Plan = TM.model.Plan;
    var plan = Plan.create(attrs, {
      success: function() {
        Ext.Msg.alert('提示', '计划添加成功!');
        self.getPlanStore().insert(0, plan);
        self.getPlanNew().getForm.close();
      },
      failure: function() {
        Ext.Msg.alert('提示', '计划添加失败!')
      }
    })
  },

  onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();

    Ext.getStore('TM.store.Plans').load({ params: params });
  },

  onAddClick: function() {
    Ext.create('TM.view.plan.Window').show();
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
      this.getPlanNew().showDayltyField();
    }
  },

  index: function() {
    this.render('TM.view.plan.Index');
  }
});
