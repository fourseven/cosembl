var accountsTemplate = 'marketingLayout';
var afterSignInPath = '/ideas/best';

AccountsTemplates.configureRoute('signIn', {
  layoutTemplate: accountsTemplate,
  redirect: function() {
    var user = Meteor.user();

    if (user) Router.go(afterSignInPath);
  }
});
AccountsTemplates.configureRoute('signUp', {
  layoutTemplate: accountsTemplate,
  redirect: function() {
    var user = Meteor.user();
    var idea = user.profile.idea;
    delete user.profile.idea;
    if (idea) {
      Meteor.call('Ideas.insert', {title: idea});
    }

    if (user) Router.go(afterSignInPath);
  }
});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: accountsTemplate});

AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');

AccountsTemplates.configure({
  defaultLayout: accountsTemplate,
  confirmPassword: false,
  onLogoutHook: function() {
    Router.go('/');
  }
});

AccountsTemplates.addFields([
  {
      _id: "name",
      type: "text",
      displayName: "Full name",
      placeholder: "First name + last name",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "Email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  }
]);

AccountsTemplates.addField({
    _id: 'password',
    type: 'password',
    required: true,
    minLength: 6,
    errStr: 'At least 6 characters or more'
});

AccountsTemplates.addField({
  _id: 'userType',
  type: 'select',
  displayName: "I am:",
  select: [
      {
      text: "Non-technical",
      value: "nonTech",
    }, {
      text: "A Designer",
      value: "designer",
    }, {
      text: "A Developer",
      value: "developer",
    }, {
      text: "A Mentor",
      value: "mentor",
    }
  ]
});

AccountsTemplates.addField({
    _id: 'idea',
    type: 'text',
    displayName: "What's your business idea?",
    placeholder: "E.g. I want a tinder for local pets"
});

