define([
  'models/base/model',
], function(Model) {
  "use strict";

  var Supplier = Model.extend({
    urlRoot: '/suppliers',
  });

  return Supplier;
});
