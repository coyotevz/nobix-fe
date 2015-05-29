/* Nobix Tooltip:
 * Based on http://getbootstrap.com/javascript/#tooltip
 *   and on http://materializecss.com/dialogs.html#tooltip
 */


(function($) {
  "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function(element, options) {
    this.options    = null;
    this.timeout    = null;
    this.$element   = null;

    this.init(element, options);
  };

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    container: 'body',
    selector: '[role="tooltip"]',
  };

  $.extend(Tooltip.prototype, {
    init: function(element, options) {
      this.enabled = true;
      this.$element = $(element);
      this.options = this.getOptions(options);

      var triggers = this.options.trigger.split(' ');

      for (var i = triggers.length; i--;) {
        var trigger = triggers[i];
        var eventIn = trigger == 'hover' ? 'mouseenter': 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave': 'focusout';

        this.$element.on(eventIn + '.tooltip', $.proxy(this.enter, this));
        this.$element.on(eventOut + '.tooltip', $.proxy(this.leave, this));
      }

      this._fixTitle();
    },

    getOptions: function(options) {
      options = $.extend({}, Tooltip.DEFAULTS, this.$element.data(), options);

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay,
          hide: options.delay
        };
      }

      return options;
    },

    enter: function(obj) {
      var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget).data('nobix.tooltip');

      if (!self) {
        self = new this.constructor(obj.currentTarget, this.options);
        $(obj.currentTarget).data('nobix.tooltip', self);
      }

      clearTimeout(self.timeout);

      if (!self.options.delay || !self.options.delay.show) return self.show();

      self.timeout = setTimeout(function() {
        self.show();
      }, self.options.delay.show);
    },

    leave: function(obj) {
      var self = obj instanceof this.constructor ?
        obj : $(obj.currentTarget).data('nobix.tooltip');

      if (!self) {
        self = new this.constructor(obj.currentTarget, this.options);
        $(obj.currentTarget).data('nobix.tooltip', self);
      }

      clearTimeout(self.timeout);

      if (!self.options.delay || !self.options.delay.hide) return self.hide();

      self.timeout = setTimeout(function() {
        self.hide();
      }, self.options.delay.hide);

    },

    show: function() {
      var e = $.Event('show.nobix.tooltip');
      if (this.getTitle()) {
        this.$element.trigger(e);

        var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
        if (e.isDefaultPrevented() || !inDom) return;
        var that = this;
        var $tip = this.tip();
        var $container = $(this.options.container || 'body');

        this.setContent();
        if (this.options.animation) $tip.addClass('fade');
        var placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement;

        $tip
          .detach()
          .css({top: 0, left: 0, display: 'block'})
          .addClass(placement)
          .data('nobix.tooltip', this);

        inDom = $.contains($container[0], $tip[0]);
        if (!inDom) $tip.appendTo($container);

        this.$element.trigger('inserted.nobix.tooltip');
        this.applyPlacement(placement);
        this.$element.trigger('shown.nobix.tooltip');
      }
    },

    hide: function(cb) {
      var $tip = $(this.$tip);
      var e = $.Event('hide.nobix.tooltip');

      this.$element.trigger(e);
      if (e.isDefaultPrevented()) return;

      $tip.removeClass('in');
      this.$element.trigger('hidden.nobix.tooltip');
      if (cb) cb();

      return this;
    },

    tip: function() {
      if (!this.$tip) {
        var sel = this.options.selector || '[rel="tooltip"]';
        this.$tip = $(sel).length ? $(sel) : $(this.options.template);
        if (this.$tip.length != 1) {
          throw new Error('tooltip `template` option must consists of exactly 1 top-level element!');
        }
      }
      return this.$tip;
    },

    applyPlacement: function(placement) {
      var $tip = this.tip();
      var width = $tip[0].offsetWidth;
      var height = $tip[0].offsetHeight;

      var pos = $.extend({},
        this.$element[0].getBoundingClientRect(),
        { scroll: this.$element.scrollTop() },
        this.$element.offset()
      );

      var offset = placement == 'bottom' ? { top: pos.top + pos.height, left: pos.left + pos.width / 2 - width / 2  } :
                   placement == 'top'    ? { top: pos.top - height,     left: pos.left + pos.width / 2 - width / 2  } :
                   placement == 'left'   ? { top: pos.top + pos.height / 2 - height / 2, left: pos.left - width     } :
                /* placement == 'right' */ { top: pos.top + pos.height / 2 - height / 2, left: pos.left + pos.width };

      // manually read margins becaouse getBoundingClientRect includes difference
      var marginTop = parseInt($tip.css('margin-top'), 10);
      var marginLeft = parseInt($tip.css('margin-left'), 10);

      // we must check for NaN for ie 8/9
      if (isNaN(marginTop)) marginTop = 0;
      if (isNaN(marginLeft)) marginLeft = 0;

      offset.top += marginTop;
      offset.left += marginLeft;

      // $.fn.offset doesn't round pixel values
      // so we use setOffset directly with our own function B-0
      $.offset.setOffset($tip[0], $.extend({
        using: function(props) {
          $tip.css({
            top: Math.round(props.top),
            left: Math.round(props.left)
          });
        }
      }, offset), 0);

      var actualHeight = $tip[0].offsetHeight;
      var actualWidth = $tip[0].offsetWidth;
      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight;
      }
      
      $tip
        .offset(offset)
        .addClass('in');
    },

    setContent: function() {
      var title = this.getTitle();

      this.tip()
        .removeClass('fade in top bottom left right')
        .find('.tooltip-inner').text(title);
    },

    destroy: function() {
      var that = this;
      clearTimeout(this.timeout);
      this.hide(function() {
        that.$element.off('.tooltip').removeData('nobix.tooltip');
        if (that.$tip) {
          that.$tip.detach();
        }
        that.$tip = null;
      });
    },

    getTitle: function() {
      var title;
      var $e = this.$element;
      var o = this.options;

      title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);

      return title;
    },

    _fixTitle: function() {
      var $e = this.$element;
      if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
      }
    },
  });

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function() {
      var $this   = $(this);
      var data    = $this.data('nobix.tooltip');
      var options = typeof option == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('nobix.tooltip', (data = new Tooltip(this, options)));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;

  $.fn.tooltip             = Plugin;
  $.fn.tooltip.Constructor = Tooltip;


  // TOOLTIP NO CONFLICT
  // ==================
  $.fn.tooltip.noConflict = function() {
    $.fn.tooltip = old;
    return this;
  };

}(jQuery));
