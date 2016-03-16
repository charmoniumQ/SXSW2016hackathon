_ = lodash;


if (Meteor.isClient) {
	var queries = new ReactiveArray();
	var suggested = new ReactiveArray();
	function handle_suggest(continuation) {
		function handle_suggest_(event) {
			event.preventDefault();
			
			// Get value from form element
			var artist = event.target.query.value;
 			
			//Add to list
			queries.push(artist);
			
			// Clear form
			event.target.query.value = "";

			console.log('I: ' + queries);
			Meteor.call('suggestAll', queries, function (error, response) {
				console.log(error);
				response = _.concat([artist], response);
				console.log('O: ' + response);
				continuation(response);
			});
		}
		return handle_suggest_;
	}

	Template.search.events({
		"submit .new-search": handle_suggest(function (response) {
			console.log(response);
			suggested.clear()
			_.forEach(response, function(artist){
				var db_artist = Meteor.users.findOne({"profile.name": artist});
				console.log(db_artist);
				if(db_artist !== undefined) {
					console.log('bwael');
					console.log(db_artist);
					suggested.push("<a href='/performer_profile/" + db_artist["_id"] + "'>" + artist + "</a>");
					console.log(suggested);
				} else {
					suggested.push(artist);
					console.log(suggested);
				}
			});
		})
	});

	Template.explore.events({
		"submit .new-search": handle_suggest(function (queries) {
			var j = 0;
		})
	})

	Template.search.helpers({
		queries: function() {
			return queries.list();
		},
		suggested: function() {
			return suggested.list();
		}
	});

}
