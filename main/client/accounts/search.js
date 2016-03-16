_ = lodash;


if (Meteor.isClient) {
	var queries = new ReactiveArray();
	var suggested = new ReactiveArray();
	Template.search.events({
		"submit .new-search": function (event) {
			event.preventDefault();
			
			// Get value from form element
			var artist = event.target.query.value;
 			
			//Add to list
			queries.push(artist);
			
			// Clear form
			event.target.query.value = "";

			suggested.clear()
			console.log(queries);
			Meteor.call('suggestAll', queries, function (error, response) {
				console.log(error);
				console.log(response);
				_(response).forEach(function (artist) {
					suggested.push(artist);
				});
			});
        }
	});

	Template.search.helpers({
		queries: function() {
			return queries.list();
		},
		suggested: function() {
			return suggested.list();
		}
	});

}
