define([
  'controllers/base/controller',
  'models/supplier',
  'models/supplier_collection',
  'views/standard_view',
  'views/body_view',
  'views/supplier/list_view',
], function(Controller,
            Supplier,
            SupplierCollection,
            StandardView,
            BodyView,
            SupplierListView) {
  "use strict";

  var SupplierController = Controller.extend({
    title: 'Suppliers',

    beforeAction: function() {
      SupplierController.__super__.beforeAction.apply(this, arguments);
      this.reuse('main', StandardView, {region: 'main'});
      this.reuse('body', BodyView, {region: 'body'});
      this.publishEvent('menu:setCurrent', 'supplier');
    },

    list: function(params) {
      console.log('Supplier#list(%s)', JSON.stringify(params));
      this.supplierList = new SupplierCollection();
      this.view = new SupplierListView({
        collection: this.supplierList,
        region: 'content',
      });
    },
  });

  return SupplierController;
});
