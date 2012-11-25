Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index',
    'plan.AssignablesWindow'

  ],

  // stores: [
  //   'Plan'
  // ],

  models: [
    'Plan',
    'Assignee'
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
    ref: 'planEditWindow',
    selector: 'plan_editwindow'
  }, {
    ref: 'planEdit',
    selector: 'plan_edit'
  }, {
    ref: 'planType',
    selector: 'plan_new combo[name="plan_type"]'
  }, {
    ref: 'assignablesField',
    selector: 'plan_new textfield[id="assignables"]'
  }, {
    ref: 'editAssignablesField',
    selector: 'plan_edit textfield[id="editassignables"]'
  }, {
    ref: 'selectAssignablesGrid',
    selector: 'plan_selectassignablesgrid'
  }, {
    ref: 'selectAssignables',
    selector: 'plan_selectassignables'
  }, {
    ref: 'assignablesWindow',
    selector: 'plan_assignableswindow'
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
      'plan_new textfield[id="assignables"]': {
        render: this.onSelectAssignablesRender
      },
      'plan_edit textfield[id="editassignables"]': {
        render: this.onEditSelectAssignablesRender
      },
      'plan_new': {
        afterrender: this.onNewFormAfterRender
      },
      'plan_new combo': {
        change: this.onPlanTypeChange
      },
      'plan_edit combo': {
        change: this.onEditPlanTypeChange
      },
      'plan_new button[action="save"]': {
        click: this.onSaveClick
      },
      'plan_new button[action="reset"]': {
        click: this.onResetClick
      },
      'plan_selectassignablesGrid': {
        select: this.onSelectAssignablesGridSelect,
        deselect: this.onSelectAssignablesGridDeselect
      },
      // 'plan_selectassignablesGrid': {
      //   select: this.onEditSelectAssignablesGridSelect,
      //   deselect: this.onEditSelectAssignablesGridDeselect
      // },
      'plan_selectassignables button[action="save"]': {
        click: this.onSelectAssignablesGridSave
      },
      // 'plan_selectassignables button[action="save"]': {
      //   click: this.onEditSelectAssignablesGridSave
      // },
      'plan_selectassignables button[action="cancel"]': {
        click: this.onSelectAssignablesGridCancel
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

  onSelectAssignablesRender: function() {
    this.getAssignablesField().getEl().on('click', this.onSelectAssignables);
  },

  onEditSelectAssignablesRender: function() {
    this.getEditAssignablesField().getEl().on('click', this.onSelectAssignables);
  },

  onSelectAssignables: function() {
    Ext.create('TM.view.plan.AssignablesWindow').show();
  },

  onSelectAssignablesGridSelect: function(row, record, index, eOpts) {
    var assignees = this.getPlanNew().assignees;

    assignees.push(record);
  },

  onSelectAssignablesGridDeselect: function(row, record, index, eOpts) {
    var assignees = this.getPlanNew().assignees;

    Ext.Array.remove(assignees, record);
  },

  onSelectAssignablesGridSave: function(btn) {
    var results = new Array();
    Ext.Array.forEach(this.getPlanNew().assignees, function(record, index, assignees) {
      results.push(record.get('name'));
    });
    this.getAssignablesField().setValue(results.join(', '));

    this.getAssignablesWindow().close();
  },

  onEditSelectAssignablesGridSelect: function(row, record, index, eOpts) {
    var assignees = this.getPlanEdit().assigneesForEdit;

    assignees.push(record);
  },

  onEditSelectAssignablesGridDeselect: function(row, record, index, eOpts) {
    var assignees = this.getPlanEdit().assigneesForEdit;

    Ext.Array.remove(assignees, record);
  },

  onEditSelectAssignablesGridSave: function(btn) {
    var results = new Array();
    Ext.Array.forEach(this.getPlanEdit().assigneesForEdit, function(record, index, assignees) {
      results.push(record.get('name'));
    });
    this.getEditAssignablesField().setValue(results.join(', '));

    this.getAssignablesWindow().close();
  },

  onUpdateClick: function(btn) {
    // var attrs = btn.up('plan_edit').getForm().getValues();
    // var self = this;
    // record.save({
    //   success: function() {
    //     Ext.Msg.alert('提示', '更新成功!');
    //     self.getPlanStore.insert(0, plan);
    //     self.getPlaEditWindow().close();
    //   },
    //   failure: function() {
    //     Ext.Msg.alert('提示', '更新失败!');
    //   }
    // });


    var self = this;
    var attrs = this.getPlanEdit().getValues();

    attrs.assignees = this.getPlanEdit().assignees;

    // attrs.enabled_at =  new Date(document.getElementById("enabled_at").value);
    var date = this.getPlanEdit().getValues().enabled_at;
    attrs.enabled_at = Ext.Date.parse(date, "Y/m/d", true);

    attrs.autocompletable = (attrs.autocompletable == 'on') ? true : false;


    var record = btn.up('plan_edit').getRecord();
    record.update(attrs, {
      success: function(record, operation) {
        Ext.Msg.alert('提示', '计划更新成功!');
        self.getPlanEditWindow().close();
      },
      failure: function() {
        Ext.Msg.alert('提示', '计划更新失败!')
      }
    })

    // this.getPlanModel().load({
    //   success: function(record) {
    //     record.update(attrs, {
    //     success: function() {
    //       Ext.Msg.alert('提示', '计划更新成功!');
    //       Ext.getStore('TM.store.Plans').insert(0, plan);
    //       self.getPlanWindow().close();
    //     },
    //     failure: function() {
    //       Ext.Msg.alert('提示', '计划更新失败!')
    //     }
    //     })
    //   }
    // })
  },

  onCloseClick: function(btn) {
    btn.up('plan_editwindow').close();
  },

  onSelectAssignablesGridCancel: function(btn) {
    btn.up('plan_assignableswindow').close();
  },

  onEditFormRender: function(record) {
  },

  onEditClick: function(btn) {
    var record = btn.up('plan_grid').getSelectionModel().getSelection()[0];

    if (record == null) {
      Ext.Msg.alert('提示', '请选择要修改的数据');
      return;
    } else if(record.length > 1){
      Ext.Msg.alert('提示', '请选择要修改的数据');
      return;
    }

    var win = Ext.create('TM.view.plan.EditWindow');
    
    win.show();

    win.down('plan_edit').loadRecord(record);
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

    attrs.assignees = this.getPlanNew().assignees;

    // attrs.enabled_at =  new Date(document.getElementById("enabled_at").value);
    var date = this.getPlanNew().getValues().enabled_at;
    attrs.enabled_at = Ext.Date.parse(date, "Y/m/d", true);

    attrs.autocompletable = (attrs.autocompletable == 'on') ? true : false;

    var Plan = TM.model.Plan;
    var plan = Plan.create(attrs, {
      success: function() {
        Ext.Msg.alert('提示', '计划添加成功!');
        Ext.getStore('TM.store.Plans').insert(0, plan);
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

    if(value == 'daily') {
      this.getPlanNew().getComponent('fillField').getComponent('new_begin_to_remind').setDisabled(true);
      this.getPlanNew().showDailyField();
    } else {
      this.getPlanNew().getComponent('fillField').getComponent('new_begin_to_remind').setDisabled(false);
      if(value == 'yearly') {
        this.getPlanNew().showYearlyField();
      } else if(value == 'quarterly') {
        this.getPlanNew().showQuarterlyField();
      } else if(value == 'monthly') {
        this.getPlanNew().showMonthlyField();
      } else if(value == 'weekly') {
        this.getPlanNew().showWeeklyField();
      }
    }
  },

  onEditPlanTypeChange: function(combo, value, oldValue) {
    if (value == oldValue) return;

    if(value == 'daily') {
      this.getPlanEdit().getComponent('editFillField').getComponent('edit_begin_to_remind').setDisabled(true);
      this.getPlanEdit().showDailyField();
    } else {
      this.getPlanEdit().getComponent('editFillField').getComponent('edit_begin_to_remind').setDisabled(false);
      if(value == 'yearly') {
        this.getPlanEdit().showYearlyField();
      } else if(value == 'quarterly') {
        this.getPlanEdit().showQuarterlyField();
      } else if(value == 'monthly') {
        this.getPlanEdit().showMonthlyField();
      } else if(value == 'weekly') {
        this.getPlanEdit().showWeeklyField();
      }
    }
  },
  index: function() {
    this.render('TM.view.plan.Index');
  }
});
