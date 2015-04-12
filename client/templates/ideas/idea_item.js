Template.ideaItem.helpers({
  ownIdea: function() {
    return this.userId === Meteor.userId();
  },
  upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled';
    }
  }
});

Template.ideaItem.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('Ideas.upvote', this._id);
  },
  'click [data-action="start-conversation"]': function (e) {
    e.preventDefault();
    Meteor.call('Conversations.start', this._id);
  }
});
