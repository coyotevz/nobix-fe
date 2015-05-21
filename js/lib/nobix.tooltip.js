/* Nobix Tooltip:
 * Based on http://getbootstrap.com/javascript/#tooltip
 *   and on http://materializecss.com/dialogs.html#tooltip
 */


(function($) {
  "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function(element, options) {
    this.type       = null;
    this.options    = null;
    this.enabled    = null;
    this.timeout    = null;
    this.hoverState = null;
    this.$element   = null;
    this.inState    = null;

    this.init(element, options);
  };

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
  };

  $.extend(Tooltip.prototype, {
    init: function(element, options) {
    },

    getOptions: function() {
    },

    enter: function(obj) {
    },

    leave: function(obj) {
    },

    show: function() {
    },

    hide: function(cb) {
    },

    tip: function() {
    },

    setContent: function() {
    },

    destroy: function() {
    }
  });

  Tooltip.prototype.init = function(type, element, options) {
    this.enabled   = true;
    this.type      = type;
    this.$element  = $(element);
    this.options   = this.getOptions(options);
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport));
    this.inState   = { click: false, hover: false, focus: false};

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!');
    }

    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];
      if (trigger == 'click') {
        this.$elemnt.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.poxy(this.leave, this));
      }
    }

    if (this.options.selector)
      this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' });

    this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function() {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function(options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.enter = function(obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('nobix.' + this.type);
    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('nobix.' + this.type, self);
    }

    if (obj instanceof $.Event)
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true;

    if (elf.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in';
      return;
    }

    clearTimeout(self.timeout);

    self.hoverState = 'in';
    if (!self.options.delay || !self.options.delay.show) return self.show();

    self.timeout = setTimeout(function() {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.leave = function(obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data.('nobix.' + this.type, self);
    }
  };

  Tooltip.prototype.show = function() {
    var e = $.Event('show.nobix.' + this.type);

    if (!this.hasContent() || !this.enabled) return;

    this.$element.trigger(e);
    var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
    if (e.isDefaultPrevented() || !inDom) return;

    var that = this;
    var $tip = this.tip();
    this.setContent();

    if (this.options.animation) $tip.addClass('fade');

    var placement = typeof this.options.placement == 'function' ?
      this.options.placement.call(this, $tip[0], this.$element[0]) :
      this.options.placement;

    $tip
      .detach()
      .css({ top: 0, left: 0, display: 'block'})
      .addClass(placement);
      .data('nobix.' + this.type, this);

    this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
    this.applyPlacement(placement);

    /* TODO: Start transition to show tooltip */
  };

  Tooltip.prototype.hide = function(callback) {
    var that = this;
    var $tip = $(this.$tip);
    var e    = $.Event('hide.nobix.' + this.type);

    function complete() {
      callback && callback();
    }

    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;

    $tip.removeClass('in');

    /* TODO: Start transition to hide tooltip */

    return this;
  };

  Tooltip.prototype.tip = function() {
    if (!this.$tip) {
      this.$tip = $(this.options.template);
      if (this.$tip.length != 1) {
        throw new Error(this.type + '`template` option must consists of exactly 1 top-level element!');
      }
    }
    return this.$tip;
  };

  Tooltip.prototype.enable = function() {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function() {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function() {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.fixTitle = function() {
    var $e = this.$element;
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.getTitle = function() {
    var title;
    var $e = this.$element;
    var o = this.options;

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]): o.title);

    return title;
  };

  Tooltip.prototype.hasContent = function() {
    return this.getTitle();
  };

  Tooltip.prototype.setContent = function() {
    var $tip  = this.tip();
    var title = this.getTitle();

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.destroy = function() {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function() {
      that.$element.off('.' + that.type).removeData('nobix.' + that.type);
      if (that.$tip) {
        that.$tip.detach();
      }
      that.$tip = null;
      that.$viewport = null;
    });
  };


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
