define([
  'views/base/view',
], function(View) {
  "use strict";

  var BaseView = View.extend({
    className: 'wrapper',
    noWrap: false,
    template: 'base.html',
    regions: {
      'header': 'header',
      'main': 'main',
      'footer': 'footer',
      'content': '#content',
      'module_nav': '.module-nav-container',
      'module_selector': '.module-selector-container',
    },

    initialize: function() {
      BaseView.__super__.initialize.apply(this, arguments);
      console.log('BaseView#initialize(%s)', this.cid);
    },
  });

  return BaseView;
});
