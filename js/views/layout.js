define([
  'jquery',
  'chaplin',
  'nobix.tooltip',
  'jquery.nicescroll',
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
      $(document).bind('click.out-tooltip', function(e) {
        $('[rel="tooltip"]').tooltip('hide');
      });
      $('html').niceScroll({
        cursorcolor: "#bdbdbd",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorwidth: "6px",
        cursorborder: "1px solid transparent",
        cursorborderradius: 0,
        //zindex: 600,
        horizontalenabled: false,
      });
    },
  });

  return Layout;
});
