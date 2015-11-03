module.exports = {
	convertBarcodeToCalories: function(barcode, callback){
		// converts barcode to calories

		if (callback) callback(converted);
	},

	convertKCalToRequriedSport: function(calories, callback){
		// returns how many km need to be traveled for walk, cycle and swim

		if (callback) callback({walk: "2.4km", cycle: "1km", swim: "0.5k", calories: calories});
	}
};