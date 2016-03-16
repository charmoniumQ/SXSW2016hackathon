Bids = new Mongo.Collection('bids');

const USER_TYPES = {
	NOT_LOGGED_IN: 0,
	VENUE: 1,
	PERFORMER: 2
};

function userType() {
	if (!Meteor.userId()) {
		return USER_TYPES.NOT_LOGGED_IN;
	} else {
		if (Meteor.user().profile.typeOfUser == 'Venue') {
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

Router.route('venue_profile');

Router.route('edit_venue_profile');

Router.route('performer_home');

Router.route('performer_profile/:_given_id', function () {
	var profile = Meteor.users.findOne({_id: this.params._given_id}).profile
	profile.genres = profile.genres.join(', ');
	this.render('PerformerProfile', {
		data: {
			performer: 
		}
	});
});

Router.route('edit_performer_profile');

Router.route('addbid');

function ensure_user(allowed_user_type) {
	return function () {
		if (userType() !== allowed_user_type) {
			this.redirect('/'); // don't do the next thing
		} else {
			this.next(); // do the next thing
		}
	}
}

// TODO: security and permissions

Router.onBeforeAction(ensure_user(USER_TYPES.PERFORMER), {
	only: ['performer_home']
});

Router.onBeforeAction(ensure_user(USER_TYPES.VENUE), {
  only: ['venue_home']
});
