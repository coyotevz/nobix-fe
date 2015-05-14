define([
  'controllers/base/controller',
  'models/supplier',
  'models/supplier_collection',
  'views/base_view',
  'views/module_header_view',
  'views/supplier/list_view',
], function(Controller,
            Supplier,
            SupplierCollection,
            BaseView,
            ModuleHeaderView,
            SupplierListView) {
  "use strict";

  var SupplierController = Controller.extend({
    title: 'Suppliers',

    beforeAction: function() {
      SupplierController.__super__.beforeAction.apply(this, arguments);
      this.reuse('root', BaseView, {region: 'root'});
      this.reuse('module_header', ModuleHeaderView,
                 { container: 'main .container', containerMethod: 'prepend' });
      this.publishEvent('module:setCurrent', 'supplier');
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
