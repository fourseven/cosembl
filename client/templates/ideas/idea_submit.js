Template.ideaSubmit.events({
  'submit form': function(e) {
    e.preventDefault();
    var idea = {
      title: $(e.target).find('[name=title]').val()
    };


    var errors = validateIdea(idea);
    if (errors.title) return Session.set('ideaSubmitErrors', errors);

    Meteor.call('Ideas.insert', idea, function(error, result) {
      // display the error to the user and abort
      if (error) Errors.throw(error.reason);
    });
  }
});

Template.ideaSubmit.created = function() {
  Session.set('ideaSubmitErrors', {});
}
Template.ideaSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('ideaSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('ideaSubmitErrors')[field] ? 'has-error' : '';
  }
});
