Ext.application({
  name: 'Dummy',
  appFolder: 'assets/extjs/app',

  controllers: [
    'Viewport',
    'TM.controller.Plans',
    'TM.controller.Tasks'
  ],

  autoCreateViewport: true,
  enableRouter: true,
  requires: [
    'Ext.ux.Router',
    'Ext.ux.Controller'
  ],

  routes: {
    'plan': 'TM.controller.Plans#index',
    'task': 'TM.controller.Tasks#index'
  },

  launch: function() {
  },

  // @private
  bindRouterEvents: function() {
    Ext.ux.Router.on({
      routemissed: function(uri) {
        Ext.Msg.show({
          title:'Error 404',
          msg: 'Route not found: ' + uri,
          buttons: Ext.Msg.OK,
          icon: Ext.Msg.ERROR
        });
      },
      beforedispatch: function(uri, match, params) {
        console.log('beforedispatch ' + uri);
      },
      dispatch: function(uri, match, params, controller) {
        console.log('dispatch ' + uri);
        //TIP: you could automize rendering task here, inside dispatch event
      }
    });
  }
});
