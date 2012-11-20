Ext.define('TM.view.plan.New', {
  extend: 'Ext.form.Panel',
  xtype: 'plan_new',

  defaults: {
    xtype: 'fieldset',
    margin: '5 10'
  },

  items: [{
    id: 'fillField',
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
      id: 'enabled_at',
      minValue: new Date()
    }, {
      fieldLabel: '完成前几天提醒',
      id: 'new_begin_to_remind',
      emptyText: '计划完成前多少天开始提醒，此处为倒计时。',
      name: 'begin_to_remind'
    }, {
      fieldLabel: '是否自动完成',
      xtype: 'checkbox',
      name: 'autocompletable'
    }]
  }, {
    xtype: 'fieldset',
    id: 'selectField',
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
      id: 'new_quarterly_month',
      name: 'quarterly_month',
      xtype: 'combo',
      store: 'TM.store.QuarterlyMonths',
      valueField: 'value',
      editable: false
    }, {
      fieldLabel: '月',
      id: 'new_month',
      name: 'month',
      xtype: 'combo',
      store: 'TM.store.Months',
      valueField: 'value',
      editable: false
    }, {
      fieldLabel: '日',
      id: 'new_weekly_day',
      name: 'weekly_day',
      store: 'TM.store.WeekDays',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '日',
      id: 'new_day',
      name: 'day',
      store: 'TM.store.Days',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '时',
      id: 'new_hour',
      name: 'hour',
      store: 'TM.store.Hours',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '分',
      id: 'new_minute',
      name: 'minute',
      store: 'TM.store.Minutes',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }]
  }],

  buttons: [{
    text: '保存',
    formBind: true,
    action: 'save'
  }, {
    text: '重置',
    action: 'reset'
  }],

  showYearlyField: function() {
    var fieldSet = this.getComponent('selectField');
    fieldSet.getComponent('new_quarterly_month').hide();
    fieldSet.getComponent('new_weekly_day').hide();
    fieldSet.getComponent('new_month').show();
    fieldSet.getComponent('new_day').show();
    fieldSet.getComponent('new_hour').show();
    fieldSet.getComponent('new_minute').show();
  },

  showMonthlyField: function() {
    var fieldSet = this.getComponent('selectField');
    fieldSet.getComponent('new_quarterly_month').show();
    fieldSet.getComponent('new_weekly_day').hide();
    fieldSet.getComponent('new_month').hide();
    fieldSet.getComponent('new_day').show();
    fieldSet.getComponent('new_hour').show();
    fieldSet.getComponent('new_minute').show();
  },

  showQuarterlyField: function() {
    var fieldSet = this.getComponent('selectField');
    fieldSet.getComponent('new_quarterly_month').hide();
    fieldSet.getComponent('new_weekly_day').hide();
    fieldSet.getComponent('new_month').hide();
    fieldSet.getComponent('new_day').show();
    fieldSet.getComponent('new_hour').show();
    fieldSet.getComponent('new_minute').show();
  },

  showWeeklyField: function() {
    var fieldSet = this.getComponent('selectField');
    fieldSet.getComponent('new_quarterly_month').hide();
    fieldSet.getComponent('new_weekly_day').show();
    fieldSet.getComponent('new_month').hide();
    fieldSet.getComponent('new_day').hide();
    fieldSet.getComponent('new_hour').show();
    fieldSet.getComponent('new_minute').show(); 
  },

  showDailyField: function() {
    var fieldSet = this.getComponent('selectField');
    fieldSet.getComponent('new_quarterly_month').hide();
    fieldSet.getComponent('new_weekly_day').hide();
    fieldSet.getComponent('new_month').hide();
    fieldSet.getComponent('new_day').hide();
    fieldSet.getComponent('new_hour').show();
    fieldSet.getComponent('new_minute').show();
  }
});
