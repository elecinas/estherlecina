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
        makeModal(myarray[i]);
    }
}

var card_columns = document.querySelector(".card-columns");
var img_modales = document.querySelector(".img-modales");

function makeCard(card_data) {

    //1º CREAR <div> QUE LO ENVUELVE TODO
    //<div class="card">
    var divCard = document.createElement('div');
    divCard.setAttribute("class", "card  text-white bg-dark mb-3");
    card_columns.appendChild(divCard);

    //2º METER DENTRO LOS ELEMENTOS HIJOS: <a> Y <div>
    //<a href="#" onclick="event.preventDefault(); showImg('xfrd_Luna_07_08')">
    var aCard = document.createElement('a');
    aCard.setAttribute("href", "#");
    aCard.setAttribute("onclick", "event.preventDefault(); showImg('" + card_data.id + "')");
    divCard.appendChild(aCard);

    //<div class="card-body">
    var divCardBody = document.createElement('div');
    divCardBody.setAttribute("class", "card-body");
    divCard.appendChild(divCardBody);

    //3º METER DENTRO DE <a> EL ELEMENTO <img>
    //<img class="card-img-top" src="httd34.jpg" alt="Card image cap">
    var imgCard = document.createElement('img');
    imgCard.setAttribute("class", "card-img-top");
    imgCard.setAttribute("alt", "Card image cap");
    imgCard.setAttribute("src", card_data.img_route);
    aCard.appendChild(imgCard);

    //4º METER DENTRO DE <div class="card-body"> LOS ELEMENTOS h5, p, p
    //<h5 class="card-title">Card title that wraps to a new line</h5>
    var titleh5 = document.createElement('h5');
    titleh5.setAttribute("class", "card-title");
    titleh5.textContent = card_data.name;
    divCardBody.appendChild(titleh5);

    //<p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
    var principalText = document.createElement('p');
    principalText.setAttribute("class", "card-text");
    principalText.textContent = card_data.img_description;
    divCardBody.appendChild(principalText);

    //<p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    var littleText = document.createElement('p');
    littleText.setAttribute("class", "card-text");
    divCardBody.appendChild(littleText);

    var smallText = document.createElement('small');
    smallText.setAttribute("class", "text-muted");
    smallText.textContent = card_data.editorial + '. ' + card_data.img_date;
    littleText.appendChild(smallText);
}

function makeModal(ruta_img) {

    //1º CREAR <div> QUE LO ENVUELVE TODO
    //<div id="xfrd_Luna_07_08">
    var divId = document.createElement('div');
    divId.setAttribute("id", ruta_img.id);
    img_modales.appendChild(divId);

    //2º METER DENTRO <div> QUE ENVUELVE LA IMAGEN
    //<div class="fondo_modal d-flex justify-content-center align-items-center" onclick="showImg('xfrd_Luna_07_08')">
    var divImg = document.createElement('div');
    divImg.setAttribute("class", "fondo_modal d-flex justify-content-center align-items-center");
    divImg.setAttribute("onclick", "showImg('" + ruta_img.id + "')");
    divId.appendChild(divImg);

    //3º METER DENTRO <img>
    //<img class="img-fluid" src="https:b38cd34.jpg">
    var imgModal = document.createElement('img');
    imgModal.setAttribute("class", "img-fluid");
    imgModal.setAttribute("src", ruta_img.img_route);
    divImg.appendChild(imgModal);

    //OCULTARLO TODO MEDIANTE CSS
    document.getElementById(ruta_img.id).style.display = "none";
}