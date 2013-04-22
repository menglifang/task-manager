Ext.define('TM.view.callback.CheckboxCombo', {
  extend: 'Ext.ux.form.CheckboxListCombo',
  xtype: 'callback_checkboxcombo',

  getSubmitValue: function() {
    var callbacks = [];

    Ext.Array.forEach(this.value || [], function(c, i) {
      callbacks.push({
        callback_id: c,
        callback_type: Ext.getStore('TM.store.Callbacks').getAt(0).get('class_name')
      });
    });

    return callbacks;
  }
});
