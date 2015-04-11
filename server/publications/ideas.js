Meteor.publishComposite("ideas", function() {
  return {
    find: function() {
      return Ideas.find({});
    }
    // ,
    // children: [
    //   {
    //     find: function(item) {
    //       return [];
    //     }
    //   }
    // ]
  }
});

Meteor.publish('userIdeas', function() {
  return Ideas.find({userId: this.userId});
})
