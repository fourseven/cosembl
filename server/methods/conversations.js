Meteor.methods({
  'Conversations.start': function(userId) {
    check(this.userId, String);
    check(userId, String);


  }
});
