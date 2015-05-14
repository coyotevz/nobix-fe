define([
  'views/base/view',
  'jquery.pin',
], function(View) {
  "use strict";

  var ModuleHeaderView = View.extend({
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
      this.$el.pin();
    },

  });

  return ModuleHeaderView;

});
