define([
  'chaplin',
  'views/base/view',
  'materialize.sideNav',
], function(Chaplin, View) {
  "use strict";

  var HeaderView = View.extend({
    template: 'header.html',
    noWrap: false,
    el: 'header',

    listen: {
      'pace:hide mediator': 'setupView',
    },

    getTemplateData: function() {
      return {
        module: { name: 'supplier', url: '#suppliers', title: 'Proveedores' },
        modules: Chaplin.mediator.modules,
      };
    },

    setupView: function() {
      this.$('.button-collapse').on("click", function() {
        $(this).tooltip('hide');
      }).sideNav({
        closeOnClick: true
      });

      // TODO: This needs more work
      this.$('.searchbox').on("click", function() {
        $('.search-input input', this).trigger("focus");
      });
      this.$('.search-input input')
        .on("focusin", function() {
          $('.appbar').addClass('on-search');
        })
        .on("focusout", function() {
          $('.appbar.on-search').removeClass('on-search');
        });
    },
  });

  return HeaderView;
});
