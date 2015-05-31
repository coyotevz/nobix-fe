define([
  'chaplin',
  'views/base_view',
  'views/module_selector_view',
  'views/module_header_view',
], function(Chaplin, BaseView, ModuleSelectorView, ModuleHeaderView) {
  "use strict";

  var Controller = Chaplin.Controller.extend({
    // Place your application-specific controller features here.
    beforeAction: function() {
      Controller.__super__.beforeAction.apply(this, arguments);
      this.reuse('root', BaseView, {region: 'root'});
      this.reuse('module_selector', ModuleSelectorView);
      this.reuse('module_header', ModuleHeaderView);
    },
  });

  return Controller;
});
