Ext.define('Dummy.view.Viewport', {
  extend: 'Ext.container.Viewport',

  requires: [
    'Dummy.view.Header',
    'Dummy.view.Sidebar'
  ],

  layout: 'border',
  items: [{
    xtype: '_header',
    region: 'north'
  }, {
    xtype: 'sidebar',
    region: 'west'
  }, {
    id: 'main-tabpanel',
    xtype: 'tabpanel',
    minTabWidth: 100,
    region: 'center',
    closeAction: 'destroy',
    listeners: {
      beforeremove: function(tabpanel, ownerCt, eOpts) {
        window.location.hash = ownerCt.previousSibling().hashId || '';
      }
    }
  }, {
    xtype: 'box',
    cls: 'footer',
    region: 'south',
    html: '',
    align: 'center',
    border: 0,
    frame: true,
    height: 40
  }
  ]
});
