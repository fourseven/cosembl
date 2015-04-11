Ideas = new Mongo.Collection('ideas');

Ideas.helpers({

});

Ideas.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

validateIdea = function (idea) {
  var errors = {};
  if (!idea.title) errors.title = "Please fill in a title";
  return errors;
}
