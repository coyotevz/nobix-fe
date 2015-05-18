define([
  'views/base/view',
  'materialize.dropdown',
], function(View) {
  "use strict";

  var ListSelectionContextView = View.extend({
    optionNames: View.prototype.optionNames.concat(['parent']),

    listen: {
      'pace:hide mediator': 'activateDropdown',
    },

    render: function() {
      ListSelectionContextView.__super__.render.apply(this, arguments);
      this.delegate('click', '.action-back', this.unselectAll);
      this.delegate('click', '#select-all', this.selectAll);
      this.delegate('click', '#unselect-all', this.unselectAll);
      this.$countData = this.$('.selected-count-data');
    },

    update: function() {
      var selected = this.parent.getSelected();
      if (selected.length > 0) {
        this.show();
      } else {
        this.hide();
      }
      this.$countData.text(selected.length);
    },

    getSelected: function() {
      return this.parent.getSelected();
    },

    selectAll: function() {
      this.parent.selectAll();
    },

    unselectAll: function() {
      this.parent.unselectAll();
    },

    show: function() {
      this.$el.addClass('active-context');
    },

    hide: function() {
      this.$el.removeClass('active-context');
    },

    activateDropdown: function() {
      this.$('.change-selection').dropdown({
        constrain_width: false,
        belowOrigin: true,
      });
    },

  });

  return ListSelectionContextView;
});
