StartTest(function(t) {
  var store = Ext.create('TM.store.Assignees', {
    autoLoad: false
  });
  var rootNode = store.toTreeStore().getRootNode();

  t.isStoreEmpty(store, 'Autoload is disabled');
  t.ok(!rootNode.hasChildNodes(),
       'Tree store does not have any children');

  t.loadStoresAndThen(store, function() {
    t.isGreater(store.getCount(), 0, 'Store is loaded');
    t.ok(rootNode.hasChildNodes(),
         'Tree store has child nodes');
  });
});
