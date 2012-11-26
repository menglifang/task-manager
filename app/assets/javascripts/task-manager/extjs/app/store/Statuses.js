Ext.define('TM.store.Statuses',{
	extend: 'Ext.data.Store',

	fields: ['text', 'value'],
	data : [
	  { "text": "新建", 'value': 'new' },
	  { "text": "进行中", 'value': 'in_process' },
	  { "text": "已过期", 'value': 'expired' },
	  { "text": "已完成", 'value': 'finished' }
	]
});
