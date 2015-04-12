Meteor.methods({
  'Ideas.insert': function (params) {
    check(this.userId, String);
    check(params, {
      title: String
    });

    var user = Meteor.user();

    var errors = validateIdea(params);
    if (errors.title) throw new Meteor.Error('invalid-idea', "You must set a title for your idea");

    var ideaAlready = Ideas.findOne({title: params.title, userId: this.userId});
    if (ideaAlready) {
      return {
        ideaExists: true,
        _id: ideaAlready._id
      }
    }

    var idea = _.extend(params, {
      userId: user._id,
      author: user.profile.name,
      submitted: new Date(),
      upvoters: [],
      votes: 0
    });

    var ideaId = Ideas.insert(idea);

    return {
      _id: ideaId
    };
  },
  'Ideas.upvote': function(ideaId) {
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
});
