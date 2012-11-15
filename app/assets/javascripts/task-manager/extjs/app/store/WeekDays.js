Ext.define('TM.store.WeekDays',{
	extend: 'Ext.data.Store',

	fields: ['text', 'value'],
	data : [
	  { "text": "第一天", 'value': '1' },
	  { "text": "第二天", 'value': '2' },
	  { "text": "第三天", 'value': '3' },
	  { "text": "第四天", 'value': '4' },
	  { "text": "第五天", 'value': '5' },
	  { "text": "第六天", 'value': '6' },
	  { "text": "第七天", 'value': '7' }
	]
});