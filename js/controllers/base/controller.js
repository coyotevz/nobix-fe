define(['chaplin'], function(Chaplin) {
  "use strict";

  var Controller = Chaplin.Controller.extend({
    // Place your application-specific controller features here.
    beforeAction: function() {
      console.log('Controller.beforeAction');
    },
  });

  return Controller;
});
