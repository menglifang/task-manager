Ext.define('Ext.ux.MultiSelectablePagingGrid', {
  extend: 'Ext.grid.Panel',
  selType: 'checkboxmodel',
  selModel: {
    mode: 'MULTI',
    allowDeselect: true,
    checkOnly: true
  },

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
