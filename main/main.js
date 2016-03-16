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
