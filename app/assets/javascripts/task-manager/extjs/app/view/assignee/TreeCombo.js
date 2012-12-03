Ext.define('TM.view.assignee.TreeCombo', {
  xtype: 'assignee_treecombo',
  extend: 'Ext.ux.TreeCombo',
  editable: false,

  setValue: function(valueInit) {
    if(typeof valueInit === 'object') {
      var value = [];
      valueInit.forEach(function(i) {
        value.push(i.assignee_type + '-' + i.assignee_id);
      });
      valueInit = value.join(',');
    }

    this.callParent([valueInit]);
  },

  getSubmitValue: function() {
    var value = [];
    if(!this.value) return value;

    var objs = this.value.split(',');
    objs.forEach(function(i) {
      var node = this.tree.getStore().getNodeById(i);
      if(node) {
        var assignee = node.raw.record;
        var attrs = {
          assignee_id: assignee.get('id'),
          assignee_type: assignee.get('class_name')
        };
        value.push(attrs);
      }
    }, this);

    return value;
  },

  // @protected
  initComponent: function() {
    this.callParent(arguments);

    this.on('show', this.unCheckNodes);
  },

  // @private
  unCheckNodes: function() {
    this.setValue('');
  }
});
