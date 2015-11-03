var request = require("request");

function getNDB(currentSearch, callback) {
	request('http://api.nal.usda.gov/ndb/search/?format=json&q=' + currentSearch +  '&sort=n&max=25&offset=0&api_key=UqyGauU4aSQSifon8gyVK5riyMn5ubZinIHBOk5B', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	data = JSON.parse(body).list.item;
	  	niceData = []; 	
	    for ( i=0; i<data.length; i++ ) {
	    	niceData.push([data[i].group, data[i].name, data[i].ndbno]);
	    }
	    callback(JSON.stringify(niceData));
	  }
	});
}



getNDB("cheese", function(data){console.log(data)});