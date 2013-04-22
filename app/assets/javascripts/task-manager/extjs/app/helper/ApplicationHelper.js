Ext.define('TM.helper.ApplicationHelper', {
  translateType: function(t) {
    var translations = {
      yearly: '年计划',
      quarterly: '季计划',
      monthly: '月计划',
      weekly: '周计划',
      daily: '日计划'
    };

    return translations[t];
  },

  translateStatus: function(s) {
    var translations = {
      'new': '新建',
      in_process: '进行中',
      expired: '已过期',
      finished: '已完成'
    };

    return translations[s];
  }
});
