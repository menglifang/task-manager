//= require ./Shared.js
StartTest(function(t) {
  createForm();

  var values = form.getValues(),
      names  = [
                'x', 'y',
                'deadline_month', 'deadline_day',
                'deadline_hour', 'deadline_minute'
               ];

  t.ok(values.data, 'Values contains a key named data');

  names.forEach(function(name) {
    t.ok(!values.hasOwnProperty('data.' + name), 'Values does not contain a key named ' + name);
    t.ok(values.data.hasOwnProperty(name), 'Values.data contains a key named ' + name);
  });
});
