Meteor.methods({
  'Messages.insert': function(params) {
    check(this.userId, String);
    check(params, {
      body: String,
      conversationId: String
    });

    var conversation = Ideas.findOne({_id: params.conversationId, participants: this.userId});
    if (!conversation) {
      if (errors.title) throw new Meteor.Error('invalid-conversation', "We can't find a conversation");
    }
    var user = Meteor.user();

    var message =  _.extend(params, {
      userId: user._id,
      author: user.profile.name,
      conversationId: conversationId,
      body: body
    });

    var messageId = Message.insert(message);

    return {
      _id: messageId
    }
  }
});
