define([
  'views/base/collection_view',
  'views/supplier/item_view',
], function(CollectionView, SupplierItemView) {
  "use strict";

  var SupplierListView = CollectionView.extend({
    template: 'supplier/list.html',
    noWrap: true,
    itemView: SupplierItemView,

    initialize: function(params) {
      SupplierListView.__super__.initialize.apply(this, arguments);
      console.log('SupplierListView %s', JSON.stringify(params));
    },

    getTemplateData: function() {
      return _.extend(
        SupplierListView.__super__.getTemplateData.apply(this, arguments),
        {cid: this.cid}
      );
    },
  });

  return SupplierListView;
});
