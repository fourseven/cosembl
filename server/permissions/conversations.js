Conversations.allow({
  'remove': function(userId, doc) {
    return _.some(doc.participants, function(itemId) {
      return itemId === userId
    });
  }
});
