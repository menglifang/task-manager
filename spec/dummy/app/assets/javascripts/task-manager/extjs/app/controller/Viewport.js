Ext.define('TM.controller.Viewport', {
  extend: 'Ext.app.Controller',

  init: function() {
    this.control({
      'sidebar button': {
        click: this.onButtonClick
      }
    });
  },

  onButtonClick: function(btn) {
    if (btn.uri) Ext.ux.Router.redirect(btn.uri); 
    else return;
  }
});
