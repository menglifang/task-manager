Ext.define('Ext.ux.Controller', {
  override: 'Ext.app.Controller',

  render: function(view) {
    //take viewport
    var tab, target = Ext.getCmp('main-tabpanel');

    var hashId = view.substr(0, view.indexOf('.'));
    //load view
    if (Ext.isString(view)) {
      view = this.getView(view);
    }
    tab = target.child(view.xtype);
    if (!tab) {
      tab = target.add(view);
      tab.hashId = hashId;
    }
    target.setActiveTab(tab);
  }
});
