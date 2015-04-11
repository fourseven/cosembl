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

Meteor.methods({
  upvote: function(ideaId) {
    check(this.userId, String);
    check(ideaId, String);

    var affected = Ideas.update({
      _id: ideaId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (!affected) throw new Meteor.Error('invalid', "You weren't able to update that idea");
  }
})
