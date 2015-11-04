$(document).ready(function() {
    var socket = io();
    var gender;
    $('#gender').material_select();

    $("#go1").click(function() {
        socket.emit("getFoodSuggestions", { food: $("#food").val() });
        gender = $("#gender").val();
    });

    socket.on("suggestions", function(packet) {
        for (i in packet.output) {
            $("#more-options").fadeIn("slow");
            $("#foods").append('<option value="' + packet.output[i][2] + '">' + packet.output[i][1] + "</option>");
        }
        $("#foods").material_select();
        $("#go1").off("click");
        $("#go1").click(function() {
            var age = $("#age").val();
            var weight = $("#weight").val();
            if (age == "") age = 42;
            if (weight == "") weight = 184;
            socket.emit("getFood", { food: $("#foods").val(), gender: $("#gender").val(), age: age, weight: weight });
        });
    });

    socket.on("receiveCalories", function(packet) {
        $("main > .container > .results").append('<div class="col s12 m4"><div class="card blue-grey darken-1 white-text"><div class="card-content"><span class="card-title">Run</span></div><div class="card-action"><span class="time-number">' + Math.floor(packet.running * 60) + '</span> minutes</i></div></div></div>');
        $("main > .container > .results").append('<div class="col s12 m4"><div class="card blue-grey darken-1 white-text"><div class="card-content"><span class="card-title">Walk</span></div><div class="card-action"><span class="time-number">' + Math.floor(packet.walking * 60) + '</span> minutes</i></div></div></div>');
        $("main > .container > .results").append('<div class="col s12 m4"><div class="card blue-grey darken-1 white-text"><div class="card-content"><span class="card-title">Swim</span></div><div class="card-action"><span class="time-number">' + Math.floor(packet.swimming * 60) + '</span> minutes</i></div></div></div>');
        $(".results").slideDown("slow");
    });
});
