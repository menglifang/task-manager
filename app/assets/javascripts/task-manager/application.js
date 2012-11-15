//
//= require_tree ./extjs/lib
//
//= require_tree ./extjs/app/model
//= require_tree ./extjs/app/store
//
//= require_self
//
//= require ./extjs/app/view/plan/Search
//= require ./extjs/app/view/plan/Grid
//= require ./extjs/app/view/plan/Index
//
//= require_tree ./extjs/app/controller

// Register all stores
Ext.data.StoreManager.register(
  Ext.create('TM.store.Booleans', { storeId: 'TM.store.Booleans'}),
  Ext.create('TM.store.Types', { storeId: 'TM.store.Types'}),
  Ext.create('TM.store.Plans', { storeId: 'TM.store.Plans'})
);
