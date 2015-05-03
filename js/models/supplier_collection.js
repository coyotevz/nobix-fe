define([
  'models/base/paginated_collection',
  'models/supplier',
], function(PaginatedCollection, Supplier) {
  "use strict";

  var SupplierCollection = PaginatedCollection.extend({
    model: Supplier,
    urlRoot: '/suppliers',

    initialize: function() {
      SupplierCollection.__super__.initialize.apply(this, arguments);
      this.fetch();
    },
  });

  return SupplierCollection;

});
