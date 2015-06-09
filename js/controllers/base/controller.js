define([
  'chaplin',
  'views/base_view',
  'views/header_view',
], function(Chaplin, BaseView, HeaderView) {
  "use strict";

  var Controller = Chaplin.Controller.extend({
    // Place your application-specific controller features here.
    beforeAction: function() {
      Controller.__super__.beforeAction.apply(this, arguments);
      this.reuse('root', BaseView, {region: 'root'});
      this.reuse('header', HeaderView, {container: 'header'});
    },
  });

  return Controller;
});
