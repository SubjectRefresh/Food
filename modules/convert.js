var request = require("request");

module.exports = {
	getNDB: function(currentSearch, callback){
		request('http://api.nal.usda.gov/ndb/search/?format=json&q=' + currentSearch +  '&sort=n&max=25&offset=0&api_key=UqyGauU4aSQSifon8gyVK5riyMn5ubZinIHBOk5B', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var data = JSON.parse(body).list.item;
				var niceData = [];      
				for ( i=0; i<data.length; i++ ) {
					niceData.push([data[i].group, data[i].name, data[i].ndbno]);
				}
				callback(niceData);
			}
		});
	},

	getCalorie: function(ndb, callback){
		request('http://api.nal.usda.gov/ndb/reports/?ndbno=' + ndb + '&type=f&format=json&api_key=UqyGauU4aSQSifon8gyVK5riyMn5ubZinIHBOk5B', function (error, response, body) {
	        var data = JSON.parse(body).report.food.nutrients;
	        var energy = [];
	        var parsedEnergy = [];
	        for ( i=0; i<data.length; i++ ) {
	                if ( data[i].name == "Energy") {
	                        if ( data[i].unit == "kcal") {
	                                energy.push(data[i]);
	                        }
	                }
	        }
	        parsedEnergy['calories'] = [];
	        parsedEnergy['calories']['value'] =  energy.value;
	        parsedEnergy['calories']['measure'] = "100";
	        callback(parsedEnergy);
	    });
	},

	energyBurnt: function(age, weight, exercise, time, gender, callback){
		var heartrate = 0;
        if ( exercise == "walking" ) {
        	heartrate = 130;
        } else if ( exercise == "running") {
        	heartrate = 170;
        }
        if ( gender == "man" ) {
        	var CaloriesBurnt = (age * 0.2017 - weight * 0.09036 + heartrate * 0.6309 - 55.0969) * (time / 4.184);
        } else {
        	var CaloriesBurnt = (age * 0.074 - weight * 0.05741 + heartrate * 0.4472 - 20.4022) * (time / 4.184);
        }
        callback(CaloriesBurnt);
	}
};
