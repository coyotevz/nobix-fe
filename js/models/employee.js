define([
  'models/base/model',
], function(Model) {
  "use strict";

  var Employee = Model.extend({
    urlRoot: '/employees',
  });

  return Employee;
});
