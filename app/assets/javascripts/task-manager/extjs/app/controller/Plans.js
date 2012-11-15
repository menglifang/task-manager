Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'TM.view.plan.Grid',
    'TM.view.plan.Window'
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
  }, {
    ref:'planType',
    selector: 'plan_new combo[name="plan_type"]'
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

    var fieldSet = this.getPlanNew().getComponent('selectField');

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

    // Ext.getCmp('new_day').hide();
    // this.getPlanNew().doLayout();
    // if(value == 'yearly') {
    //   this.getPlanNew().down('combo[name="month"]').hidden = false;
    //   this.getPlanNew().down('combo[name="quarterly_month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="weekly_day"]').hidden = false;
    //   this.getPlanNew().down('combo[name="day"]').hidden = true;
    //   this.getPlanNew().down('combo[name="hour"]').hidden = false;
    //   this.getPlanNew().down('combo[name="minute"]').hidden = false;
    // } else if(value == 'quarterly') {
    //   this.getPlanNew().down('combo[name="month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="quarterly_month"]').hidden = false;
    //   this.getPlanNew().down('combo[name="weekly_day"]').hidden = true;
    //   this.getPlanNew().down('combo[name="day"]').hidden = false;
    //   this.getPlanNew().down('combo[name="hour"]').hidden = false;
    //   this.getPlanNew().down('combo[name="minute"]').hidden = false;
    // } else if(value == 'monthly') {
    //   this.getPlanNew().down('combo[name="month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="quarterly_month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="weekly_day"]').hidden = true;
    //   this.getPlanNew().down('combo[name="day"]').hidden = false;
    //   this.getPlanNew().down('combo[name="hour"]').hidden = false;
    //   this.getPlanNew().down('combo[name="minute"]').hidden = false;
    // } else if(value == 'weekly') {
    //   this.getPlanNew().down('combo[name="month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="quarterly_month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="weekly_day"]').hidden = false;
    //   this.getPlanNew().down('combo[name="day"]').hidden = true;
    //   this.getPlanNew().down('combo[name="hour"]').hidden = false;
    //   this.getPlanNew().down('combo[name="minute"]').hidden = false;
    // } else if(value == 'daily') {
    //   this.getPlanNew().down('combo[name="month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="quarterly_month"]').hidden = true;
    //   this.getPlanNew().down('combo[name="weekly_day"]').hidden = true;
    //   this.getPlanNew().down('combo[name="day"]').hidden = true;
    //   this.getPlanNew().down('combo[name="hour"]').hidden = false;
      // this.getPlanNew().down('combo[name="minute"]').hidden = false;
    // }


    // this.getPlanNew().doLayout();
  },

  index: function() {
    this.render('TM.view.plan.Grid');
  }
});
