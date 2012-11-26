Ext.define('TM.view.task.Search', {
	extend: 'Ext.form.Panel',
	xtype: 'task_search',

	border: 0,
  bodyPadding: '5 5 0',

  items: [{
    xtype: 'fieldset',
    id: 'fieldset',
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
          id: 'textfield',
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
          id: 'types',
          store: 'TM.store.Types',
          valueField: 'value',
          name: 'q[task_type_eq]'
        }, {
          fieldLabel: '状态',
          xtype: 'combo',
          editable: false,
          valueField: 'value',
          store: 'TM.store.Statuses',
          name: 'q[status_eq]'
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
            id: 'datefield',
            labelAlign: 'right',
            width: 300,
            labelWidth: 130
          },
          items: [{
            fieldLabel: '完成时间 从',
            format: 'Y-m-d',
            editable: false,
            name: 'q[finished_at_gteq]',
            id: 'last_task'
          }, {
            fieldLabel: '截至时间 从',
            format: 'Y-m-d',
            xtype: 'datefield',
            editable: false,
            name: 'q[deadline_gteq]'
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
            fieldLabel: '至',
            format: 'Y-m-d',
            editable: false,
            name: 'q[finished_at_lteq]'
          }, {
            fieldLabel: '至',
            format: 'Y-m-d',
            xtype: 'datefield',
            editable: false,
            name: 'q[deadline_lteq]'
          }]
        }, {
          layout: 'hbox',
          margin: '20 0 0 60',
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
      }],
    }]
  }],

  // buttons: [{
  //   formBind: true,
  //   width: 60,
  //   text: '查询',
  //   action: 'query'
  // }, {
  //   margin: '0 0 0 20',
  //   width: 60,
  //   text: '重置',
  //   action: 'reset'
  // }],

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
