define([
  'jquery',
  'views/base/view',
  'velocity',
], function($, View) {
  "use strict";

  var ProgressView = View.extend({
    progressTemplate: 'progress.html',
    autoRender: false,

    listen: {
      'sync model': 'render',
    },

    initialize: function() {
      var _this, render;

      _this = this;
      render = this.render;
      this.render = function() {
        render.apply(_this, arguments);
        console.log('_this.$p', _this.$p);
        if (_this.$p !== null)
          _this.$p.velocity({
            opacity: "hide",
          }, function() {
            $(this).css({ display: 'none' });
          });
      };

      ProgressView.__super__.initialize.apply(this, arguments);
      this.renderProgress();
    },

    renderProgress: function() {
      var templateFunc = this.getTemplateFunction('progressTemplate');
      if (typeof templateFunc === 'function') {
        this.$p = $(templateFunc());
        this.$el.html(this.$p);
        console.log('this.$p', this.$p);
      }
      return this;
    },
  });

  var SupplierDetailView = ProgressView.extend({
    template: 'supplier/detail.html',
  });

  return SupplierDetailView;
});
