Template.conversationItem.events = {
  'click .conversation': function (e, template) {
    template.ready.set(false);
    Session.set('activeConversation', this._id);
  }
}

Template.conversationItem.helpers({
  conversationIdea: function() {
    // We use this helper inside the {{#each posts}} loop, so the context
    // will be a post object. Thus, we can use this.authorId.
    return Ideas.findOne(this.ideaId);
  },
  selectedClass: function() {
    return Session.get('activeConversation') === this._id ? "selected" : "";
  },
  activeConversation: function() {
    return Session.equals('activeConversation', this._id);
  },
  // the messages cursor
  messages: function () {
    return Template.instance().messages();
  },
  // the subscription handle
  isReady: function () {
    return Template.instance().ready.get();
  },
  // are there more conversations to show?
  hasMoreMessages: function () {
    return Template.instance().messages().count() >= Template.instance().limit.get();
  }
});

Template.conversationItem.created = function () {

  // 1. Initialization

  var instance = this;

  // initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(5);
  instance.ready = new ReactiveVar(false);

  // 2. Autorun

  // will re-run when the "limit" reactive variables changes
  instance.autorun(function () {
    var conversationId = Session.get('activeConversation');
      // get the limit
    var limit = instance.limit.get();

    // subscribe to the posts publication
    var subscription = Meteor.subscribe('conversationMessages', conversationId, limit);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      instance.loaded.set(limit);
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
    }

  });

  // 3. Cursor
  instance.messages = function() {
    var conversationId = Session.get('activeConversation');
    var limit = instance.limit.get();
    if (conversationId) {
      return Messages.find({conversationId: conversationId}, {limit: limit});
    }
  }
}
