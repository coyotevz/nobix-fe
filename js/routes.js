define(function() {
  "use strict";

  // The routes for the application. This module returns a function.
  // 'match' is a match method of the Router
  var routes = function(match) {

    match('', 'supplier#list', {name: 'supplier_list'});
    match('suppliers', 'supplier#list', {name: 'supplier_list'});
    match('hr', 'hr#list', {name: 'hr_list'});

  };

  return routes;
});
