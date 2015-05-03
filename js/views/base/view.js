define([
  'jquery',
  'underscore',
  'chaplin',
  'templates/env',
], function($, _, Chaplin, env) {
  "use strict";

  var View = Chaplin.View.extend({
    autoRender: true,
    getTemplateFunction: function() {
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
      var template = this.template,
          templateFunc = null;

      if (typeof template === 'string') {
        var tmpl = env.getTemplate(template);
        templateFunc = function(ctx) {
          return tmpl.render(ctx);
        };
        this.constructor.prototype.template = templateFunc;
      } else {
        templateFunc = template;
      }

      return templateFunc;
    },
  });

  return View;
});
