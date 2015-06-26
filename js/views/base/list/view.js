define([
  'underscore',
  'views/base/collection_view',
  'views/base/list/selection_context_view'
], function(_, CollectionView, ListSelectionContextView) {
  "use strict";

  var ListView = CollectionView.extend({
    animationDuration: 0,
    selectionContextView: ListSelectionContextView,

    initialize: function() {
      ListView.__super__.initialize.apply(this, arguments);
      if (this.selectionContextView) {
        var context = new this.selectionContextView({parent: this});
        this.subview('selection_context', context);
      }
    },

    render: function() {
      ListView.__super__.render.apply(this, arguments);
      if (!this.$el.hasClass('selectable')) {
        this.$el.addClass('selectable');
      }
    },

    initItemView: function(model) {
      if (this.itemView) {
        var view = new this.itemView({
          autoRender: true,
          model: model,
          parent: this,
        });
        this.listenTo(view, 'selected:change', this.onItemSelectedChange);
        return view;
      } else {
        throw new Error("The ListView#itemView property must be defined.");
      }
    },

    onItemSelectedChange: function(item, opt) {
      if (this.getSelected().length > 0) {
        /* has selection */
        this.$el.addClass('selection');
        if (_.keys(this.getItemViews()).length > this.getSelected().lenght) {
          /* partial selection */
        } else {
          /* full selection */
        }
      } else {
        /* all unselected */
        this.$el.removeClass('selection');
      }
      var context = this.subview('selection_context');
      if (context) context.update();
    },

    selectAll: function() {
      _.invoke(_.values(this.getItemViews()), 'toggleSelect', true);
    },

    unselectAll: function() {
      _.invoke(_.values(this.getItemViews()), 'toggleSelect', false);
    },

    getSelected: function() {
      return _.filter(_.values(this.getItemViews()), 'selected');
    },
  });

  return ListView;
});
