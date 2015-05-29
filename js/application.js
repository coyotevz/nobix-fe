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

    initMediator: function() {
      // Set available modules
      Chaplin.mediator.modules = [
        //{name: 'dashboard', title: 'Dashboard'       , icon: 'mdi-action-home'          },
        //{name: 'sales'    , title: 'Ventas'          , icon: 'mdi-action-store'         },
        //{name: 'purchases', title: 'Compras'         , icon: 'mdi-action-shopping-cart' },
        {name: 'suppliers', title: 'Proveedores'     , icon: 'mdi-social-domain'        },
        //{name: 'products' , title: 'Productos'       , icon: 'mdi-maps-local-offer'     },
        {name: 'hr'       , title: 'Recursos Humanos', icon: 'mdi-social-people'        },
        //{name: 'finances' , title: 'Finanzas'        , icon: 'mdi-action-trending-up'   },
      ];

      Application.__super__.initMediator.call(this);
    },

    start: function() {
      var args = [].slice.call(arguments);
      // You can fetch some data here and start app
      // (by calling supermethod) after that.
      console.log('Start application', args);
      Application.__super__.start.apply(this, args);
    },
  });

  var app = new Application({
    routes: routes,
    pushState: false,
  });
});
