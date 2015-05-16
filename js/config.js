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
    'jquery.pin':     'vendor/jquery.pin',

    // Materializedcss files
    'jquery.easing':                   'vendor/materialize/jquery.easing.1.3',
    'materialize.animation':           'vendor/materialize/animation',
    'velocity':                        'vendor/materialize/velocity.min',
    'hammerjs':                        'vendor/materialize/hammer.min',
    'jquery.hammer':                   'vendor/materialize/jquery.hammer',
    'materialize.global':              'vendor/materialize/global',
    'materialize.collapsible':         'vendor/materialize/collapsible',
    'materialize.dropdown':            'vendor/materialize/dropdown',
    'materialize.modal':               'vendor/materialize/leanModal',
    'materialize.materialbox':         'vendor/materialize/materialbox',
    'materialize.parallax':            'vendor/materialize/parallax',
    'materialize.tabs':                'vendor/materialize/tabs',
    'materialize.tooltip':             'vendor/materialize/tooltip',
    'materialize.waves':               'vendor/materialize/waves',
    'materialize.toasts':              'vendor/materialize/toasts',
    'materialize.sideNav':             'vendor/materialize/sideNav',
    'materialize.scrollspy':           'vendor/materialize/scrollspy',
    'materialize.form':                'vendor/materialize/form',
    'materialize.slider':              'vendor/materialize/slider',
    'materialize.cards':               'vendor/materialize/cards',
    'materialize.pushpin':             'vendor/materialize/pushpin',
    'materialize.buttons':             'vendor/materialize/buttons',
    'materialize.transitions':         'vendor/materialize/transitions',
    'materialize.scrollFire':          'vendor/materialize/scrollFire',
    'materialize.date_picker':         'vendor/materialize/date_picker/picker.date',
    'materialize.date_picker.picker':  'vendor/materialize/date_picker/picker',
    'materialize.character_count':     'vendor/materialize/character_count',
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

    // Materialize
    'materialize.tooltip': {
      deps: ['jquery', 'velocity', 'materialize.global'],
      exports: '$.tooltip',
    },
  },

  // For easier development, disable brower caching
  // Of course, this should be removed in production environment
  urlArgs: 'ver=' + (new Date()).getTime()

};
