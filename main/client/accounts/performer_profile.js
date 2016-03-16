if(Meteor.is_server) {
	Meter.users.allow({
    'insert': function (userIdSource, userDest) {
		return userIdSource == UserDest._id
    }
  });
}

if (Meteor.isClient) {
	Template.EditPerformerProfile.helpers({
		performer: function () {
			var user = Meteor.user();
			if (user) {
				var profile = user.profile;
				profile.genres = profile.genres.join(', ');
				profile.link = '/performer_profile/' + user._id;
				return profile;
			} else {
				return undefined;
			}
		},
		bids: function () {

		}
	});
	
	Template.EditPerformerProfile.events({
		'submit form': function (event) {
			event.preventDefault();
			var nameVar = event.target.name.value;
			var locationVar = event.target.location.value;
			var genresVar = event.target.genres.value;
			var genresList = genresVar.split(',').map(function (e) {
				return e.trim();
			});

			Meteor.users.update(
				{'_id': Meteor.userId()},
				{'$set': {'profile.name': nameVar, 'profile.location': locationVar, 'profile.genres': genresList}}
			);
		}
	});
}
