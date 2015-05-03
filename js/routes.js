define(function() {
  "use strict";

  // The routes for the application. This module returns a function.
  // 'match' is a match method of the Router
  var routes = function(match) {

    match('', 'hello#index', {name: 'hello'});
    match('suppliers', 'supplier#list', {name: 'supplier_list'});

  };

  return routes;
});
