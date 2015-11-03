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
