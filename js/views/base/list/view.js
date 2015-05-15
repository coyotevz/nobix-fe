define([
  'underscore',
  'views/base/collection_view',
  'views/base/list/selection_context_view'
], function(_, CollectionView, ListSelectionContextView) {
  "use strict";

  var ListView = CollectionView.extend({
    animationDuration: 0,
    selectionContext: null,
    selectionContextView: ListSelectionContextView,

    initialize: function() {
      ListView.__super__.initialize.apply(this, arguments);
      if (this.selectionContextView) {
        this.selectionContext = this.reuse('selection_context',
                                           this.selectionContextView,
                                           {parent: this});
      }
    },

    render: function() {
      ListView.__super__.render.apply(this, arguments);
      console.log('ListView#render');
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
      if (item) item.setActive();
      if (this.selectionContext) this.selectionContext.update();
    },

    selectAll: function() {
      _.invoke(_.values(this.getItemViews()), 'toggleSelect', true, false);
      this.onItemSelectedChange();
    },

    unselectAll: function() {
      _.invoke(_.values(this.getItemViews()), 'toggleSelect', false, false);
      this.onItemSelectedChange();
    },

    getSelected: function() {
      return _.filter(_.values(this.getItemViews()), 'selected');
    },
  });

  return ListView;
});
