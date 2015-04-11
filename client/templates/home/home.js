Template.home.helpers({
  myIdeas: function() {
    return Ideas.find({userId: Meteor.userId()});
  }
})
