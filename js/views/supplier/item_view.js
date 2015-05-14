define([
  'views/list_item_view',
], function(ListItemView) {
  "use strict";

  var SupplierItemView = ListItemView.extend({
    template: 'supplier/item_row.html',
  });

  return SupplierItemView;
});
