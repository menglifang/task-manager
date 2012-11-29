//= require ./spec_helper.js
Siesta.Harness.Browser.ExtJS.configure({
  title: 'Task Manager',
  testClass: Siesta.ux.Test,
  preload: [
    "/assets/extjs/resources/css/ext-all.css",
    "/assets/extjs/ext-all-debug.js",
    "/assets/task-manager/extjs.js"
  ]
});
