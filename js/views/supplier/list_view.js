define([
  'views/base/list/view',
  'views/base/list/selection_context_view',
  'views/supplier/item_view',
], function(ListView, ListSelectionContextView, SupplierItemView) {
  "use strict";

  var SupplierSelectionContext = ListSelectionContextView.extend({
    /* TODO: define actions */
  });

  var SupplierListView = ListView.extend({
    template: 'supplier/list.html',
    noWrap: true,
    itemView: SupplierItemView,
    selectionContextView: SupplierSelectionContext,
  });

  return SupplierListView;
});
