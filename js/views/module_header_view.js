define([
  'views/base/view',
  'jquery.pin',
  'materialize.sideNav',
  'views/module_selector_view',
], function(View) {
  "use strict";

  var ModuleHeaderView = View.extend({
    container: '.module-header-container',
    template: 'module_header.html',
    optionNames: View.prototype.optionNames.concat(['view']),

    listen: {
      'pace:hide mediator': 'pin',
    },

    initialize: function() {
      ModuleHeaderView.__super__.initialize.apply(this, arguments);
      console.log('ModuleHeaderView#initialize');
    },

    getTemplateData: function() {
      return { module:
        {name: 'supplier', url: '#suppliers', title: 'Proveedores'}
      };
    },

    pin: function() {
      this.$el.parent().pin();
      this.$('.button-collapse').click(function() {
        $(this).tooltip('hide');
      }).sideNav({
        closeOnClick: true
      });
    },

  });

  return ModuleHeaderView;

});
