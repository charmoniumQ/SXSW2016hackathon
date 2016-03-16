_ = lodash;
search_cache = new Mongo.Collection('search_key_cache');

const headers = {
	"AppId": "40d97855",
	"AppKey": "109d8db6113ad7182a3146725837c82d"
}

suggest = function (name) {
    var _cache = search_cache.findOne({"search_key": name});
    var results_json = null;
    if (typeof(_cache) != "undefined") {
      results_json = search_cache.findOne({"search_key":name})["results_json"];
    } else {
			var results = HTTP.call('GET', 'https://data.quantonemusic.com/v3/artists?name=' + name + '&depth=RelatedArtists', {
				"headers": headers
			}).content;
			var results_json = JSON.parse(results);
			name_id = results_json['Results'][0]['Id'];
			var results = HTTP.call('GET', 'https://recommend.quantonemusic.com/playlist?tag=' + name_id, {
				"headers": headers
			}).content;
			results_json = JSON.parse(results)
      search_cache.insert({"search_key": name,
                          "results_json": results_json});
    }

		var playlist = results_json['PlaylistEntries'];

		return _.map(playlist, function (track) {
			return track['Recording']['MainArtistsLiteral'];
		})
	}

suggestAll = function (names) {
	return _.uniq(_.spread(_.concat)(_.map(names, suggest)));
}

Meteor.methods({
	'suggestAll': suggestAll,
	'suggest': suggest
});
