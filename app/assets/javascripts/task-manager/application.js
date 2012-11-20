//
//= require_tree ./extjs/lib
//
//= require_tree ./extjs/app/model
//= require_tree ./extjs/app/store
//
//= require_self
//
//= require ./extjs/app/view/plan/Edit
//= require ./extjs/app/view/plan/EditWindow
//= require ./extjs/app/view/plan/New
//= require ./extjs/app/view/plan/Window
//= require ./extjs/app/view/plan/Search
//= require ./extjs/app/view/plan/Grid
//= require ./extjs/app/view/plan/Index
//
//= require_tree ./extjs/app/controller

// Register all stores
Ext.data.StoreManager.register(
	Ext.create('TM.store.WeekDays', { storeId: 'TM.store.WeekDays'}),
	Ext.create('TM.store.QuarterlyMonths', { storeId: 'TM.store.QuarterlyMonths'}),
	Ext.create('TM.store.Months', { storeId: 'TM.store.Months'}),
	Ext.create('TM.store.Minutes', { storeId: 'TM.store.Minutes'}),
	Ext.create('TM.store.Days', { storeId: 'TM.store.Days'}),
  Ext.create('TM.store.Hours', { storeId: 'TM.store.Hours'}),
  Ext.create('TM.store.Booleans', { storeId: 'TM.store.Booleans'}),
  Ext.create('TM.store.Types', { storeId: 'TM.store.Types'}),
  Ext.create('TM.store.Plans', { storeId: 'TM.store.Plans'})
);
