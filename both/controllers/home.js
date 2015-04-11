HomeController = AppController.extend({
  layoutTemplate: 'marketingLayout',
  waitOn: function() {
    return Meteor.subscribe('userIdeas');
  }
});
