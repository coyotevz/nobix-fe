define([
  'views/base/sidebar_view',
], function(SidebarView) {
  "use strict";

  var EmployeeSideView = SidebarView.extend({

    menuItems: [
      {
        name: 'showall',
        label: 'Todos',
        action: 'showAll',
      },
    ],

    showAll: function() {
      console.log('show all!');
    },

  });

  return EmployeeSideView;
});
