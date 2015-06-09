define([
  'views/base/view',
], function(View) {
  "use strict";

  var SidebarView = View.extend({
    optionNames: View.prototype.optionNames.concat(['view']),
    region: 'module_nav',
    template: 'common/sidebar.html',
    noWrap: true,
    menuItems: null,
    _current: null,

    getTemplateData: function() {
      return {items: this.menuItems};
    },

    render: function() {
      SidebarView.__super__.render.apply(this, arguments);
      this.delegate('click', 'li.nav-item a', this.onClick);
      // Set first as current
      this.setCurrentMenu(this.$('li.nav-item').first());
    },

    setView: function(view) {
      this.view = view;
    },

    onClick: function(evt) {
      var $item = $(evt.target).parents('.nav-item');
      evt.preventDefault();
      this.setCurrentMenu($item);
    },

    setCurrentMenu: function($item) {
      if ($item !== null) {
        this.$('li.nav-item.active-item').removeClass('active-item');
        $item.addClass('active-item');
      }
    },

  });

  return SidebarView;
});
