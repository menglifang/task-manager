Ext.define('TM.view.plan.Form', {
  requires: ['Ext.ux.TreeCombo'],
  extend: 'Ext.form.Panel',
  xtype: 'plan_form',

  defaultPlanType: 'yearly',
  defaultBeginToRemind: 0,

  defaults: {
    xtype: 'fieldset',
    margin: '5 10'
  },

  items: [{
    itemId: 'base-info',
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
    }, {
      xtype: 'assignee_treecombo',
      fieldLabel: '计划执行人',
      name: 'assignables_attributes',
      store: Ext.getStore('TM.store.Assignees').toTreeStore()
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
      name: 'data.x'
    }, {
      fieldLabel: '纵向指标',
      name: 'data.y'
    }, {
      fieldLabel: '生效时间',
      xtype: 'datefield',
      editable: false,
      anchor: '100%',
      format: 'Y/m/d',
      name: 'enabled_at',
      minValue: new Date()
    }, {
      fieldLabel: '完成前几天提醒',
      emptyText: '计划完成前多少天开始提醒，此处为倒计时。',
      name: 'begin_to_remind'
    }, {
      fieldLabel: '是否自动完成',
      xtype: 'checkbox',
      name: 'autocompletable'
    }]
  }, {
    xtype: 'fieldset',
    itemId: 'deadline',
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
      name: 'data.deadline_month',
      xtype: 'combo',
      store: 'TM.store.Months',
      valueField: 'value',
      editable: false
    }, {
      fieldLabel: '日',
      name: 'data.deadline_day',
      store: 'TM.store.Days',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '时',
      name: 'data.deadline_hour',
      store: 'TM.store.Hours',
      valueField: 'value',
      xtype: 'combo',
      editable: false
    }, {
      fieldLabel: '分',
      name: 'data.deadline_minute',
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

  getValues: function() {
    var values = this.callParent();

    values.data = [];
    ['month', 'day', 'hour', 'minute'].forEach(function(name) {
      values.data['deadline_' + name] = this.getDeadlineCombo('data.deadline_' + name).getValue();
      delete values['data.deadline_' + name];
    }, this);

    ['x', 'y'].forEach(function(name) {
      values.data[name] = this.query('textfield[name="data.' + name + '"]')[0].getValue();
      delete values['data.' + name];
    }, this);

    return values;
  },

  loadRecord: function(record) {
    this.callParent(arguments);

    this.refreshDeadline(record.get('plan_type'));

    ['month', 'day', 'hour', 'minute'].forEach(function(name) {
      this.getDeadlineCombo('data.deadline_' + name).setValue(record.get('data')['deadline_' + name]);
    }, this);
  },

  // @protected
  initComponent: function() {
    this.callParent(arguments);

    var planTypeCombo = this.query('fieldset combo[name="plan_type"]')[0];
    planTypeCombo.setValue(this.defaultPlanType);
    planTypeCombo.on('change', this.onPlanTypeChange, this);

    var beginToRemindField = this.query('fieldset textfield[name="begin_to_remind"]')[0];
    beginToRemindField.setValue(this.defaultBeginToRemind);

    this.refreshDeadline(this.defaultPlanType);
  },

  //@private
  onPlanTypeChange: function(combo, newValue) {
    this.refreshDeadline(newValue);
  },

  // @private
  refreshDeadline: function(planType) {
    switch(planType) {
      case 'yearly':
        this.showYearlyDeadlineCombos();
        break;
      case 'quarterly':
        this.showQuarterlyDeadlineCombos();
        break;
      case 'monthly':
        this.showMonthlyDeadlineCombos();
        break;
      case 'weekly':
        this.showWeeklyDeadlineCombos();
        break;
      case 'daily':
        this.showDailyDeadlineCombos();
        break;
      default:
        throw 'Invalid plan_type ' + planType;
    }

    ['month', 'day', 'hour', 'minute'].forEach(function(name) {
      this.getDeadlineCombo('data.deadline_' + name).setValue(null);
    }, this);
  },

  // @private
  showYearlyDeadlineCombos: function() {
    this.getDeadlineCombo('data.deadline_month').
      bindStore(Ext.getStore('TM.store.Months'));
    this.getDeadlineCombo('data.deadline_day').
      bindStore(Ext.getStore('TM.store.Days'));

    this.showDeadlineCombos(["month", "day", "hour", "minute"]);
  },

  // @private
  showQuarterlyDeadlineCombos: function() {
    this.getDeadlineCombo('data.deadline_month').
      bindStore(Ext.getStore('TM.store.QuarterlyMonths'));
    this.getDeadlineCombo('data.deadline_day').
      bindStore(Ext.getStore('TM.store.Days'));

    this.showDeadlineCombos(["month", "day", "hour", "minute"]);
  },

  // @private
  showMonthlyDeadlineCombos: function() {
    this.getDeadlineCombo('data.deadline_day').
      bindStore(Ext.getStore('TM.store.Days'));

    this.showDeadlineCombos(["day", "hour", "minute"]);
    this.hideDeadlineCombos(["month"]);
  },

  // @private
  showWeeklyDeadlineCombos: function() {
    this.getDeadlineCombo('data.deadline_day').
      bindStore(Ext.getStore('TM.store.WeekDays'));

    this.showDeadlineCombos(["day", "hour", "minute"]);
    this.hideDeadlineCombos(["month"]);
  },

  // @private
  showDailyDeadlineCombos: function() {
    this.showDeadlineCombos(["hour", "minute"]);
    this.hideDeadlineCombos(["month", "day"]);
  },

  // @private
  getDeadlineCombo: function(name) {
    return this.query('#deadline combo[name="' + name + '"]')[0];
  },

  // @private
  showDeadlineCombos: function(combos) {
    combos.forEach(function(c) {
      this.getDeadlineCombo('data.deadline_' + c).show();
    }, this);
  },

  // @private
  hideDeadlineCombos: function(combos) {
    combos.forEach(function(c) {
      this.getDeadlineCombo('data.deadline_' + c).hide();
    }, this);
  }
});
