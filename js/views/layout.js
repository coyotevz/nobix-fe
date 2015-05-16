define([
  'jquery',
  'chaplin',
  'materialize.tooltip',
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
      $('[data-tooltip]').tooltip({ delay: 50 });
    },
  });

  return Layout;
});
