//
//= require_tree ./extjs/lib
//
//= require_tree ./extjs/app/model
//= require_tree ./extjs/app/store
//
//= require_tree ./extjs/app/helper
//
//= require_self
//
//= require ./extjs/app/view/assignee/TreeCombo
//= require ./extjs/app/view/callback/CheckboxCombo
//= require ./extjs/app/view/task/Search
//= require ./extjs/app/view/task/Grid
//= require ./extjs/app/view/task/Index
//= require ./extjs/app/view/plan/Form
//= require ./extjs/app/view/plan/FormWindow
//= require ./extjs/app/view/plan/Search
//= require ./extjs/app/view/plan/Grid
//= require ./extjs/app/view/plan/Index
//
//= require_tree ./extjs/app/controller

// Register all stores
Ext.data.StoreManager.register(
	Ext.create('TM.store.Tasks', { storeId: 'TM.store.Tasks'}),
  Ext.create('TM.store.Assignees', { storeId: 'TM.store.Assignees'}),
  Ext.create('TM.store.Callbacks', { storeId: 'TM.store.Callbacks'}),
  Ext.create('TM.store.WeekDays', { storeId: 'TM.store.WeekDays'}),
  Ext.create('TM.store.QuarterlyMonths', { storeId: 'TM.store.QuarterlyMonths'}),
  Ext.create('TM.store.Months', { storeId: 'TM.store.Months'}),
  Ext.create('TM.store.Minutes', { storeId: 'TM.store.Minutes'}),
  Ext.create('TM.store.Days', { storeId: 'TM.store.Days'}),
  Ext.create('TM.store.Hours', { storeId: 'TM.store.Hours'}),
  Ext.create('TM.store.Booleans', { storeId: 'TM.store.Booleans'}),
  Ext.create('TM.store.Statuses', { storeId: 'TM.store.Statuses'}),
  Ext.create('TM.store.Types', { storeId: 'TM.store.Types'}),
  Ext.create('TM.store.Plans', { storeId: 'TM.store.Plans'})
);
