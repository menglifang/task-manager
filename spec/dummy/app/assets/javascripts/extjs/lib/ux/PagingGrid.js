Ext.define('Ext.ux.PagingGrid', {
  extend: 'Ext.grid.Panel',

  initComponent: function() {
    this.dockedItems = [{
      xtype: 'pagingtoolbar',
      store: this.store,
      dock: 'bottom',
      displayInfo: true
    }];

    this.callParent(arguments);
  }
});
