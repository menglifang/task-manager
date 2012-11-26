Ext.define('TM.store.Assignees', {
  extend: 'Ext.data.Store',

  autoLoad: true,
  model: 'TM.model.Assignee',

  toTreeStore: function() {

    var self = this;
    var store = {
      root: {
        expanded: true,
        children: []
      }
    };

    self.each(function(assignee) {
      self.addChild(self.getPositionById(store.root,
                                 assignee.get('parent_id')), assignee);
    });

    return store;
  },

  // @private
  getPositionById: function(root, id) {
    if (id == null || id == 0) return root;
    if (root.id == id) return root;

    var childrenLength = root.children ? root.children.length : 0;
    for (var i = 0; i < childrenLength; i++) {
      var result = this.getPositionById(root.children[i], id);
      if (result != null) return result;
    }

    return null;
  },

  addChild: function(root, record) {
    if (root.children == null) root.children = [];

    root.children.push({
      id: record.get('id'),
      text: record.get('name'),
      checked: false,
      leaf: true
    });

    if (root.leaf != null) {
      root.leaf == true ? root.leaf = false : null;
    }
  }
});
