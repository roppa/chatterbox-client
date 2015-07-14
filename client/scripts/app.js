
//templates
var chatTemplate = '<div class="message"><p><%= username %></p><span><%= text %></span></p></div>';

//backbone
var app = {
  settings : {
    url: 'https://api.parse.com/1/classes/chatterbox'
  },
  Views: {},
  Models : {},
  Collections : {}
};

app.Views.MessageView = Backbone.View.extend({
  initialize : function () {
    this.model.on("change", function() {
      this.render();
    }, this);
  },
  render: function () {
    
  }
});

app.Models.Message = Backbone.Model.extend({
  el: ".chat",
  defaults: {
    username: "",
    room: ""
  }
});

app.Collections.Messages = Backbone.Collection.extend({
  model: app.Models.Message,
  url: app.settings.url,
  initialize: function () {
    this.fetch();
  },
  parse: function (data) {
    return data.results;
  }
});

app.Views.ChatView = Backbone.View.extend({
  el: ".chat",
  template: _.template(chatTemplate),
  collection: new app.Collections.Messages(),
  initialize : function () {
    this.collection.on("update change", function() {
      this.render();
    }, this);
    this.render();
  },
  render: function () {
    var self = this;
    _.each(this.collection.models, function (message) {
      //console.log(message);
      if (message.get("text") && message.get("username")) {
        $(self.el).append(self.template({ text : message.get("text"), username: message.get("username") }));
      }
    })
  }
});
  
// var settings = {
//   url: 'https://api.parse.com/1/classes/chatterbox'
// }

// var user = window.location.search.split("=");
// user = user[user.length - 1];

// var app = {
//   url: settings.url,
//   init: function () {

//   },
//   send: function (message) {
//     var msg;
//     if (typeof message === "string") {
//       msg = {
//         username: user,
//         text: message,
//         roomname: ''
//       };
//     } else {
//       msg = message;
//     }
//     $.ajax({
//       url: this.url,
//       type: 'POST',
//       data: JSON.stringify(msg),
//       contentType: 'application/json',
//       success: function (data) {
//         console.log('chatterbox: Message sent');
//       },
//       error: function (data) {
//         // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//         console.error('chatterbox: Failed to send message');
//       }
//     });

//   },
//   fetch: function () {
//     $.ajax({
//       url: settings.url,
//       success: function (result) {
//         $(".chat").html(app.format(result.results));
//       },
//       error: function (data) {
//         // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//         $(".error").html('chatterbox: Failed to send message: ');
//       }
//     });
//   },
//   format: function (messages) {
//     var formattedResult = "";
//     _.each(messages, function (msg) {
//       formattedResult += '<div class="message">';
//       formattedResult += '<span class="username">';
//       formattedResult += msg.username;
//       formattedResult += ':</span>';
//       formattedResult += '<p>';
//       formattedResult += msg.text;
//       formattedResult += '</p>';
//       formattedResult += '</div>';
//     });
//     return formattedResult;
//   }
// };
