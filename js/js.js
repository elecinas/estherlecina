/*muestra y oculta la imagen de la galería*/

function showImg(img) {
    var scroll_position = window.scrollY; //guardem la posició actual de l'scroll
    var x = document.getElementById(img); //obtenim l'element enviat
    var clase = document.querySelectorAll('.fondo_modal'); //seleccionem la classe
    clase.forEach(element => {
        element.style.top = Math.round(scroll_position) + "px"; //possició de l'scroll := posició de la imatge
    });
    if (x.style.display === "none") {
        x.style.display = "block"; //ensenyem l'imatge
        $("body").addClass("no_scroll"); //bloquegem l'scroll
    } else {
        x.style.display = "none"; //amaguem l'imatge
        $("body").removeClass("no_scroll"); //desbloquegem l'scroll
    }
}


/*acceder a los datos de data.json */
/*
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

readTextFile("data.json", function(text) {
    var data = JSON.parse(text);
    console.log(data);
});
*/

function readTextFile(data_type) {
    const requestURL = 'data.json';
    const request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        const data = request.response;
        loadingFront(data, data_type);
    }
}

/*enviando los datos de data.json al front*/

function loadingFront(data, data_type) {
    switch (data_type) {
        case 'illustration':
            makingFront(data['illustration']);
            break;
        case 'comic':
            makingFront(data['comic']);
            break;
        case 'graphic_design':
            makingFront(data['graphic_design']);
            break;
        case 'web':
            makingFront(data['web']);
            break;
    }
}

function makingFront(section_array) {
    var myarray = section_array;
    for (i = 0; i < myarray.length; i++) {
        makeCard(myarray[i]);
        makeModal(myarray[i]['img_route']);
    }
}

var card_columns = document.querySelector(".card-columns");
var img_modales = document.querySelector(".img-modales");

function makeCard(card_data) {
    console.log(card_data['name']);
    //@TODO: que se monte la card en el front
}

function makeModal(ruta_img) {
    console.log(ruta_img);
    //@TODO: que se monte el modal en el front
}