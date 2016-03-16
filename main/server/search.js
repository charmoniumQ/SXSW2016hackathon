_ = lodash;

const headers = {
	"AppId": "40d97855",
	"AppKey": "109d8db6113ad7182a3146725837c82d"
}

suggest = function (name) {
		var results = HTTP.call('GET', 'https://data.quantonemusic.com/v3/artists?name=' + name + '&depth=RelatedArtists', {
			"headers": headers
		}).content;
		var results_json = JSON.parse(results);
		name_id = results_json['Results'][0]['Id'];

		var results = HTTP.call('GET', 'https://recommend.quantonemusic.com/playlist?tag=' + name_id, {
			"headers": headers
		}).content;
		var results_json = JSON.parse(results)
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
