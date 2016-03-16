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

const USER_TYPES = {
	NOT_LOGGED_IN: 0,
	LOGGED_IN: 1
};

function userType() {
	if (!Meteor.userId()) {
		return USER_TYPES.NOT_LOGGED_IN;
	} else {
		return USER_TYPES.LOGGED_IN; // TODO: differentiate between venues and artists
	}
}

Router.map(function () {

	this.route('Login', {
		'path': '/'
	});

	this.route('VenueHome', {
		'path': 'venue_home',
		onBeforeAction: function () {
			if (userType() !== USER_TYPES.LOGGED_IN) {
				this.redirect('/');
			}
		}
	});

	this.route('PerformerHome', {
		'path': 'performer_home',
		onBeforeAction: function () {
			if (userType() !== USER_TYPES.LOGGED_IN) {
				this.redirect('/');
			}
		}
	});
});
