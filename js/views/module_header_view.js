define([
  'views/base/view',
  'materialize.sideNav',
  'views/module_selector_view',
], function(View) {
  "use strict";

  var ModuleHeaderView = View.extend({
    container: '.module-header-container',
    template: 'module_header.html',
    optionNames: View.prototype.optionNames.concat(['view']),

    listen: {
      'pace:hide mediator': 'setupCollapse',
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

    setupCollapse: function() {
      this.$('.button-collapse').click(function() {
        $(this).tooltip('hide');
      }).sideNav({
        closeOnClick: true
      });
    },

  });

  return ModuleHeaderView;

});
