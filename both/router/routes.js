Router.route('/', {
  name: 'home'
});

Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword']
});
