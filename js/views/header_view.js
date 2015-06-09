define([
  'views/base/view',
  'materialize.sideNav',
], function(View) {
  "use strict";

  var HeaderView = View.extend({
    template: 'header.html',

    listen: {
      'pace:hide mediator': 'setupCollapse',
    },

    getTemplateData: function() {
      return { module:
        { name: 'supplier', url: '#suppliers', title: 'Proveedores' }
      };
    },

    setupCollapse: function() {
      this.$('.button-collapse').on("click", function() {
        $(this).tooltip('hide');
      }).sideNav({
        closeOnClick: true
      });
    },
  });

  return HeaderView;
});
