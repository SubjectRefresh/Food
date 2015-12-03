var request = require("request");

module.exports = {
    getNDB: function(currentSearch, callback) {
        request('http://api.nal.usda.gov/ndb/search/?format=json&q=' + currentSearch + '&sort=n&max=25&offset=0&api_key=UqyGauU4aSQSifon8gyVK5riyMn5ubZinIHBOk5B', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                var data = JSON.parse(body).list.item;
                var simpleData = [];
                for (i = 0; i < data.length; i++) {
                    simpleData.push([data[i].group, data[i].name, data[i].ndbno]);
                }
                callback(simpleData);
            } else {
                callback(false);
            }
        });
    },

    getCalorie: function(ndb, callback) {
        request('http://api.nal.usda.gov/ndb/reports/?ndbno=' + String(ndb) + '&type=f&format=json&api_key=UqyGauU4aSQSifon8gyVK5riyMn5ubZinIHBOk5B', function(error, response, body) {
            var data = JSON.parse(body).report.food.nutrients;
            var energy = [];
            var parsedEnergy = [];
            for (i = 0; i < data.length; i++) {
                if (data[i].name == "Energy") {
                    if (data[i].unit == "kcal") {
                        energy = data[i];
                    }
                }
            }
            callback(energy['value']);
        });
    },

    energyBurnt: function(age, weight, exercise, time, gender, callback) {
        weight = weight * 0.453592;
        var type = {
            "walking": 130,
            "running": 170,
            "swimming": 220
        };
        try {
            var heartrate = type[exercise];
        } catch (e) {
            var heartrate = 100;
        }

        if (gender == "m") {
            var CaloriesBurnt = (age * 0.2017 - weight * 0.09036 + heartrate * 0.6309 - 55.0969) * (time / 4.184);
        } else {
            var CaloriesBurnt = (age * 0.074 - weight * 0.05741 + heartrate * 0.4472 - 20.4022) * (time / 4.184);
        }
        if (CaloriesBurnt == NaN) {
            CaloriesBurnt = 100;
        } else {
            callback(CaloriesBurnt);
        }
    }
};