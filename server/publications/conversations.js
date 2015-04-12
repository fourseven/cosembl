Meteor.publishComposite("myConversations", function() {
  return {
    find: function() {
      return Conversations.find({participants: this.userId});
    }
    ,
    children: [
      {
        find: function(item) {
          return Meteor.users.find(
            { _id: item.participants },
            { fields: { profile: 1 }
          });
        }
      },
      {
        find: function(item) {
          return Ideas.find(
            { _id: item.ideaId },
            { limit: 1, fields: { title: 1 }
          });
        }
      }
    ]
  }
});
