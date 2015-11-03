// -> some food

// <- barcode

module.exports = {
	convertBarcodeToCalories: function(barcode, callback){
		// do magic
		if (callback) callback(converted);
	},

	convertKCalToRequriedSport: function(calories, callback){
		if (callback) callback({walk: "2.4km", cycle: "1km", swim: "0.5k", calories: calories});
	}
};