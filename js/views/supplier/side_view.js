define([
  'views/base/sidebar_view',
], function(SidebarView) {
  "use strict";

  var SupplierSideView = SidebarView.extend({

    menuItems: [
      {
        name: 'showall',
        label: 'Ver Todos',
        action: 'showAll',
      },
    ],

    showAll: function() {
      console.log('show all!');
    },

  });

  return SupplierSideView;
});
