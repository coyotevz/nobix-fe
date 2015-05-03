define([
  'jquery',
  'chaplin',
], function($, Chaplin) {
  "use strict";

  var Layout = Chaplin.Layout.extend({
    title: 'Nobix',

    listen: {
      'dispatcher:dispatch mediator': 'on_dispatch',
    },

    regions: {
      main: '',
    },

    on_dispatch: function(controller, params, route) {
      console.log('dispatcher:dispatch event');
    },
  });

  return Layout;
});
