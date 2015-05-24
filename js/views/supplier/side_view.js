define([
  'views/base/sidebar_view',
], function(SidebarView) {
  "use strict";

  var SupplierSideView = SidebarView.extend({

    menuItems: [
      {
        name: 'dashboard',
        title: 'Ver Todos',
        url: 'dashboard',
      },
    ],

  });

  return SupplierSideView;
});
