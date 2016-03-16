const USER_TYPES = {
	NOT_LOGGED_IN: 0,
	VENUE: 1,
	PERFORMER: 2,
	AUDIPHILE: 3
};

function userType() {
	if (!Meteor.user()) {
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

Router.route('venue_profile/:_given_id', function () {
  var profile = Meteor.users.findOne({_id: this.params._given_id}).profile
  profile.genres = profile.genres.join(', ');
  this.render('VenueProfile', {
    data: {
      venue: profile
    }
  });
});

Router.route('edit_venue_profile');

Router.route('performer_home');

Router.route('performer_profile/:_given_id', function () {
	var profile = Meteor.users.findOne({_id: this.params._given_id}).profile
	profile.artist_id = this.params._given_id;
	profile.genres = profile.genres.join(', ');
	this.render('PerformerProfile', {
		data: {
			performer: profile
		}
	});
});

Router.route('edit_performer_profile');

Router.route('addbid');

Router.route('search');

function ensure_user(allowed_user_type) {
	return function () {
		if (userType() !== allowed_user_type) {
			this.redirect('/'); // don't do the next thing
		} else {
			this.next(); // do the next thing
		}
	}
}

<<<<<<< HEAD
// function redirectLogin(){
// 	  if (!Meteor.userId()) {
//     // if the user is not logged in, render the Login template
//     this.redirect('/');
//   } elif {
//     // otherwise don't hold up the rest of hooks or our route/action function
//     // from running
//     this.redirect('');

//   } else {

//   }
// });
// }


// var mustBeSignedIn = function(pause) {
//   if (!(Meteor.user() || Meteor.loggingIn())) {
//     Router.go('login');
//   } else {
//     this.next();
//   }
// };

// var goToDashboard = function() {
//   if (Meteor.user()) {
//     if(Meteor.user().profile.typeOfUser === 'Venue') {
//     	Router.go('venue_home');
//     } else {
//     	Router.go('performer_home');
//     }
//   } else {
//     this.next();
//   }
// };

// Router.onBeforeAction(mustBeSignedIn, {except: ['venue_home','performer_home']});
// Router.onBeforeAction(goToDashboard, {only: ['login']});


// Router.onBeforeAction(function () {
//   // all properties available in the route function
//   // are also available here such as this.params

//   if (!Meteor.userId()) {
//     // if the user is not logged in, render the Login template
//     this.render('login');
//   } else {
//     // otherwise don't hold up the rest of hooks or our route/action function
//     // from running
//     this.next();
//   }
// });



// // TODO: security and permissions


Router.onBeforeAction(ensure_user(USER_TYPES.PERFORMER), {
	only: ['performer_home']
});

Router.onBeforeAction(ensure_user(USER_TYPES.VENUE), {
  only: ['venue_home']
});
