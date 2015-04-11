Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.plugin('ensureSignedIn', {
    except: ['home', 'atSignIn', 'atSignUp', 'atForgotPassword']
});
