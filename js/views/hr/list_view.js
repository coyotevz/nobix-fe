define([
  'views/base/list/view',
  'views/base/list/selection_context_view',
  'views/hr/item_view',
], function(ListView, ListSelectionContextView, EmployeeItemView) {
  "use strict";

  var EmployeeSelectionContext = ListSelectionContextView.extend({
    /* TODO: define actions */
  });

  var EmployeeListView = ListView.extend({
    template: 'hr/list.html',
    noWrap: 'true',
    itemView: EmployeeItemView,
    selectionContextView: EmployeeSelectionContext,

    initialize: function(params) {
      EmployeeListView.__super__.initialize.apply(this, arguments);
      console.log('EmployeeListView %s', JSON.stringify(params));
    },
  });

  return EmployeeListView;
});
