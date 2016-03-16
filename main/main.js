Bids = new Mongo.Collection('bids');

if (Meteor.isServer) {
	Meteor.startup(function() {
		Meteor.methods({
			'clearAll': function () {
				var globalObject=Meteor.isClient?window:global;
				for(var property in globalObject){
					var object=globalObject[property];
					if(object instanceof Meteor.Collection){
						object.remove({});
					}
				}
			},
			'clear': function (collection) {
				collection.remove({});
			}
		})
	});
}

//meteor shell;
// Meteor.call('clearAll');
// Meteor.call('clear', Meteor.users);
// Meteor.users.find().fetch();
