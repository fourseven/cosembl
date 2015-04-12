Template.conversationsList.helpers({
  // the conversations cursor
  conversations: function () {
    return Template.instance().conversations();
  },
  // the subscription handle
  isReady: function () {
    return Template.instance().ready.get();
  },
  // are there more conversations to show?
  hasMoreConversations: function () {
    return Template.instance().conversations().count() >= Template.instance().limit.get();
  }
});

Template.conversationsList.created = function () {

  // 1. Initialization

  var instance = this;

  // initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(5);
  instance.ready = new ReactiveVar(false);

  // 2. Autorun

  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {

    // get the limit
    var limit = instance.limit.get();

    console.log("Asking for "+limit+" conversations…")

    // subscribe to the posts publication
    var subscription = Meteor.subscribe('myConversations', limit);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      console.log("> Received "+limit+" conversations. \n\n")
      instance.loaded.set(limit);
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
      console.log("> Subscription is not ready yet. \n\n");
    }
  });

  // 3. Cursor

  instance.conversations = function() {
    return Conversations.find({participants: Meteor.userId()}, {limit: instance.loaded.get()});
  }

}