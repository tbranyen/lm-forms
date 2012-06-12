/*!
 * backbone.forms-lm.patch.js v0.0.1
 * Copyright 2012, Tim Branyen (@tbranyen)
 * backbone.forms-lm.patch.js may be freely distributed under the MIT license.
 */
(function(window) {

"use strict";

// Alias the libraries from the global object.
var Backbone = window.Backbone;
var _ = window._;
var $ = window.$;

// Keep an original copy of the initialize function.
var initialize = Backbone.Form.prototype.initialize;

// Patch the Backbone.Form plugin to use the LayoutManager render function.
_.extend(Backbone.Form.prototype, {
  render: function(manage) {
    // Have LayoutManager normalize the options.
    var options = this._options();

    // Remove all the existing stuff from this View.
    this.$el.empty();

    // Iterate and render each fieldset.
    _.each(options.fieldsets, function(fieldset) {
      this.$el.append(this.renderFieldset(fieldset));
    }, this);

    // Return the LayoutManager deferred.
    return manage(this).render();
  },

  // Patch the initialize function to override the fetch function to not
  // attempt to use LayoutManager's fetch functionality.
  initialize: function() {
    // NOP the fetch method.
    this.options.fetch = $.noop;

    // Ensure to always call back up the chain, being a good samaritan.
    return initialize.apply(this, arguments);
  }
});

})(this);
