if (Meteor.isClient) {
  // This code only runs on the client

  Template.Addbid.events({
    'submit form': function(event){
        event.preventDefault();
       // var artistVar = event.target.artist.value;
        var dateVar = event.target.date.value;
        var bidVar = event.target.bid.value;

        Bids.insert({
          venue: Meteor.userId(),
          artist: "Radiohead",
          artistRating: 4,
          date: dateVar,
          price: Number(bidVar),
          accepted: false
        });
        console.log("Submitted");
      }
  });
}