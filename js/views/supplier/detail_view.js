define([
  'views/base/view',
], function(View) {
  "use strict";

  var SupplierDetailView = View.extend({
    template: 'supplier/detail.html',
    autoRender: false,

    listen: {
      'sync model': 'render',
    },

  });

  return SupplierDetailView;
});
