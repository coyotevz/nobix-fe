define([
  'jquery',
  'underscore',
  'chaplin',
  'templates/env',
], function($, _, Chaplin, env) {
  "use strict";

  var View = Chaplin.View.extend({
    noWrap: true,
    autoRender: true,
    getTemplateFunction: function(tmpl_attr) {
      /* Template compilation
       * ~~~~~~~~~~~~~~~~~~~~
       *
       * We use nunjucks template to render views.
       * The templates is loaded with nunjucks.WebLoader. On rendering, it is
       * compiled on the client-side.
       * The compiled template function replaced the string on view prototype.
       *
       * In the end we want to precompile the templates to JavaScript functions
       * on the server-side and just load the JavaScript code.
       */
      tmpl_attr = tmpl_attr || 'template';
      var template = this[tmpl_attr],
          templateFunc = null;

      if (typeof template === 'string') {
        var tmpl = env.getTemplate(template);
        templateFunc = function(ctx) {
          return _.trim(tmpl.render(ctx));
        };
        this.constructor.prototype[tmpl_attr] = templateFunc;
      } else {
        templateFunc = template;
      }

      return templateFunc;
    },

    /* method borrowed from controller, this lets reuse views from views */
    reuse: function(name) {
      var method = arguments.length === 1 ? 'retrieve' : 'compose';
      return Chaplin.mediator.execute.apply(Chaplin.mediator, ['composer:' + method].concat([].slice.call(arguments)));
    },

  });

  return View;
});
