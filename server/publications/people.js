Meteor.publish('people', function () {
  return People.find({}, {fields: {profile: 1}});
})
