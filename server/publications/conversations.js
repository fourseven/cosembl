Meteor.publishComposite("myConversations", function() {
  return {
    find: function() {
      return Conversations.find({participants: this.userId});
    }
    ,
    children: [
      {
        find: function(conversation) {
          return Meteor.users.find(
            { _id: conversation.participants },
            { fields: { profile: 1 }
          });
        }
      },
      {
        find: function(conversation) {
          return Ideas.find(
            { _id: conversation.ideaId },
            { limit: 1, fields: { title: 1 }
          });
        },
        children: [
          {
            find: function(conversation, idea) {
              return Meteor.users.find(
                { _id: idea.userId },
                { limit: 1, fields: { profile: 1 }
              });
            }
          }
        ]
      }
    ]
  }
});
