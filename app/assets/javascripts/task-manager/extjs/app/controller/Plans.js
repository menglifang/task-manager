Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
  ],

  index: function() {
    this.render('TM.view.plan.Index');
  }
});
