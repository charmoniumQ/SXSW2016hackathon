if (Meteor.isClient) {
  // This code only runs on the client


  Accounts.ui.config({
    passwordSignupFields: "EMAIL_ONLY"
  });
}

const USER_TYPES = {
	NOT_LOGGED_IN: 0,
	VENUE: 1,
	PERFORMER: 2
};

function userType() {
	if (!Meteor.userId()) {
		return USER_TYPES.NOT_LOGGED_IN;
	} else {
		return USER_TYPES.VENUE; // TODO: differentiate between venues and artists
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
			this.render('/'); // don't do the next thing
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
