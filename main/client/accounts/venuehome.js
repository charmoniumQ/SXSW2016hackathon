if (Meteor.isClient) {
  // This code only runs on the client

  Template.VenueHome.helpers({
  	venueName: function() {
  		return Meteor.user().emails[0].address;
  	},
  	bidsA: function(){
    	return Bids.find({accepted: true}, {sort: {price: -1}});
    },
    bidsB: function(){
    	return Bids.find({accepted: false}, {sort: {price: -1}});
    },
    artistList: function(){
    	return Meteor.users.find({'profile.typeOfUser': "Performer"}, {sort: {name: 1}});
    }
  });

  Template.VenueHome.events({
  	'click #newBids > tbody': function(event) {
  		event.preventDefault();
  		Session.set('artistName', $(event.target).closest('tr').data().name);
  		$('#addBidModal').modal('show');
  	},
  	'submit form': function(event){
        event.preventDefault();
        var dateVar = event.target.date.value;
        var bidVar = event.target.bid.value;
        Bids.insert({
          venue: Meteor.userId(),
          artist: Session.get('artistName'),
          artistId: Session.get('artistName'),
          artistRating: 4,
          date: dateVar,
          price: Number(bidVar),
          accepted: false
        });
        console.log("Submitted");
      }
  });
}