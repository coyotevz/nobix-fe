define([
  'underscore',
  'chaplin',
  'views/base/view',
  'materialize.sideNav',
], function(_, Chaplin, View) {
  "use strict";

  var HeaderView = View.extend({
    template: 'header.html',
    noWrap: false,
    el: 'header',
    current_module: null,

    listen: {
      'pace:hide mediator': 'setupView',
      'module:setCurrent mediator': 'setCurrentModule',
    },

    getTemplateData: function() {
      return {
        module: this.current_module,
        modules: Chaplin.mediator.modules,
      };
    },

    setCurrentModule: function(mod_name) {
      this.current_module = _.filter(Chaplin.mediator.modules, 'name', mod_name)[0];
      this.updateView();
    },

    updateView: function() {
      this.$('.appbar.row')
        .removeClass()
        .addClass('appbar row')
        .addClass(this.current_module.name)
        .find('.module-title')
        .text(this.current_module.title);
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
