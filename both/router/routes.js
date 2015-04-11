Router.route('/', {
  name: 'home'
});

Router.route('/ideas', {
  name: 'ideasList'
});

Router.plugin('ensureSignedIn', {
  except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword']
});
