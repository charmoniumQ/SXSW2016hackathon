if(Meteor.is_server) {
	Meter.users.allow({
    'insert': function (userIdSource, userDest) {
		return userIdSource == UserDest._id
    }
  });
}

if (Meteor.isClient) {
	var profile = Meteor.user().profile;
	profile.genres = profile.genres.join(', ');
	Template.EditPerformerProfile.helpers({
		performer: profile
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
