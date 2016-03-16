if (Meteor.isClient) {
  // This code only runs on the client

  Template.Performerhome.helpers({
    gigList: function(event){
        event.preventDefault();
       return Bids.find({}, {sort: {price: -1}});
        console.log("Nice");
      }
  });
}