Ext.define('TM.store.Types',{
	extend: 'Ext.data.Store',

	fields: ['text', 'value'],
	data : [
	  { "text": "年计划", 'value': 'yearly' },
	  { "text": "季计划", 'value': 'quarterly' },
	  { "text": "月计划", 'value': 'monthly' },
	  { "text": "周计划", 'value': 'weekly' },
	  { "text": "日计划", 'value': 'daily' }
	]
});
