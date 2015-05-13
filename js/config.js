// Configure the AMD module loader

var require = {

  // Path where JavaScript root modules are located
  baseUrl: "/js",

  paths: {
    // Specify the path for vendor libraries
    'json':           'vendor/json2-2015-02-25',
    'jquery':         'vendor/jquery-2.1.3',
    'underscore':     'vendor/lodash-3.7.0',
    'backbone':       'vendor/backbone-1.1.2',
    'chaplin':        'vendor/chaplin-1.0.1',
    'nunjucks':       'vendor/nunjucks-1.3.3',
    'nunjucks-slim':  'vendor/nunjucks-slim-1.3.3',
    'pace':           'vendor/pace-1.0.2',
    'materialize':    'vendor/materialize-0.96.1',
    'jquery.pin':     'vendor/jquery.pin',
  },

  shim: {
    'pace': {
      deps: ['jquery'],
    },
    'underscore': {
      exports: '_',
    },
    'backbone': {
      // inject json as a dependency
      deps: ['json', 'jquery', 'underscore'],
      exports: 'Backbone',
    },
    'nunjucks': {
      exports: 'nunjucks',
    },
    'jquery.pin': {
      deps: ['jquery'],
    },
  },

  // For easier development, disable brower caching
  // Of course, this should be removed in production environment
  urlArgs: 'ver=' + (new Date()).getTime()

};
