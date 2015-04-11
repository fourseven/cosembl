Meteor.startup(function() {

  Meteor.Mailgun.config({
    username: 'postmaster@www.cosembl.co',
    password: 'fcfc5dad267abe9110ecf3097a5cdc37'
  });

  // Meteor.methods({
  //   'sendContactEmail': function(name, email, message) {
  //     this.unblock();

  //     Meteor.Mailgun.send({
  //       to: 'recipient@example.com',
  //       from: name + ' <' + email + '>',
  //       subject: 'New Contact Form Message',
  //       text: message,
  //       html: Handlebars.templates['contactEmail']({siteURL: Meteor.absoluteUrl(), fromName: name, fromEmail: email, message: message})
  //     });
  //   }
  // });
});
