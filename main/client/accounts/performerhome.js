if (Meteor.isClient) {
  // This code only runs on the client

  Template.PerformerHome.helpers({
  	venueName: function() {
  		return Meteor.user().emails[0].address;
  	},
  	gigsA: function(){
    	return Bids.find({accepted: true}, {sort: {price: -1}});
    },
    gigsB: function(){
    	return Bids.find({accepted: false}, {sort: {price: -1}});
    }
  });
}