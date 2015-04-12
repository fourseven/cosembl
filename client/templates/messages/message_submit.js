Template.messageSubmit.events({
  'submit form': function(e) {
    debugger

    e.preventDefault();
    var message = {
      body: $(e.target).find('[name=body]').val()
    };

    var errors = validateMessage(message);
    if (errors.body) return Session.set('messageSubmitErrors', errors);

    Meteor.call('Messages.insert', message, function(error, result) {
      // display the error to the user and abort
      if (error) Errors.throw(error.reason);
    });
  }
});

Template.messageSubmit.created = function() {
  Session.set('messageSubmitErrors', {});
}

Template.messageSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('messageSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('messageSubmitErrors')[field] ? 'has-error' : '';
  }
});
