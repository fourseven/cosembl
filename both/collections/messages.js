Messages = new Mongo.Collection('messages');

Messages.helpers({

});

Messages.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});


validateMessage = function (message) {
  var errors = {};
  if (!message.body) errors.body = "Please fill in a body";
  return errors;
}
