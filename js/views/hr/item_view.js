define([
  'views/base/list/item_view',
], function(ListItemView) {
  "use strict";

  var EmployeeItemView = ListItemView.extend({
    template: 'hr/item_row.html',
  });

  return EmployeeItemView;
});
