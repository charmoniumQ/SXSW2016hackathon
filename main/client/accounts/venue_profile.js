if (Meteor.isClient) {
	Template.VenueProfile.helpers({
		venue: Meteor.user.profile
	});

	Template.PerformerProfile.helpers({
		performer: Meteor.user.profile
	});
}
