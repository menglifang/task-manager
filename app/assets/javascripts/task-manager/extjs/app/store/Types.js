Ext.define('TM.store.Types',{
	extend: 'Ext.data.Store',

	fields: ['name', 'value'],
	data : [
	  { "name": "年计划", 'value': 'yearly' },
	  { "name": "季机会", 'value': 'quarterly' },
	  { "name": "月计划", 'value': 'monthly' },
	  { "name": "周计划", 'value': 'weekly' },
	  { "name": "日计划", 'value': 'daily' }
	]
});