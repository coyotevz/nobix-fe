define([
  'jquery',
  'underscore',
], function($, _) {
  "use strict";

  return {
    'map': function(objs, attribute) {
      return _.pluck(objs, attribute);
    },

    'attr': function(obj, attr) {
      return obj[attr];
    },

  };
});
