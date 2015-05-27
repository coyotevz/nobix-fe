define([
  'views/base/list/view',
  'views/base/list/selection_context_view',
  'views/supplier/item_view',
], function(ListView, ListSelectionContextView, SupplierItemView) {
  "use strict";

  var SupplierSelectionContext = ListSelectionContextView.extend({
    container: '.module-header-container',
    template: 'common/selection_context.html',

    /* TODO: define actions */
  });

  var SupplierListView = ListView.extend({
    template: 'supplier/list.html',
    noWrap: true,
    itemView: SupplierItemView,
    selectionContextView: SupplierSelectionContext,

    initialize: function(params) {
      SupplierListView.__super__.initialize.apply(this, arguments);
      console.log('SupplierListView %s', JSON.stringify(params));
    },
  });

  return SupplierListView;
});
