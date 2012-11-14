Ext.define('TM.view.Header', {
  extend: 'Ext.panel.Panel',
  xtype: '_header',

  layout: 'hbox',
  bodyCls: 'header',
  cls: 'header',
  bodyPadding: 20,
  border: false,
  height: 75,

  defaults: {
    xtype: 'panel',
    border: false
  },

  items: [{
    flex: 1,
    height: 40,
  }]
});
