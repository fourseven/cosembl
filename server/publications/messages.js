Meteor.publishComposite("conversationMessages", function(conversationId, limit) {
  return {
    find: function() {
      // check(conversationId, String);
      // check(limit, Number);
      return Messages.find({conversationId: conversationId}, {limit: limit, sort: {createdAt: -1}});
    }
    ,
    children: [
      {
        find: function(item) {
          return Meteor.users.find(
            { _id: item.userId },
            { fields: { profile: 1 }
          });
        }
      }
    ]
  }
});

// Meteor.publish("conversationMessages", function(conversationId, limit) {
//   //       // check(conversationId, String);
// //       // check(limit, Number);
//   return Messages.find({conversationId: conversationId}, {limit: limit, sort: {createdAt: -1}});
// });
