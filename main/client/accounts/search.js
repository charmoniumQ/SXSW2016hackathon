if (Meteor.isClient) {
	var queries = new ReactiveArray();
	Template.search.events({
    "submit .new-search": function (event) {
      event.preventDefault();
 
      // Get value from form element
      var artist = event.target.query.value;
 	
      //Add to list
      queries.push(artist);
 
      // Clear form
      event.target.query.value = "";
        }
  });

	Template.search.helpers({
		queries: function() {
			return queries.list();
		}
	});

}