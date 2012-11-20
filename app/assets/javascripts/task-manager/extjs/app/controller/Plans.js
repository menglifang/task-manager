Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
  ],

  // stores: [
  //   'Plan'
  // ],

  models: [
    'Plan'
  ],

  refs: [{
    ref: 'searchForm',
    selector: 'plan_search'
  }, {
    ref: 'planWindow',
    selector: 'plan_window'
  }, {
    ref: 'planNew',
    selector: 'plan_new'
  }, {
    ref: 'planType',
    selector: 'plan_new combo[name="plan_type"]'
  }],

  init: function() {
    this.control({
      'plan_search button[action="query"]': {
        click: this.onQueryClick
      },
      'plan_search button[action="reset"]': {
        click: this.onSearchResetClick
      },
      'plan_grid button[action="add"]': {
        click: this.onAddClick
      },
      'plan_grid button[action="edit"]': {
        click: this.onEditClick
      },
      'plan_grid button[action="delete"]': {
        click: this.onDeleteClick
      },
      'plan_new': {
        afterrender: this.onNewFormAfterRender
      },
      'plan_new combo': {
        change: this.onPlanTypeChange
      },
      'plan_new button[action="save"]': {
        click: this.onSaveClick
      },
      'plan_new button[action="reset"]': {
        click: this.onResetClick
      },
      'plan_edit': {
        render: this.onEditFormRender
      },
      'plan_edit button[action="update"]': {
        click: this.onUpdateClick
      },
      'plan_edit button[action="close"]': {
        click: this.onCloseClick
      }
    });
  },

  onUpdateClick: function(btn) {
    var attrs = btn.up('plan_edit').getForm().getValues();
    var self = this;

    var record = Ext.create('Ext.model.Plan', {
      id: attrs.id,
      name: attrs.name,
      plan_type: attrs.plan_type,
      data: attrs.data,
      autocompletable: attrs.autocompletable,
      ahead_of_time: attrs.ahead_of_time,
      begin_to_remind: attrs.begin_to_remind,
      enabled_at: attrs.enabled_at,
      last_task_created_at: attrs.last_task_created_at,
      created_at: attrs.created_at,
      updated_at: attrs.updated_at,
      assignees: attrs.assignees
    });

    var oldRecord = btn.up('plan_edit').getRecord();

    record.save({
      success: function() {
        Ext.Msg.alert('提示', '更新成功!');
        self.getPlanStore.insert(0, plan);
        self.getPlaEditWindow().close();
      },
      failure: function() {
        Ext.Msg.alert('提示', '更新失败!');
      }
    });
  },

  onCloseClick: function(btn) {
    btn.up('plan_editwindow').close();
  },

  onEditFormRender: function(btn) {
    var record = btn.up('plan_grid').getRecord();
    record.plan_type = record.get('plan_type');

    if(record.plan_type == 'yearly') {
      this.getPlanNew().showYearlyField();
    } else if(record.plan_type == 'quarterly') {
      this.getPlanNew().showMonthlyField();
    } else if(record.plan_type == 'monthly') {
      this.getPlanNew().showQuarterlyField();
    } else if(record.plan_type == 'weekly') {
      this.getPlanNew().showWeeklyField();
    } else if(record.plan_type == 'daily') {
      this.getPlanNew().showDailyField();
    }
  },

  onEditClick: function(btn) {
    var record = btn.up('plan_grid').getSelectionModel().getSelection()[0];

    if (record == null) {
      Ext.Msg.alert('提示', '请选择要修改的数据');
      return;
    }

    var win = Ext.create('TM.view.plan.EditWindow');

    win.down('TM.view.plan.Edit').loadRecord(record);
    
    win.show();
  },

  onDeleteClick: function(btn) {
    var select = btn.up('plan_grid').getSelectionModel().getSelection()[0];
    if(select == null) {
      Ext.Msg.alert('提示','请选择要删除的计划任务');
      return;
    }

    Ext.Msg.confirm('提示','您确认要删除选中的计划任务吗？', function(b){
      if(b != 'yes') return;

      var selected = btn.up('plan_grid').getSelectionModel().getSelection();
      Ext.each(selected, function(s){
        s.destroy();
      });
    });
  },

  onResetClick: function(btn) {
    this.getPlanNew().getForm().reset();
  },

  onSaveClick: function(btn) {
    var self = this;
    var attrs = this.getPlanNew().getValues();

    // TUDO ..
    // attrs.data = attrs['data[x]'] + ',' + attrs['data[y]'];

    attrs.begin_to_remind = Ext.Number.from(attrs.begin_to_remind) * -1;
    // attrs.enabled_at =  new Date(document.getElementById("enabled_at").value);
    var date = this.getPlanNew().getValues().enabled_at;
    attrs.enabled_at = Ext.Date.parse(date, "Y/m/d", true);

    var time = attrs.plan_type;

    //TODO.
    // if (time == 'monthly'){
    //   attrs.
    // }else if(tiem == 'weekly') {
    //   attrs.ahead_of_time = Ext.Number.from(attrs.weekly_day, 0)*24*60 + Ext.Number.from(attrs.hour, 0)*60 + Ext.Number.from(attrs.minute, 0);
    // }else if(time == 'daily') {
    //   attrs.ahead_of_time = Ext.Number.from(attrs.hour, 0)*60 + Ext.Number.from(attrs.minute, 0);
    // } else {
    //   attrs.ahead_of_time = Ext.Number.from('', 0);
    // };

    attrs.autocompletable = (attrs.autocompletable == 'on') ? true : false;
    
    var Plan = TM.model.Plan;
    var plan = Plan.create(attrs, {
      success: function() {
        Ext.Msg.alert('提示', '计划添加成功!');
        self.getPlanStore().insert(0, plan);
        self.getPlanWindow().close();
      },
      failure: function() {
        Ext.Msg.alert('提示', '计划添加失败!')
      }
    })
  },

  onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();
    if(!this.getSearchForm().hasQueryParams()) {
      Ext.Msg.alert('提示', '您要查找的条件不能全为空，至少要有一项！');
      return;
    }
    Ext.getStore('TM.store.Plans').load({ params: params });
  },

  onSearchResetClick: function(btn) {
    this.getSearchForm().getForm().reset();
  },

  onAddClick: function() {
    Ext.create('TM.view.plan.Window').show();
  },

  onNewFormAfterRender: function() {
    this.getPlanType().setValue('daily');
  },

  onPlanTypeChange: function(combo, value, oldValue) {
    if (value == oldValue) return;

    if(value == 'yearly') {
      this.getPlanNew().showYearlyField();
    } else if(value == 'quarterly') {
      this.getPlanNew().showMonthlyField();
    } else if(value == 'monthly') {
      this.getPlanNew().showQuarterlyField();
    } else if(value == 'weekly') {
      this.getPlanNew().showWeeklyField();
    } else if(value == 'daily') {
      this.getPlanNew().showDailyField();
    }
  },

  index: function() {
    this.render('TM.view.plan.Index');
  },

  PlanChangeTrue: function() {
    return true;
  },

  PlanChangeFalse: function() {
    return false;
  }
});
