Ext.define('TM.view.plan.Search', {
  extend: 'Ext.form.Panel',
  xtype: 'plan_search',

  border: 0,
  bodyPadding: '5 5 0',

  items: [{
    xtype: 'fieldset',
    title: '查询',

    layout: {
      type: 'form',
      border: 0,
      margin: 2
    },

    items: [{
      border: 0,
      items: [{
        layout: 'column',
        border: 0,
        defaults: {
          xtype: 'textfield',
          labelAlign: 'right',
          width: 300,
          labelWidth: 130
        },
        items: [{
          fieldLabel: '名称',
          name: 'q[name_cont]'
        }, {
          fieldLabel: '类型',
          editable: false,
          xtype: 'combo',
          store: 'TM.store.Types',
          valueField: 'value',
          name: 'q[plan_type_eq]'
        }, {
          fieldLabel: '是否自动完成',
          xtype: 'combo',
          editable: false,
          valueField: 'value',
          store: 'TM.store.Booleans',
          name: 'q[autocompletable_eq]'
        }]
      }, {
        layout: 'column',
        border: 0,
        defaults: {
          border: 0,
          labelAlign: 'right',
          width: 300,
          labelWidth: 130
        },
        items: [{
          layout: 'column',
          border: 0,
          defaults: {
            xtype: 'datefield',
            labelAlign: 'right',
            width: 300,
            labelWidth: 130
          },
          items: [{
            //fieldLabel: '生成时间 从',
            //format: 'Y-m-d',
            //editable: false,
            //name: 'q[last_task_created_at_gteq]'
          //}, {
            fieldLabel: '生效时间 从',
            format: 'Y-m-d',
            xtype: 'datefield',
            editable: false,
            name: 'q[enabled_at_gteq]'
          }]
        }, {
          layout: 'column',
          border: 0,
          defaults: {
            xtype: 'datefield',
            labelAlign: 'right',
            width: 300,
            labelWidth: 130
          },
          items: [{
            //fieldLabel: '至',
            //format: 'Y-m-d',
            //editable: false,
            //name: 'q[last_task_created_at_lteq]'
          //}, {
            fieldLabel: '至',
            format: 'Y-m-d',
            xtype: 'datefield',
            editable: false,
            name: 'q[enabled_at_lteq]'
          }]
        }, {
          layout: 'hbox',
          margin: '5 0 0 60',
          items: [{
            xtype: 'button',
            formBind: true,
            width: 60,
            text: '查询',
            action: 'query'
          }, {
            xtype: 'button',
            margin: '0 0 0 20',
            width: 60,
            text: '重置',
            action: 'reset'
          }]
        }]
      }]
    }]
  }],

  hasQueryParams: function() {
    var hasParams = false;
    Ext.Object.each(this.getValues(), function(key, value) {
      if(value) {
       hasParams = true;

       // Break each
       return false;
      }
    });

    return hasParams;
  }
});
