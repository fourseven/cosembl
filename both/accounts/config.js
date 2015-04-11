AccountsTemplates.configureRoute('signIn', {
  layoutTemplate: 'appLayout',
  redirect: function() {
    var user = Meteor.user();
    if (user)
      Router.go('/dashboard');
  }
});
AccountsTemplates.configureRoute('signUp', {layoutTemplate: 'appLayout'});
AccountsTemplates.configureRoute('ensureSignedIn', {layoutTemplate: 'appLayout'});

AccountsTemplates.removeField('email');
AccountsTemplates.removeField('password');

AccountsTemplates.configure({
  confirmPassword: false,
  onLogoutHook: function() {
    Router.go('/');
  }
});

AccountsTemplates.addFields([
  {
      _id: "name",
      type: "text",
      displayName: "Name",
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
    errStr: 'At least 6 characters or more',
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
    },
  ],
});
