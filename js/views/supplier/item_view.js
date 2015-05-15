define([
  'views/base/list/item_view',
], function(ListItemView) {
  "use strict";

  var SupplierItemView = ListItemView.extend({
    template: 'supplier/item_row.html',
  });

  return SupplierItemView;
});
