// Main application
require([
  'pace',
  'jquery',
  'chaplin',
  'views/layout',
  'routes',
], function(Pace, $, Chaplin, Layout, routes) {
  "use strict";

  Pace.start();
  Pace.on('hide', function() {
    Chaplin.mediator.publish('pace:hide');
  });
  Pace.on('done', function() {
    Chaplin.mediator.publish('pace:done');
  });

  Pace.once('hide', function() {
    $('#header').addClass('top-bar');
    $('#body').addClass('main');
    $('body').removeClass('pace-init').addClass('pace-sync');
  });

  // Cross domain CORS support for backbone.js
  $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
    options.crossDomain = true;
    options.xhrFields = {
      withCredentials: true,
    };
  });

  var Application = Chaplin.Application.extend({
    title: 'Nobix',

    initLayout: function(options) {
      options = options || {};
      options.title = options.title || this.title;
      this.layout = new Layout(options);
    },

    start: function() {
      var args = [].slice.call(arguments);
      // You can fetch some data here and start app
      // (by calling supermethod) after that.
      console.log('Start application');
      Chaplin.Application.prototype.start.apply(this, args);
    },
  });

  var app = new Application({
    routes: routes,
    pushState: false,
  });
});
