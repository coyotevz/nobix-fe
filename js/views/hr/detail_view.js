define([
  'jquery',
  'views/base/view'
], function($, View) {
  "use strict";

  var EmployeeDetailView = View.extend({
    autoRender: false,
    template: 'hr/detail.html',

    listen: {
      'sync model': 'render',
    },
  });

  return EmployeeDetailView;
});
