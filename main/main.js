Bids = new Mongo.Collection('bids');

if (Meteor.isServer) {
	Meteor.startup(function() {
		//Meteor.users.remove({});
	});
}
