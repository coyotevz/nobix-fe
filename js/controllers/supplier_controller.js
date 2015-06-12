define([
  'controllers/base/controller',
  'models/supplier',
  'models/supplier_collection',
  'views/supplier/side_view',
  'views/supplier/list_view',
  'views/supplier/detail_view',
], function(Controller,
            Supplier,
            SupplierCollection,
            SupplierSideView,
            SupplierListView,
            SupplierDetailView) {
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

    show: function(params) {
      var model = new Supplier({id: params.id});
      model.fetch();
      this.view = new SupplierDetailView({
        region: 'main_content',
        model: model,
      });
      window.view = this.view;
    },
  });

  return SupplierController;
});
