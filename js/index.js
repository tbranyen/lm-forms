var User = Backbone.Model.extend({
  schema: {
    title: { type: "Select", options: ["", "Mr", "Mrs", "Ms"] },
    name: "Text",
    email: { validators: ["required", "email"] },
    birthday: "Date",
    password: "Password",
    notes: { type: "List", listType: "Text" }
  }
});

var user = new User({
  title: "Mr",
  name: "Sterling Archer",
  email: "sterling@isis.com",
  birthday: new Date(1978, 6, 12),
  password: "dangerzone",
  notes: [
    "Buy new turtleneck",
    "Call Woodhouse",
    "Buy booze"
  ]
});

// Patch the Backbone.Form plugin to use the LayoutManager render function.
Backbone.Form.prototype.render = function(manage) {
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
};

// Create a new Form.
var TestForm = Backbone.Form.extend({
  initialize: function() {
    // Whenever the name is changed, update the form.
    this.model.on("change:name", function(model, name) {
      this.setValue({ name: name });
    }, this);

    // Ensure the Backbone.Form initialize is called, not sure why they aren't
    // dealing with this override use-case already...
    return Backbone.Form.prototype.initialize.apply(this, arguments);
  }
});

// Set up the layout to use the new form.
var layout = new Backbone.Layout({
  template: "#main",

  views: {
    div: new TestForm({
      model: user
    })
  }
});

// Stick in the dingus dom
$("div").html(layout.el);

// Render the layout
layout.render();
