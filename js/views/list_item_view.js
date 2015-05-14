define([
  'views/base/view',
], function(View) {
  "use strict";

  var ListItemView = View.extend({

    selected: false,
    optionNames: View.prototype.optionNames.concat(['parent']),

    initialize: function() {
      ListItemView.__super__.initialize.apply(this, arguments);
      /* delegate some events */
    },

    select: function() {
      this.parent.unselectAll();
      this.toggleSelect(true);
    },

    onCheckboxClick: function(evt) {
      evt.preventDefault();
      this.toggleSelect();
      return false;
    },

    toggleSelect: function(opt, trigger) {
      opt = (opt !== undefined) ? Boolean(opt) : !this.selected;
      trigger = (trigger !== undefined) ? Boolean(trigger) : true;
      if (opt !== this.selected) {
      }
    },

  });

  return ListItemView;
});
