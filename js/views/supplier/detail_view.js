define([
  'views/base/view',
], function(View) {
  "use strict";

  var SupplierDetailView = View.extend({
    template: 'supplier/detail.html',
  });

  return SupplierDetailView;
});
