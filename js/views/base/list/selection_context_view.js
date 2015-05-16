define([
  'views/base/view',
], function(View) {
  "use strict";

  var ListSelectionContextView = View.extend({
    optionNames: View.prototype.optionNames.concat(['parent']),

    update: function() {
      var selected = this.parent.getSelected();
      if (selected.length > 0) {
        this.show();
      } else {
        this.hide();
      }
      this.setSelectedQty(selected.length);
    },

    setSelectedQty: function(qty) {
      console.log('selected:', qty);
    },

    show: function() {
      this.$el.addClass('active-context');
    },

    hide: function() {
      this.$el.removeClass('active-context');
    },

  });

  return ListSelectionContextView;
});
