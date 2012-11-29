Ext.define('Ext.ux.Model', {
  override: 'Ext.data.Model',

  getPersistData: function() {
    var data = {};
    Ext.Array.each(this.fields.items, function(f) {
      if(f.persist) {
        data[f.name] = this.get(f.name);
      }
    }, this);

    return data;
  }
});
