define([
  'controllers/base/controller',
  'models/supplier',
  'models/supplier_collection',
  'views/supplier/side_view',
  'views/supplier/list_view',
], function(Controller,
            Supplier,
            SupplierCollection,
            SupplierSideView,
            SupplierListView) {
  "use strict";

  var SupplierController = Controller.extend({
    title: 'Suppliers',

    beforeAction: function() {
      SupplierController.__super__.beforeAction.apply(this, arguments);
      this.reuse('sidebar', SupplierSideView);
      this.publishEvent('module:setCurrent', 'suppliers');
    },

    list: function(params) {
      console.log('Supplier#list(%s)', JSON.stringify(params));
      this.supplierList = new SupplierCollection();
      this.view = new SupplierListView({
        collection: this.supplierList,
        region: 'main_content',
      });
      this.reuse('sidebar').setView(this.view);
    },
  });

  return SupplierController;
});
