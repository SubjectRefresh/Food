$(document).ready(function() {
    $.getJSON("/get_config", function(config) {
        console.log(config);
        socket = io(config.socket);

        if (config.google_analytics) {
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-69122586-1', 'auto');
            ga('send', 'pageview');
            ga('_setDomainName', 'food.subjectrefresh.info');
        }

        $("#go1").click(function() {
            socket.emit("getFoodSuggestions", {
                food: $("#food").val()
            });
            gender = $("#gender").val();
        });

        socket.on("suggestions", function(packet) {
            $("main > .container > .results").find("p").remove();
            if (packet.suggestions) {
                for (i in packet.suggestions) {
                    $("#more-options").fadeIn("slow");
                    $("#foods").append('<option value="' + packet.suggestions[i][2] + '">' + packet.suggestions[i][1] + "</option>");
                }
                $("#foods").material_select();
                $("#go1").off("click");
                $("#go1").click(function() {
                    var age = $("#age").val();
                    var weight = $("#weight").val();
                    if (age == "") age = 42;
                    if (weight == "") weight = 184;
                    socket.emit("getFood", {
                        food: $("#foods").val(),
                        gender: $("#gender").val(),
                        age: age,
                        weight: weight
                    });
                });
            } else {
                $(".results").html("<p>Sorry, we couldn't find any results for " + $("#food").val()).slideDown("slow");
            }
        });

        socket.on("receiveCalories", function(packet) {
            //        $("#share-results").attr("href", "https://twitter.com/intent/tweet?text=I%20just%20used%20%40SubjectRefresh%27s%20%23healthy%20app!%20Try%20it%20out%20at%20http%3A%2F%2Ffood.subjectrefresh.info!");
            $("main > .container > .results").append('<div class="col s12 m4"><div class="card blue-grey darken-1 white-text"><div class="card-content"><span class="card-title">Run</span></div><div class="card-action"><span class="time-number">' + Math.floor(packet.running * 60) + '</span> minutes</i></div></div></div>');
            $("main > .container > .results").append('<div class="col s12 m4"><div class="card blue-grey darken-1 white-text"><div class="card-content"><span class="card-title">Walk</span></div><div class="card-action"><span class="time-number">' + Math.floor(packet.walking * 60) + '</span> minutes</i></div></div></div>');
            $("main > .container > .results").append('<div class="col s12 m4"><div class="card blue-grey darken-1 white-text"><div class="card-content"><span class="card-title">Swim</span></div><div class="card-action"><span class="time-number">' + Math.floor(packet.swimming * 60) + '</span> minutes</i></div></div></div>');
            $(".results").slideDown("slow");
            $("#go1").fadeOut("slow", function() {
                $(this).html("Try another").off("click").on("click", function() {
                    window.location.reload(false);
                }).fadeIn("slow");
            });
        });
    });
    var gender;
    $('#gender').material_select();
});