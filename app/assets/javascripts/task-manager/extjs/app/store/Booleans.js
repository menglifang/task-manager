Ext.define('TM.store.Booleans',{
	extend: 'Ext.data.Store',

	fields: ['text', 'value'],
	data : [
	  { "text": "否", 'value': 'false' },
	  { "text": "是", 'value': 'true' }
	]
});
