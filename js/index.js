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

_.extend(Backbone.Form.prototype, {
  render: function(manage) {
    // Have LayoutManager normalize the options.
    var options = this._options();

    // Iterate and render each fieldset.
    _.each(options.fieldsets, function(fieldset) {
      this.$el.append(this.renderFieldset(fieldset));
    }, this);

    // Return the LayoutManager deferred.
    return manage(this).render();
  }
});

var layout = new Backbone.Layout({
  template: "#main",

  views: {
    div: new Backbone.Form({
      model: user
    })
  }
});

// Stick in the dingus dom
$("div").html(layout.el);

// Render the layout
layout.render();
