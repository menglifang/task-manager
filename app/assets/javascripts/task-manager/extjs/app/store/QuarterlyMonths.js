Ext.define('TM.store.QuarterlyMonths',{
	extend: 'Ext.data.Store',

	fields: ['text', 'value'],
	data : [
	  { "text": "第一个月", 'value': '1' },
	  { "text": "第二个月", 'value': '2' },
	  { "text": "第三个月", 'value': '3' }
	]
});