Template.ideaItem.helpers({
  ownIdea: function() {
    return this.userId === Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'upvotable';
    } else {
      return 'disabled';
    }
  },
  conversationStarted: function() {
    // We use this helper inside the {{#each posts}} loop, so the context
    // will be a post object. Thus, we can use this.authorId.
    return Conversations.findOne({ideaId: this._id, participants: Meteor.userId()});
  }
});

Template.ideaItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('Ideas.upvote', this._id);
  },
  'click [data-action="start-conversation"]': function (e) {
    e.preventDefault();
    Meteor.call('Conversations.start', this._id, function (error, result) {
      Session.set('activeConversation', result._id);
    });
  }
});
