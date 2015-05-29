define([
  'views/base/view',
  'jquery',
], function(View, $) {
  "use strict";

  var ModuleSelectorView = View.extend({
    region: 'module_selector',
    template: 'module_selector.html',

    listen: {
      'pace:hide mediator': 'bindScroll',
    },

    bindScroll: function() {
      $(window).scroll($.proxy(this.onScroll, this));
      this.$mod_header = $('.module-header-container');
    },

    onScroll: function(evt) {
      this.$el.toggleClass('side-fixed', this.$mod_header.css('position') == 'fixed');
    },
  });

  return ModuleSelectorView;
});
