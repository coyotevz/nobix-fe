define([
  'underscore',
  'views/base/collection_view',
], function(_, CollectionView) {
  "use strict";

  var ListView = CollectionView.extend({

    noWrap: true,
    animationDuration: 0,

    initItemView: function(model) {
      if (this.itemView) {
        var view = new this.itemView({
          autoRender: true,
          model: model,
          parent: this,
        });
        this.listenTo(view, 'selected', this.onItemSelected);
        this.listenTo(view, 'unselected', this.onItemUnselected);
        return view;
      } else {
        throw new Error("The ListView#itemView property must be defined.");
      }
    },

    onItemSelected: function(item) {
      if (_.keys(this.getItemViews()).length > this.getSelected().length) {
        /* partial selection */
      } else {
        /* full selection */
      }
      if (item) this.setActive(item);
    },

    onItemUnselected: function(item) {
      if (this.getSelected().length > 0) {
        /* partial selection */
      } else {
        /* all unselected */
      }
      if (item) this.setActive(item);
    },

    selectAll: function() {
      _.invoke(_.values(this.getItemViews()), 'toggleSelect', true, false);
      this.onItemSelected();
    },

    unselectAll: function() {
      _.invoke(_.values(this.getItemViews()), 'toggleSelect', false, false);
      this.onItemUnselected();
    },

    getSelected: function() {
      return _.filter(_.values(this.getItemViews()), 'selected');
    },

    setActive: function(item) {
      /* Remove selected class over all list */
      if (item) {
        item.$el.addClass('selected');
      }
    }
  });

  return ListView;
});
