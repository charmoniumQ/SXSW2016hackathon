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
      var datum = $(event.target).closest('tr').data();
      Bids.update({artist: Meteor.userId(),accepted: false,venue: datum.venue, date: datum.date, price: datum.price},{$set: {accepted: true}});
    }
  });
}