Ext.define('TM.controller.Plans', {
  extend: 'Ext.app.Controller',

  views: [
    'plan.Index'
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
    ref: 'planForm',
    selector: 'plan_form'
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

    var win = Ext.create('TM.view.plan.FormWindow', { title: '修改计划' } );
    win.show();

    this.getPlanForm().loadRecord(record);
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

  onSaveClick: function(btn) {
    var self = this;
    var attrs = this.getPlanForm().getValues();
    var record = this.getPlanForm().getRecord() ||
      Ext.create('TM.model.Plan');

    record.set(attrs);
    record.save({
      success: function() {
        Ext.Msg.alert('提示', '保存计划成功!');
        self.getPlanFormWindow().close();
      },
      failure: function() {
        Ext.Msg.alert('提示', '保存计划失败!')
      }
    });
  },

  onCancelClick: function(btn) {
    this.getPlanFormWindow().close();
  },

  onQueryClick: function(btn) {
    var params = this.getSearchForm().getValues();
    Ext.getStore('TM.store.Plans').load({ params: params });
  },

  onSearchResetClick: function(btn) {
    this.getSearchForm().getForm().reset();
  },

  index: function() {
    this.render('TM.view.plan.Index');
  }
});
