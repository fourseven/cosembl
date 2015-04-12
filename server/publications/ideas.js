Meteor.publishComposite("ideas", function() {
  return {
    find: function() {
      return Ideas.find({});
    },
    children: [
      {
        find: function(item) {
          return Conversations.find({itemId: item._id, participants: this.userId}, {limit: 1});
        }
      }
    ]
  }
});

Meteor.publish('userIdeas', function() {
  return Ideas.find({userId: this.userId});
})
