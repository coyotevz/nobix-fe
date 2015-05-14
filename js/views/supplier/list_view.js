define([
  'views/list_view',
  'views/supplier/item_view',
], function(ListView, SupplierItemView) {
  "use strict";

  var SupplierListView = ListView.extend({
    template: 'supplier/list.html',
    noWrap: true,
    itemView: SupplierItemView,

    initialize: function(params) {
      SupplierListView.__super__.initialize.apply(this, arguments);
      console.log('SupplierListView %s', JSON.stringify(params));
    },
  });

  return SupplierListView;
});
