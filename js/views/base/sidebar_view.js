define([
  'views/base/view',
  'jquery.pin',
], function(View) {
  "use strict";

  var SidebarView = View.extend({
    container: '.module-nav-container',
    template: 'common/sidebar.html',
    noWrap: true,

    listen: {
      'pace:hide mediator': 'pin',
    },

    pin: function() {
      this.$el.pin({
        padding: { top: $('.module-header-wrapper').height() },
        containerSelector: '.module-content',
      });
    },

  });

  return SidebarView;
});
