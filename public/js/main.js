function toggleVis(id) {
    style = document.getElementById(id).style.visibility;
    // if (style == "") {
    //     document.getElementById(id).style.visibility = "hidden";
    // } else {
    //     document.getElementById(id).style.visibility = "";
    // }
}

$(document).ready(function() {
    toggleVis("food");

    var socket = io();
    var gender;
    $('#gender').material_select();

    $("#go1").click(function() {
        console.log("Get Food was Called");
        //toggleVis("food");
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
            socket.emit("getFood", { food: $("#foods").val() });
        });
    });

    socket.on("recieveCalories", function(packet) {
        $(".container").append("<h2>It would take you " + Math.floor(packet.running * 60) + " minutes of running to burn this off meal off!</h2>");
        $(".container").append("<h2>It would take you " + Math.floor(packet.walking * 60) + " minutes of walking to burn this off meal off!</h2>");
    });
});
