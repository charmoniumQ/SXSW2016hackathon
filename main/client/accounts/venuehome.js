_ = lodash;

function find_max_bid(bids) {
	var max_bid = {'venue_id': 0, 'price': 0};
	_.forEach(bids, function (bid) {
		console.log(JSON.stringify(bid));
		bid.artist = Meteor.users.findOne({_id: bid.artist_id});
		if (max_bid.price < bid.price) {
			max_bid = bid;
		}
	});
	if (max_bid.venue_id === 0) {
		return undefined
	} else {
		max_bid.venue = Meteor.users.findOne({_id: max_bid.venue_id});
		return max_bid;
	}
}

if (Meteor.isClient) {
	// This code only runs on the client

	Template.VenueHome.helpers({
  		venueName: function() {
  			return Meteor.user().emails[0].address;
  		},
  		bidsA: function(){
    		var bids = Bids.find({accepted: true}, {sort: {price: -1}}).fetch();
			bids.max_bid = find_max_bid(bids);
    		return bids;
		},
		bidsB: function(){
    		var bids = Bids.find({accepted: false}, {sort: {price: -1}}).fetch();
			bids.max_bid = find_max_bid(bids);
    		return bids;
		},
		artistList: function(){
    		var artists = Meteor.users.find({'profile.typeOfUser': "Performer"}, {sort: {name: 1}});
			// _.forEach(artists, function (artist) {
			// 	var bids = Bids.find({artist_id: artist._id}).fetch();
			// 	max_bid = find_max_bids()
			// });
			return artists;
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
				venue_id: Meteor.userId(),
				artist_id: Session.get('artistName'),
				artistRating: 4,
				date: dateVar,
				price: Number(bidVar),
				accepted: false
			});
			console.log("Submitted");
		}
	});
}
