module.exports = {
	getNDB: function(currentSearch, callback){
		request('http://api.nal.usda.gov/ndb/search/?format=json&q=' + currentSearch +  '&sort=n&max=25&offset=0&api_key=UqyGauU4aSQSifon8gyVK5riyMn5ubZinIHBOk5B', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body).list.item;
				var niceData = [];      
				for ( i=0; i<data.length; i++ ) {
					niceData.push([data[i].group, data[i].name, data[i].ndbno]);
				}
				callback(JSON.stringify(niceData));
			}
		});
	},

	convertKCalToRequriedSport: function(calories, callback){
		// returns how many km need to be traveled for walk, cycle and swim

		if (callback) callback({walk: "2.4km", cycle: "1km", swim: "0.5k", calories: calories});
	}
};