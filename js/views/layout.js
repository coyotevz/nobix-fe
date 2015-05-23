define([
  'jquery',
  'chaplin',
  'nobix.tooltip',
], function($, Chaplin) {
  "use strict";

  var Layout = Chaplin.Layout.extend({
    title: 'Nobix',

    listen: {
      'dispatcher:dispatch mediator': 'on_dispatch',
    },

    regions: {
      'root': '',
    },

    on_dispatch: function(controller, params, route) {
      console.log('dispatcher:dispatch event');
      this.$('[rel="tooltip"]').tooltip({
        placement: 'bottom',
        delay: { show: 400, hide: 0},
      });
    },
  });

  return Layout;
});
