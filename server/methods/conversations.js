Meteor.methods({
  'Conversations.start': function(ideaId) {
    check(this.userId, String);
    check(ideaId, String);

    var idea = Ideas.findOne({_id: ideaId});

    var conversationInProgressForIdea = Conversations.findOne({ideaId: ideaId, participants: {$all: [this.userId, idea.userId]}});

    if (conversationInProgressForIdea) {
      return {
        conversationExists: true,
        _id: conversationInProgressForIdea._id
      }
    }
    var user = Meteor.user();

    var conversation = {
      userId: user._id,
      author: user.profile.name,
      ideaId: ideaId,
      created: new Date(),
      participants: [idea.userId, user._id]
    };

    var conversationId = Conversations.insert(conversation);

    return {
      _id: conversationId
    }
  }
});
