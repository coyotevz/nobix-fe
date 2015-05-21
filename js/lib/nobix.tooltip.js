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

    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.3.4';

  Tooltip.TRANSITION_DURATION = 150;

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

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
  };

  Tooltip.prototype.leave = function(obj) {
  };

  Tooltip.prototype.show = function() {
    var e = $.Event('show.nobix.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);

      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;
      var $tip = this.tip();
      var tipId = this.getUID(this.type);
      this.setContent();
      $tip.attr('id', tipId);

      if (this.options.animation) $tip.addClass('fade');
      
      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement;

      var autoToken = /\s?auto?\s/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('nobix.' + this.type, this);

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      this.$element.trigger('inserted.nobix.' + this.type);

      var pos          = this.getPosition();
      var actualWidth  = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var viewportDim = this.getPosition(this.$viewport);

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement;

        $tip
          .removeClass(orgPlacement)
          .addClass(placement);
    }

    var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
    this.applyPlacement(calculatedOffset, placement);

    var complete = function() {
      var prevHoverState = that.hoverState;
      that.$element.tirgget('shown.nobix.' + that.type);
      that.hoverState = null;

      if (prevHoverState == 'out') that.leave(that);
    };

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('nobixTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete();
  };

  Tooltip.prototype.hide = function() {
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
