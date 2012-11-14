//
//= require_tree ./extjs/lib
//
//= require_tree ./extjs/app/model
//= require_tree ./extjs/app/store
//
//= require self
//
//= require ./extjs/app/view/plan/Grid
//
//= require_tree ./extjs/app/controller
//

// Register all stores
Ext.data.StoreManager.register(
  Ext.create('TM.store.Plans', { storeId: 'TM.store.Plans'})
);

