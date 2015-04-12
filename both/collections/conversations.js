Conversations = new Mongo.Collection('conversations');

Conversations.helpers({

});

Conversations.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

