/* Nobix Tooltip:
 * Based on http://getbootstrap.com/javascript/#tooltip
 *   and on http://materializecss.com/dialogs.html#tooltip
 */


(function($) {
  "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function(element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null;

    this.init('tooltip', element, options);
  };

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
  };

  Tooltip.prototype.init = function(type, element, options) {
    this.enabled  = true;
    this.type     = type;
    this.$element = $(element);
    this.options  = this.getOptions(options);

    var triggers = this.options.trigger.split(' ');

  };

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  $.fn.tooltip = function(option) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('nobix.tooltip');
      var options = typeof option == 'object' && option;

      if (!data && option == 'destroy') return;
      if (!data) $this.data('nobix.tooltip', (data = new Tooltip(this, options)));
      if (typeof option == 'string') data[option]();
      
    });
  };

}(jQuery));
