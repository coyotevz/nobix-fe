define([
  'views/base/view',
  'jquery.pin',
], function(View) {
  "use strict";

  var ModuleHeaderView = View.extend({
    template: 'module_header.html',
    noWrap: true,
    optionNames: View.prototype.optionNames.concat(['view']),

    initialize: function() {
      ModuleHeaderView.__super__.initialize.apply(this, arguments);
      console.log('ModuleHeaderView#initialize');
    },

    render: function() {
      ModuleHeaderView.__super__.render.apply(this, arguments);
    },

    getTemplateData: function() {
      return { module:
        {name: 'supplier', url: '#suppliers', title: 'Proveedores'}
      };
    },

  });

  return ModuleHeaderView;

});
