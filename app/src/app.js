// wait for dom to load then run our app.
$(App.init)

//==============================================================================
// App Namespace
//==============================================================================

var App = {
  init: function() {
    var chatHistory = new App.MessageHistory();
    var chatSubmit = new App.SubmitView();
    var roomView = new App.RoomView({collection: chatHistory});

    firebase.database().ref('/messages').on('child_added', function(child) {
      var msg = child.val();
      chatHistory.add(msg);
    });
  }
};

//==============================================================================
// Views
//==============================================================================

App.SubmitView = Backbone.View.extend({

  el: '#new-message',

  events: {
    "click .button.submit":  "submit",
  },

  initialize: function() {
    this.$message = this.$('.message');
  },

  submit: function() {
    var msg = new App.Message({
      message: this.$message.val(),
    });

    if(msg.isValid()) {
      msg.save();
    } else {
      console.warn(msg.validationError);
    }

    // clear the input
    this.$message.val('')
  }
});

App.RoomView = Backbone.View.extend({

  // the element to bind the view to, this uses css selector syntax
  el: '#room-view',

  initialize: function() {

    // cache the message template for rendering later
    var messagesTemplate = $('#message-tpl').html();
    this.messageTpl = Handlebars.compile(messagesTemplate);

    // listen for collection changes
    this.listenTo(this.collection, 'update', this.render);
  },

  render: function() {
    var view = this;
    view.$el.empty();
    this.collection.forEach(function(msg) {

      // extend the msg model with a formatted time object. This lets us
      // override the fields that are already on our model
      var msgViewModel = _.extend(msg.attributes, {
        time: moment(msg.attributes.time, 'x').format('l H:mm:ss')
      });

      var html = view.messageTpl(msgViewModel)
      view.$el.append(html);
    });

    // force showing of the last message
    view.$el.scrollTop(view.$el.prop("scrollHeight") + 120);
  }
});

//==============================================================================
// Models & Collections
//==============================================================================

App.Message = Backbone.Model.extend({
  save: function() {
    this.attributes.time = Date.now();
    firebase.database().ref('/messages').push(this.attributes);
  },

  validate: function(attrs, options) {
    if(!attrs.message) { return 'must provide a message'; }
  }
});

App.MessageHistory = Backbone.Collection.extend({
  model: App.Message
});
