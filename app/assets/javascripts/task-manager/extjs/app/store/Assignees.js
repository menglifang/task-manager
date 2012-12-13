Ext.define('TM.store.Assignees', {
  extend: 'Ext.data.Store',

  autoLoad: true,
  model: 'TM.model.Assignee',

  listeners: {
    load: {
      fn: function(store) {
        store.refreshRootNode();
      }
    }
  },

  toTreeStore: function() {
    this._treeStore = this._treeStore || Ext.create('Ext.data.TreeStore', {
      root: {
        expanded: true,
        checked: false,
        text: '全部',
        id: 'root',
        children: []
      }
    });

    return this._treeStore;
  },

  // @private
  getRootNode: function() {
    return this.toTreeStore().getRootNode();
  },

  // @private
  refreshRootNode: function() {
    this.each(function(assignee) {
      var parent = this.getNodeById(assignee.getParentId(true)) || this.getRootNode();
      var node = parent.findChild('id', assignee.getId(true));

      if(!node) { this.appendChildNode(parent, assignee); }
    }, this);
  },

  // @private
  appendChildNode: function(parent, assignee) {
    parent.set('leaf', false);
    parent.appendChild(parent.createNode({
      id: assignee.getId(true),
      text: assignee.get('name'),
      checked: false,
      leaf: true,
      record: assignee
    }));
  },

  // @private
  getNodeById: function(id) {
    return this.toTreeStore().getNodeById(id);
  }
});
