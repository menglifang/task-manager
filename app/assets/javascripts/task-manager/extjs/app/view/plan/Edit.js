Ext.define('TM.view.plan.Edit', {
  extend: 'Ext.form.Panel',
  xtype: 'plan_edit',

  defaults: {
    xtype: 'fieldset',
    margin: '5 10'
  },

  assigneesForEdit: new Array(),

  items: [{
    id: 'editFillField',
    title: '基本信息',
    layout: {
      type: 'table',
      columns: 1
    },
    defaults: {
      xtype: 'textfield',
      labelAlign: 'right',
      margin: '10 0',
      width: 510
    },

    items: [{
      fieldLabel: '计划名称',
      name: 'name',
      allowBlank: false
    },{
      fieldLabel: '计划执行人',
      name: 'assignables',
      id: 'editassignables',
      readOnly: true
    }, {
      fieldLabel: '计划类型',
      name: 'plan_type',
      store: 'TM.store.Types',
      editable: false,
      valueField: 'value',
      xtype: 'combo',
      blankText: '请选择计划类型!',
      allowBlank: false
    }, {
      fieldLabel: '横向指标',
      name: 'dataX'
    }, {
      fieldLabel: '纵向指标',
      name: 'dataY'
    }, {
      fieldLabel: '生效时间',
      xtype: 'datefield',
      editable: false,
      anchor: '100%',
      format: 'Y/m/d',
      name: 'enabled_at',
      id: 'editenabled_at'
    }, {
      fieldLabel: '完成前几天提醒',
      id: 'edit_begin_to_remind',
      emptyText: '计划完成前多少天开始提醒，此处为倒计时。',
      value: '0',
      name: 'begin_to_remind'
    }, {
      fieldLabel: '是否自动完成',
      xtype: 'checkbox',
      name: 'autocompletable'
    }]
  }, {
    xtype: 'fieldset',
    id: 'editSelectField',
    title: '计划完成截至时限',
    layout: {
      type: 'table',
      columns: 2
    },
    defaults: {
      labelAlign: 'right',
    },
    items: [{
      fieldLabel: '月',
      id: 'edit_quarterly_month',
      name: 'quarterly_month',
      xtype: 'combo',
      store: 'TM.store.QuarterlyMonths',
      valueField: 'value',
      editable: false
    }, {
      fieldLabel: '月',
      id: 'edit_month',
      name: 'month',
      xtype: 'combo',
      store: 'TM.store.Months',
      valueField: 'value',
      editable: false
    }, {
      fieldLabel: '日',
      id: 'edit_weekly_day',
      name: 'weekly_day',
      store: 'TM.store.WeekDays',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '日',
      id: 'edit_day',
      name: 'day',
      store: 'TM.store.Days',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '时',
      id: 'edit_hour',
      name: 'hour',
      store: 'TM.store.Hours',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '分',
      id: 'edit_minute',
      name: 'minute',
      store: 'TM.store.Minutes',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }]
  }],

  buttons: [{
    text: '更新',
    formBind: true,
    action: 'update'
  }, {
    text: '关闭',
    action: 'close'
  }],

  showYearlyField: function() {
    var fieldSet = this.getComponent('editSelectField');
    fieldSet.getComponent('edit_quarterly_month').hide();
    fieldSet.getComponent('edit_weekly_day').hide();
    fieldSet.getComponent('edit_month').show();
    fieldSet.getComponent('edit_day').show();
    fieldSet.getComponent('edit_hour').show();
    fieldSet.getComponent('edit_minute').show();
  },

  showMonthlyField: function() {
    var fieldSet = this.getComponent('editSelectField');
    fieldSet.getComponent('edit_quarterly_month').hide();
    fieldSet.getComponent('edit_weekly_day').hide();
    fieldSet.getComponent('edit_month').hide();
    fieldSet.getComponent('edit_day').show();
    fieldSet.getComponent('edit_hour').show();
    fieldSet.getComponent('edit_minute').show();
  },

  showQuarterlyField: function() {
    var fieldSet = this.getComponent('editSelectField');
    fieldSet.getComponent('edit_quarterly_month').show();
    fieldSet.getComponent('edit_weekly_day').hide();
    fieldSet.getComponent('edit_month').hide();
    fieldSet.getComponent('edit_day').show();
    fieldSet.getComponent('edit_hour').show();
    fieldSet.getComponent('edit_minute').show();
  },

  showWeeklyField: function() {
    var fieldSet = this.getComponent('editSelectField');
    fieldSet.getComponent('edit_quarterly_month').hide();
    fieldSet.getComponent('edit_weekly_day').show();
    fieldSet.getComponent('edit_month').hide();
    fieldSet.getComponent('edit_day').hide();
    fieldSet.getComponent('edit_hour').show();
    fieldSet.getComponent('edit_minute').show(); 
  },

  showDailyField: function() {
    var fieldSet = this.getComponent('editSelectField');
    fieldSet.getComponent('edit_quarterly_month').hide();
    fieldSet.getComponent('edit_weekly_day').hide();
    fieldSet.getComponent('edit_month').hide();
    fieldSet.getComponent('edit_day').hide();
    fieldSet.getComponent('edit_hour').show();
    fieldSet.getComponent('edit_minute').show();
  }
});