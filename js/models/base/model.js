define([
  'chaplin',
], function(Chaplin) {
  "use strict";
  var config = window.config || {};

  var Model = Chaplin.Model.extend({

    url: function() {
      var base;

      if (this.collection) {
        base = _.result(this.collection, 'url');
      } else if (this.urlRoot) {
        base = (config.urlRoot || '') + this.urlRoot;
      } else {
        throw new Error ('A "urlRoot" property must be specified');
      }
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

  }).extend(Chaplin.EventBroker);

  return Model;
});
