Template.home.helpers({
  myIdeas: function() {
    return Ideas.findOne({userId: Meteor.userId()});
  },
  myIdeasReady: function() {
    return !Meteor.loggingIn();
  }
})
