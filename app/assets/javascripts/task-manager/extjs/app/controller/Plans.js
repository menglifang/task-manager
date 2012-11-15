Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
  ],

  // stores: [
  //   'Types'
  // ],

  refs: [{
    ref: 'planWindow',
    selector: 'plan_window'
  }, {
    ref: 'planNew',
    selector: 'plan_new'
  }],

  init: function() {
    this.control({
      'plan_grid button[action="add"]': {
        click: this.onAddClick
      },
      'plan_new combo': {
        change: this.onPlanTypeChang
      }
    });
  },

  onAddClick: function() {
    Ext.create('TM.view.plan.Window').show();
  },

  onPlanTypeChang: function(combo, value, oldValue) {
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
