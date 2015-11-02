try {
	var colors = require("colors");
	var fs = require("fs");
    var app = require("express")();
    var http = require("http").Server(app);
    var io = require("socket.io")(http);
    var express = require("express");

    var app = express();
    
    app.use(express.static('public'));

    app.get("/", function(req, res) {
        console.log("app.js      - " + "[Refresh] Sending homepage".blue);
        fs.readFile("pages/index.html", "utf-8", function(err, data) {
            res.send(data);
        });
    });

	http.listen(3001, function() {
        console.log("app.js      - " + "[Refresh - Food] Running at ".green + "http://localhost:3001".blue);
    });
} catch (e) {
    console.log("app.js      - " + "[Refresh] FATAL ERROR".red);
    console.log(e);
}