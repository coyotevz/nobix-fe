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
      $(window).scroll(this.onScroll);
    },

    onScroll: function(evt) {
      console.log('this.$el:', this.$el);
      // TODO: adjust on scroll event
    },
  });

  return ModuleSelectorView;
});
