if (Meteor.isClient) {
  // This code only runs on the client

  Template.PerformerHome.helpers({
  	performerName: function() {
      if(Meteor.user().profile.name != "")
        return Meteor.user().profile.name;
      else
    		return Meteor.user().emails[0].address;
  	},
  	gigsA: function(){
    	return Bids.find({artist: Meteor.userId(),accepted: true}, {sort: {price: -1}});
    },
    gigsB: function(){
    	return Bids.find({artist: Meteor.userId(),accepted: false}, {sort: {price: -1}});
    }
  });

  Template.PerformerHome.events({
    'click #acceptVenues > tbody': function(event) {
      event.preventDefault();
      var hiddenBidId = $(event.target).closest('tr').data().hiddenID;
      Bids.update({_id: hiddenBidId},{$set: {accepted: true}});
    }
  });
}