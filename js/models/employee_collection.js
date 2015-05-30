define([
  'models/base/paginated_collection',
  'models/employee',
], function(PaginatedCollection, Employee) {
  "use strict";

  var EmployeeCollection = PaginatedCollection.extend({
    model: Employee,
    urlRoot: '/employees',

    initialize: function() {
      EmployeeCollection.__super__.initialize.apply(this, arguments);
      this.fetch();
    },
  });

  return EmployeeCollection;
});
