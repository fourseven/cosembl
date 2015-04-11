PeopleListController = AppController.extend({
  increment: 5,
  peopleLimit: function() {
    return parseInt(this.params.peopleLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.peopleLimit()};
  },
  subscriptions: function() {
    this.peopleSub = Meteor.subscribe('people', this.findOptions());
  },
  people: function() {
    return People.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.people().count() === this.peopleLimit();
    return {
      people: this.people(),
      ready: this.peopleSub.ready,
      nextPath: hasMore ? this.nextPath() : null
    }
  },
  onAfterAction: function () {
    Meta.setTitle('People');
  },
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.peopleList.path({peopleLimit: this.peopleLimit() + this.increment});
  }
});

Router.route('/people/:peopleLimit?', {
  name: 'peopleList'
});
