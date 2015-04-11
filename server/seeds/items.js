Meteor.startup(function() {

  var getProfile = function() {
    var array = Meteor.users.find().fetch();
    var randomIndex = Math.floor( Math.random() * array.length );
    return array[randomIndex];
  }

  var password = "testing1";
  Factory.define('profiles', Meteor.users, {
    profile: function() {
      return { name: Fake.user({fields: ['fullname']}).fullname }
    },
    email: function() {
      return Fake.user({fields: ['email']}).email
    },
    password: password
  });

  if (Meteor.users.find({}).count() === 0) {

    _(10).times(function(n) {
      Factory.create('profiles');
    });
  }

  Factory.define('ideas', Ideas, {
    title: function() { return Fake.sentence(); },
    votes: function() { return 1; },
    userId: function() {
      return Factory.get('profiles');
    },
    upvoters: function() {
      return [getProfile()._id];
    }
  }).after(function(doc) {
    var user = Meteor.users.findOne({_id: doc.userId});
    var name = user.profile.name;
    Ideas.update({_id: doc._id}, {$set: {author: name}});
  });

  if (Ideas.find({}).count() === 0) {

    _(10).times(function(n) {
      Factory.create('ideas');
    });

  }

});
