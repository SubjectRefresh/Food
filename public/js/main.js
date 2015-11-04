$(document).ready(function() {
    var socket = io();
    var gender;
    $('#gender').material_select();

    $("#go1").click(function() {
        console.log("Get Food was Called");
        socket.emit("getFoodSuggestions", { food: $("#food").val() });
        gender = $("#gender").val();
    });

    socket.on("suggestions", function(packet) {
        console.log(packet);
        for (i in packet.output) {
            $("#foods").append('<option value="' + packet.output[i][2] + '">' + packet.output[i][1] + "</option>");
        }
        $("#foods").material_select();
        $("#go1").off("click");
        $("#go1").click(function() {
            socket.emit("getFood", { food: $("#foods").val(), gender: $("#gender").val() });
        });
    });

    socket.on("recieveCalories", function(packet) {
        console.log(packet);
        $("main > .container").append("<div class='row center'><h5>It would take you " + Math.floor(packet.running * 60) + " minutes of running to burn this meal off!</h5></div>");
        $("main > .container").append("<div class='row center'><h5>It would take you " + Math.floor(packet.walking * 60) + " minutes of walking to burn this meal off!</h5></div>");
    });
});
