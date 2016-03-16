/*
if (Meteor.isClient) {
  // This code only runs on the client


    Template.dashboard.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
    }
});

  Template.register.events({
    'submit form': function(event){
        event.preventDefault();
        var emailVar = event.target.registerEmail.value;
        var passwordVar = event.target.registerPassword.value;
        var typeVar = event.target.registerType.value;

        Accounts.createUser({
          email: emailVar,
          password: passwordVar,
          type: typeVar
    });

        console.log("Form submitted.");
    }
});



  Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var emailVar = event.target.loginEmail.value;
        var passwordVar = event.target.loginPassword.value;
        Meteor.loginWithPassword(emailVar, passwordVar);
        console.log("Form submitted.");
    }
});




  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}
*/

const USER_TYPES = {
	NOT_LOGGED_IN: 0,
	VENUE: 1,
	PERFORMER: 2
};

function userType() {
	if (!Meteor.userId()) {
		return USER_TYPES.NOT_LOGGED_IN;
	} else {
    if (Meteor.user().typeOfUser == 'Venue') {
      return USER_TYPES.VENUE;
    } else {
      return USER_TYPES.PERFORMER;
    }
	}
}

Router.configure({
  layoutTemplate: 'main_layout'
});



Router.route('/', function () {
  this.render('login');
});

Router.route('venue_home');

Router.route('performer_home');

function ensure_user(allowed_user_type) {
	return function () {
		if (userType() !== allowed_user_type) {
			this.redirect('/'); // don't do the next thing
		} else {
			this.next(); // do the next thing
		}
	}
}

Router.onBeforeAction(ensure_user(USER_TYPES.PERFORMER), {
	only: ['performer_home']
});

Router.onBeforeAction(ensure_user(USER_TYPES.VENUE), {
  only: ['venue_home']
});
