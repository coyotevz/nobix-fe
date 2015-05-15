define([
  'views/base/view',
], function(View) {
  "use strict";

  var ListSelectionContextView = View.extend({
    optionNames: View.prototype.optionNames.concat(['parent']),

    update: function() {
      var selected = this.parent.getSelected();
    },

    show: function() {
    },

    hide: function() {
    },

  });

  return ListSelectionContextView;
});
