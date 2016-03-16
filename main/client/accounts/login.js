_ = lodash;
const default_performer_profile = {
	'name': '',
	'location': '',
	'genres': [''],
	'rating': 2.5,
	'typeOfUser': 'Performer'
};

const default_venue_profile = {
	'name': '',
	'location': '',
	'genres': [''],
	'rating': 2.5,
	'typeOfUser': 'Venue'
}

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

		var default_profile = (typeVar == 'Venue' ? default_venue_profile : default_performer_profile);
		Accounts.createUser({
			email: emailVar,
			password: passwordVar,
			profile: default_profile
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
