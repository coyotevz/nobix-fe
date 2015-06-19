define([
  'controllers/base/controller',
  'models/employee',
  'models/employee_collection',
  'views/hr/side_view',
  'views/hr/list_view',
  'views/hr/detail_view',
], function(Controller,
            Employee,
            EmployeeCollection,
            HRSideView,
            EmployeeListView,
            EmployeeDetailView) {
  "use strict";

  var HumanResourcesController = Controller.extend({
    title: 'Human Resources',

    beforeAction: function() {
      HumanResourcesController.__super__.beforeAction.apply(this, arguments);
      this.reuse('sidebar', HRSideView);
      this.publishEvent('module:setCurrent', 'hr');
    },

    list: function(params) {
      console.log('HumanResources#list(%s)', JSON.stringify(params));
      this.employeeList = new EmployeeCollection();
      this.view = new EmployeeListView({
        collection: this.employeeList,
        region: 'main_content',
      });
    },

    show: function(params) {
      var model = new Employee({id: params.id});
      model.fetch();
      this.view = new EmployeeDetailView({
        region: 'main_content',
        model: model,
      });
    },
  });

  return HumanResourcesController;
});
