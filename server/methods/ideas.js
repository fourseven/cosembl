Meteor.methods({
  'Ideas.insert': function (params) {
    check(this.userId, String);
    check(params, {
      title: String
    });

    var user = Meteor.user();

    var errors = validateIdea(params);
    if (errors.title) throw new Meteor.Error('invalid-idea', "You must set a title for your idea");

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
  }
});
