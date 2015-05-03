define([
  'views/base/view',
], function(View) {
  "use strict";

  var SupplierItemView = View.extend({
    template: 'supplier/item_row.html',
  });

  return SupplierItemView;
});
