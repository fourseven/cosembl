// IdeasListController = AppController.extend({
//   waitOn: function() {
//     return Meteor.subscribe('ideas');
//   },
//   data: {
//     ideas: Ideas.find({})
//   },
//   onAfterAction: function () {
//     Meta.setTitle('Ideas');
//   },
//   fastRender: true
// });

// IdeasListController.events({
//   'click [data-action=doSomething]': function (event, template) {
//     event.preventDefault();
//   }
// });


IdeasListController = AppController.extend({
  template: 'ideasList',
  increment: 5,
  ideasLimit: function() {
    return parseInt(this.params.ideasLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.ideasLimit()};
  },
  subscriptions: function() {
    this.ideasSub = Meteor.subscribe('ideas', this.findOptions());
  },
  ideas: function() {
    return Ideas.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.ideas().count() === this.ideasLimit();
    return {
      ideas: this.ideas(),
      ready: this.ideasSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    }
  },
  onAfterAction: function () {
    Meta.setTitle('Ideas');
  },
  fastRender: true
});

NewIdeasController = IdeasListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newIdeas.path({ideasLimit: this.ideasLimit() + this.increment});
  }
})

BestIdeasController = IdeasListController.extend({
  sort: {votes: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.bestIdeas.path({ideasLimit: this.ideasLimit() + this.increment});
  }
})

Router.route('/new/:ideasLimit?', {name: 'newIdeas'});

Router.route('/best/:ideasLimit?', {name: 'bestIdeas'});
