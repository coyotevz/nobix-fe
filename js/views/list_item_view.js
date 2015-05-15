define([
  'views/base/view',
], function(View) {
  "use strict";

  var ListItemView = View.extend({

    selected: false,
    optionNames: View.prototype.optionNames.concat(['parent']),

    render: function() {
      ListItemView.__super__.render.apply(this, arguments);
      this.delegate('change', ':checkbox', this.updateState);
      this.checkbox = this.$(':checkbox')[0];
    },

    updateState: function(trigger) {
      var opt = this.checkbox.checked;
      trigger = (trigger !== undefined) ? Boolean(trigger): true;
      if (opt !== this.selected) {
        this.selected = opt;
        if (trigger) {
          this.trigger({true: 'selected', false: 'unselected'}[opt], this);
        }
      }
    },

    setActive: function() {
      /* desactivate any previous activated item */
      _.invoke(_.values(this.parent.getItemViews()), 'setInactive');
      this.$el.addClass('active');
    },

    setInactive: function() {
      this.$el.removeClass('active');
    },
  });

  return ListItemView;
});
