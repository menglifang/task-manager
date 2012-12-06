Ext.define('TM.view.plan.Form', {
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
      fieldLabel: '名称',
      name: 'name',
      allowBlank: false
    }, {
      xtype: 'assignee_treecombo',
      fieldLabel: '执行人',
      name: 'assignables_attributes',
      store: Ext.getStore('TM.store.Assignees').toTreeStore()
    }, {
      fieldLabel: '类型',
      name: 'plan_type',
      store: 'TM.store.Types',
      editable: false,
      valueField: 'value',
      xtype: 'combo',
      blankText: '请选择类型!',
      allowBlank: false
    }, {
      fieldLabel: '横向指标',
      emptyText: '请用逗号分割指标项',
      name: 'data.x'
    }, {
      fieldLabel: '纵向指标',
      emptyText: '请用逗号分割指标项',
      name: 'data.y'
    }, {
      fieldLabel: '生效时间',
      xtype: 'datefield',
      editable: false,
      anchor: '100%',
      format: 'Y/m/d',
      name: 'enabled_at'
    }, {
      fieldLabel: '提前几天提醒',
      name: 'begin_to_remind'
    }, {
      fieldLabel: '是否自动完成',
      xtype: 'checkbox',
      name: 'autocompletable'
    }, {
      fieldLabel: '逾期处理',
      xtype: 'callback_checkboxcombo',
      editable: false,
      name: 'callables_attributes',
      store: 'TM.store.Callbacks',
      multiSelect: true,
      displayField: 'name',
      valueField: 'id'
    }]
  }, {
    xtype: 'fieldset',
    itemId: 'deadline',
    title: '截止时间',
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
    text: '取消',
    action: 'cancel'
  }],

  getValues: function() {
    var values = this.callParent();

    values.data = {};
    ['month', 'day', 'hour', 'minute'].forEach(function(name) {
      values.data['deadline_' + name] = this.getDeadlineCombo('data.deadline_' + name).getValue();
      delete values['data.deadline_' + name];
    }, this);

    ['x', 'y'].forEach(function(name) {
      values.data[name] = this.query('textfield[name="data.' + name + '"]')[0].getValue();
      delete values['data.' + name];
    }, this);

    values.begin_to_remind = values.begin_to_remind * 24 * 60;

    return values;
  },

  loadRecord: function(record) {
    this.callParent(arguments);

    this.refreshDeadline(record.get('plan_type'));

    ['month', 'day', 'hour', 'minute'].forEach(function(name) {
      this.getDeadlineCombo('data.deadline_' + name).setValue(record.get('data')['deadline_' + name]);
    }, this);

    ['x', 'y'].forEach(function(name) {
      this.query('textfield[name="data.' + name + '"]')[0].setValue(record.get('data')[name]);
    }, this);

    this.query('textfield[name="begin_to_remind"]')[0].setValue(record.get('begin_to_remind') / (24 * 60));

    this.checkSelectedAssignees(record.get('assignees'));
    this.checkSelectedCallbacks(record.get('callbacks'));
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

  // @private
  checkSelectedCallbacks: function(callbacks) {
    if (typeof callbacks === 'undefined') return;

    var values = [];
    callbacks.forEach(function(c) {
      values.push(c.id);
    });

    //this.getCallbackCheckCombo().setValue(values.join(', '));
    this.getCallbackCheckCombo().setValue(values);
  },

  // @private
  checkSelectedAssignees: function(assignees) {
    if(typeof assignees === 'undefined') return;

    var values = [];
    assignees.forEach(function(a) {
      var node = this.getAssigneesTreeCombo().tree.getRootNode().findChildBy(function(node) {
        with(node.raw) {
          return record.get('id') == a.id &&
            record.get('name') == a.name
        }
      }, this, true);

      if(node) {
        values.push({
          assignee_id: node.raw.record.get('id'),
          assignee_type: node.raw.record.get('class_name')
        });
      }
    }, this);

    //console.log(values);
    this.getAssigneesTreeCombo().setValue(values);
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
  },

  // @private
  getAssigneesTreeCombo: function() {
    return this.query('assignee_treecombo')[0];
  },

  // @private
  getCallbackCheckCombo: function() {
    return this.query('callback_checkboxcombo')[0];
  }
});
