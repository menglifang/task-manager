 Ext.define('TM.view.plan.New', {
 	extend: 'Ext.form.Panel',
 	xtype: 'plan_new',

 	defaults: {
 		xtype: 'fieldset',
		margin: '0 auto',
		border: false
 	},

 	items: [
 	{
 		
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
	 		fieldLabel: '计划内容',
	 		xtype: 'textarea',
	 		name: 'plan_content',
	 		allowBlank: false,
	 		height: 90
	 	}, {
	 		fieldLabel: '计划类型',
	 		name: 'plan_type',
	 		store: 'TM.store.Types',
	 		editable: false,
	 		valueField: 'value',
	 		xtype: 'combo',
	 		blankText: '请选择计划类型!',
	 		allowBlank: false
	 	}]
 	}, {
		xtype: 'fieldset',
		id: 'selectField',
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
			// store: 'TM.store.quarterly_month',
	 		valueField: 'value'
		}, {
			fieldLabel: '月',
			id: 'new_month',
			name: 'month',
			xtype: 'combo',
			// store: 'TM.store.month',
	 		valueField: 'value',
			// hidden: true
		}, {
			fieldLabel: '日',
			id: 'new_weekly_day',
			name: 'weekly_day',
			// store: 'TM.store.week',
	 		valueField: 'value',
			xtype: 'combo',
			
		}, {
			fieldLabel: '日',
			id: 'new_day',
			name: 'day',
			// store: 'TM.store.date',
	 		valueField: 'value',
			xtype: 'combo',
			// hidden: true
		}, {
			fieldLabel: '时',
			id: 'new_hour',
			name: 'hour',
			// store: 'TM.store.date',
	 		valueField: 'value',
			xtype: 'combo',
			// hidden: true
		}, {
			fieldLabel: '分',
			id: 'new_minute',
			name: 'minute',
			// store: 'TM.store.date',
	 		valueField: 'value',
			xtype: 'combo',
			// hidden: true
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

	showDayltyField: function() {
		var fieldSet = this.getComponent('selectField');
		fieldSet.getComponent('new_quarterly_month').hide();
    fieldSet.getComponent('new_weekly_day').hide();
    fieldSet.getComponent('new_month').hide();
    fieldSet.getComponent('new_day').hide();
    fieldSet.getComponent('new_hour').show();
    fieldSet.getComponent('new_minute').show();
	}

 });