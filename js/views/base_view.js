define([
  'views/base/view',
], function(View) {
  "use strict";

  var BaseView = View.extend({
    className: 'wrapper',
    template: 'base.html',
    regions: {
      'header': 'header',
      'main': 'main',
      'footer': 'footer',
    },

    initialize: function() {
      BaseView.__super__.initialize.apply(this, arguments);
      console.log('BaseView#initialize(%s)', this.cid);
    },
  });

  return BaseView;
});
