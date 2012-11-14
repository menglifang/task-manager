Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Grid'
  ],

  index: function() {
    this.render('TM.view.plan.Grid');
  }
});
