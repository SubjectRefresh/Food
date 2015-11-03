/*
var id = document.getElementById("data");
var j = 0

function loadMore() {
    if (j < 60) {
        for (i = 0; i < 20; i++) {
            id.innerHTML += '<div class="col s4"><div class="card small"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + "http://lorempixel.com/400/400/?" + j + '"></div><div class="card-content"><span class="card-title activator grey-text text-darken-4">Card Title<i class="material-icons right">more_vert</i></span><p><a href="#">This is a link</a></p></div><div class="card-reveal"><span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span><p>Here is some more information about this product that is only revealed once clicked on.</p></div></div></div>'
            j += 1
        }
    }
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    // console.log(docViewTop, docViewBottom, elemTop, elemBottom);
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

var timer;
$(window).scroll(function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
        if (isScrolledIntoView($('#loadMore'))) {
            loadMore();
            return false;
        }
    }, 50);
});

loadMore();
*/

function toggleVis(id) {
    style = document.getElementById(id).style.visibility;
    if (style == "") {
        document.getElementById(id).style.visibility = "hidden";
    } else {
        document.getElementById(id).style.visibility = "";
    }
}

toggleVis("food");

function getFood(){
    console.log("Get Food was Called");
    toggleVis("food");

}

$(document).ready(function() {
    $('select').material_select();
});

var tempData = '[["Restaurant Foods","APPLEBEE\'S, KRAFT, Macaroni & Cheese, from kid\'s menu","36003"],["Baked Products","AUSTIN, Cheddar Cheese on Cheese Crackers, sandwich-type","18984"],["Baked Products","AUSTIN, Cheddar Cheese on Cheese Crackers, sandwich-type, reduced fat","18987"],["Baked Products","AUSTIN, Cheddar Cheese on Wafer Crackers, sandwich-type","28258"],["Baked Products","AUSTIN, Cheddar Cheese on Wheat Crackers, sandwich-type","18983"],["Baked Products","AUSTIN, Grilled Cheese on Wafer Crackers, sandwich-type","18986"],["Baked Products","AUSTIN, Peanut Butter on Cheese Crackers, sandwich-type","28256"],["Baked Products","AUSTIN, Peanut Butter on Cheese Crackers, sandwich-type, reduced fat","18988"],["Baby Foods","Babyfood, dinner, macaroni and cheese, junior","03090"],["Baby Foods","Babyfood, dinner, macaroni and cheese, strained","03089"],["Baby Foods","Babyfood, dinner, potatoes with cheese and ham, toddler","03304"],["Baby Foods","Babyfood, macaroni and cheese, toddler","03048"],["Baby Foods","Babyfood, ravioli, cheese filled, with tomato sauce","03046"],["Baked Products","Bread, cheese","18972"],["Baked Products","Bread, salvadoran sweet cheese (quesadilla salvadorena)","18953"],["Fast Foods","BURGER KING, CROISSAN\'WICH with Egg and Cheese","21385"],["Fast Foods","BURGER KING, CROISSAN\'WICH with Sausage and Cheese","21384"],["Fast Foods","BURGER KING, CROISSAN\'WICH with Sausage, Egg and Cheese","21383"],["Fast Foods","BURGER KING, DOUBLE WHOPPER, no cheese","21254"],["Fast Foods","BURGER KING, DOUBLE WHOPPER, with cheese","21255"],["Fast Foods","BURGER KING, WHOPPER, no cheese","21252"],["Fast Foods","BURGER KING, WHOPPER, with cheese","21253"],["Meals, Entrees, and Side Dishes","Burrito, bean and cheese, frozen","22918"],["Soups, Sauces, and Gravies","CAMPBELL\'S, Cheddar Cheese Soup, condensed","06038"],["Soups, Sauces, and Gravies","CAMPBELL\'S CHUNKY Soups, Baked Potato with Steak & Cheese Soup","06384"]]'
data = JSON.parse(tempData);
console.log(data);
parseFoodChoices(data);

function parseFoodChoices(choices) {
    for ( i=0; i<choices.length; i++ ) {
        $.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D'https%3A%2F%2Fajax.googleapis.com%2Fajax%2Fservices%2Fsearch%2Fimages%3Fv%3D1.0%26q%3D" + encodeURIComponent("happy bear").replace(" ", "%20") + "'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(data) {
            console.log(data);
        });
    }
}


//https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=fuzzy%20monkey