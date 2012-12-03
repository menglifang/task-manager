Ext.define('TM.model.Callback', {
  extend: 'Ext.data.Model',

  fields: [
    { name: 'id', type: 'int' },
    { name: 'name' },
    { name: 'class_name' }
  ],

  proxy: {
    type: 'rest',
    url: '/callbacks',
    reader: {
      root: 'callbacks',
      totalProperty: 'total'
    }
  },

  getId: function(detailed) {
    if(detailed) {
      return this.get('class_name') + '-' + this.get('id');
    } else {
      return this.get('id');
    }
  },

  getParentId: function(detailed) {
    if(this.get('parent_id') && detailed) {
      return this.get('class_name') + '-' + this.get('parent_id');
    } else {
      return this.get('parent_id');
    }
  }
});
