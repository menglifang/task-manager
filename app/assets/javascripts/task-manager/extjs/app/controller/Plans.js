Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index',
    'plan.AssignablesWindow'
  ],

  models: [
    'Plan',
    'Assignee'
  ],

  refs: [{
    ref: 'searchForm',
    selector: 'plan_search'
  }, {
    ref: 'planFormWindow',
    selector: 'plan_formwindow'
  }, {
    ref: 'planWindow',
    selector: 'plan_window'
  }, {
    ref: 'planForm',
    selector: 'plan_form'
  }, {
    ref: 'planEditWindow',
    selector: 'plan_editwindow'
  }, {
    ref: 'planEdit',
    selector: 'plan_edit'
  }, {
    ref: 'selectAssignablesTree',
    selector: 'plan_selectassignablestree'
  }, {
    ref: 'editAssignablesField',
    selector: 'plan_edit textfield[id="editassignables"]'
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
      'plan_form button[action="save"]': {
        click: this.onSaveClick
      },
      'plan_form button[action="cancel"]': {
        click: this.onCancelClick
      },
      'plan_edit textfield[id="editassignables"]': {
        render: this.onEditSelectAssignablesRender
      },
      'plan_edit combo': {
        change: this.onEditPlanTypeChange
      },
      'plan_selectassignables button[action="save"]': {
        click: this.onSelectAssignablesSave
      },
      'plan_selectassignables button[action="cancel"]': {
        click: this.onSelectAssignablesCancel
      },
      'plan_edit': {
        render: this.onEditFormRender
      },
      'plan_edit button[action="update"]': {
        click: this.onUpdateClick
      },
      'plan_edit button[action="close"]': {
        click: this.onCloseClick
      },
      'plan_selectassignablestree': {
        checkchange: this.onAssigneesTreeCheckChange
      }
    });
  },

  onAddClick: function() {
    Ext.create('TM.view.plan.FormWindow', { title: '添加计划' }).show();
  },

  onEditClick: function(btn) {
    var length = btn.up('plan_grid').getSelectionModel().getSelection().length;
    if (length == 0) {
      Ext.Msg.alert('提示', '请选择要修改的数据');
      return;
    }
    if(length > 1){
      Ext.Msg.alert('提示', '修改的数据一次只能选择一条！');
      return;
    }

    var record = btn.up('plan_grid').getSelectionModel().getSelection()[0];

    var win = Ext.create('TM.view.plan.EditWindow');
    win.show();

    win.down('plan_edit').loadRecord(record);

    this.generateEditTree(record.get('assignees'));

    var results = [];
    this.getPlanEdit().assignees = [];
    var assignees = this.getPlanEdit().assignees;
    var nodes = Ext.getStore('TM.store.AssigneesTree').getRootNode().childNodes;
    this.generateResult(assignees, results, nodes);
    this.getEditAssignablesField().setValue(results.join(', '));
  },

  onSaveClick: function(btn) {
    var self = this;
    var attrs = this.getPlanForm().getValues();
    var record = this.getPlanForm().getRecord() ||
      Ext.create('TM.model.Plan', attrs);

    record.save({
      success: function() {
        Ext.Msg.alert('提示', '计划添加成功!');
        self.getPlanFormWindow().close();
      },
      failure: function() {
        Ext.Msg.alert('提示', '计划添加失败!')
      }
    });
  },

  onCancelClick: function(btn) {
    this.getPlanFormWindow().close();
  },

  onAssigneesTreeCheckChange: function(node, checked, opts) {
    node.set('checked', checked);
    node.cascadeBy(function(n) {
      n.set('checked', checked)
    });
  },

  onSelectAssignablesRender: function() {
    Ext.getStore('TM.store.Assignees').reload();
    //Ext.getStore('TM.store.AssigneesTree').
    //setRootNode(Ext.getStore('TM.store.Assignees').toTreeStore().root);

    this.getAssignablesField().getEl().on('click', this.onSelectAssignables, this, {action: 'create'});
  },

  onEditSelectAssignablesRender: function() {
    this.getEditAssignablesField().getEl().on('click', this.onSelectAssignables, this, {action: 'edit'});
  },

  onSelectAssignables: function(eventName, fn, opts) {
    Ext.create('TM.view.plan.AssignablesWindow', { 'action': opts.action }).show();
  },

  onSelectAssignablesCancel: function(btn) {
    btn.up('plan_assignableswindow').close();
  },

  onSelectAssignablesSave: function(btn) {
    var nodes = Ext.getStore('TM.store.AssigneesTree').getRootNode().childNodes;
    var action = btn.up('plan_assignableswindow').action;
    var view = action == 'create' ? this.getPlanNew() : this.getPlanEdit();
    var assigneesField = action == 'create' ? this.getAssignablesField() : this.getEditAssignablesField()

    view.assignees = [];
    var assignees = view.assignees;

    var results = [];
    this.generateResult(assignees, results, nodes);

    assigneesField.setValue(results.join(', '));
    this.getAssignablesWindow().close();
  },

  generateResult: function(assignees, results, nodes) {
    var self = this;
    Ext.Array.forEach(nodes, function(node, index, nodes) {
      if (node.get('leaf')) {
        if (node.get('checked')) {
          results.push(node.get('text'));
          assignees.push(node);
        }
      } else {
        self.generateResult(assignees, results, node.childNodes);
      }
    });
  },

  onUpdateClick: function(btn) {
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
  },

  onEditFormRender: function(record) {
  },


  generateEditTree: function(assignees) {
    var self = this;
    Ext.getStore('TM.store.Assignees').reload();
    //Ext.getStore('TM.store.AssigneesTree').
    //setRootNode(Ext.getStore('TM.store.Assignees').toTreeStore().root);

    Ext.Array.each(Ext.getStore('TM.store.AssigneesTree').tree.root.childNodes,
                   function(node, index, nodes) {
                     self.checkNodes(node, assignees);
                   });

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
  onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();
    Ext.getStore('TM.store.Plans').load({ params: params });
  },

  onSearchResetClick: function(btn) {
    this.getSearchForm().getForm().reset();
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
  },

  // @private
  prepareAttrsForCreate: function(attrs) {
    // 准备执行者参数
    attrs.assignables_attributes = [];

    var assignees = this.getPlanNew().assignees;
    Ext.Array.forEach(assignees, function(node, index, assignees) {
      var record = Ext.getStore('TM.store.Assignees').getById(node.get('id'));
      attrs.assignables_attributes.push({
        assignee_id: record.get('id'),
        assignee_type: record.get('class_name')
      });
    });

    var date = this.getPlanNew().getValues().enabled_at;
    attrs.enabled_at = Ext.Date.parse(date, "Y/m/d", true);
    attrs.autocompletable = (attrs.autocompletable == 'on') ? true : false;

    attrs.data = {
      x: attrs['data.x'],
      y: attrs['data.y'],
      deadline_month: attrs.plan_type == 'quarterly' ? attrs['data.deadline_quarterly_month'] : (attrs.plan_type == 'yearly' ? attrs['data.deadline_month'] : null),
      deadline_day: attrs.plan_type == 'weekly' ? attrs['data.deadline_weekly_day'] : (attrs.plan_type == 'daily' ? null : attrs['data.deadline_day']),
      deadline_hour: attrs['data.deadline_hour'],
      deadline_minute: attrs['data.deadline_minute']
    }
  }
});
