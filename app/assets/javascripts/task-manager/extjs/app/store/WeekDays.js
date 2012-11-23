Ext.define('TM.store.WeekDays',{
	extend: 'Ext.data.Store',

	fields: ['text', 'value'],
	data : [
	  { "text": "星期一", 'value': '1' },
	  { "text": "星期二", 'value': '2' },
	  { "text": "星期三", 'value': '3' },
	  { "text": "星期四", 'value': '4' },
	  { "text": "星期五", 'value': '5' },
	  { "text": "星期六", 'value': '6' },
	  { "text": "星期日", 'value': '7' }
	]
});