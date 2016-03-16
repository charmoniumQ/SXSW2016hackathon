function getData(username) {
	var name_id_content = HTTP.call('GET', 'https://data.quantonemusic.com/v3/artists?name=' + username + '&depth=RelatedArtists', {
		"headers" : {
			"AppId": "40d97855",
			"AppKey": "109d8db6113ad7182a3146725837c82d"
		}
	});
	var name_id = JSON.parse(name_id_content['content']);
	name_id = name_id['Results'][0]['Id'];

	var singer_list_content = HTTP.call('GET', 'https://recommend.quantonemusic.com/playlist?tag=' + name_id, {
		"headers" : {
			"AppId": "40d97855",
			"AppKey": "109d8db6113ad7182a3146725837c82d"
		}
	});
	singer_list_content = JSON.parse(singer_list_content['content'])['PlaylistEntries'];

	var result = [];
	singer_list_content.forEach(function(item){
		temp = item['Recording']['MainArtistsLiteral'];
		result.push(temp);
	});

	return result;
}
