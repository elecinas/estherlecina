/*muestra y oculta la imagen de la galería*/

function showImg(img) {
    let scroll_position = window.scrollY; //guardem la posició actual de l'scroll
    let x = document.getElementById(img); //obtenim l'element enviat
    let clase = document.querySelectorAll('.fondo_modal'); //seleccionem la classe
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
    
    fetch(requestURL)
        .then(response => {
            if(!response.ok) throw new Error("Error al cargar el archivo JSON");
            return response.json();
        })
        .then(data => {
            loadingFront(data, data_type);
        })
        .catch(error => {
            console.error("Error:", error);
        })
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
    const myarray = section_array;
    for (i = 0; i < myarray.length; i++) {
        makeCard(myarray[i]);
        makeModal(myarray[i]);
    }
}

function makeCard(card_data) {
    const card_columns = document.querySelector(".card-columns");
    if (!card_columns) return;

    const cardHTML = `
        <div class="card text-white bg-dark mb-3">
            <a href="#" onclick="event.preventDefault(); showImg('${card_data.id}')">
                <img class="card-img-top" src="${card_data.img_route}" alt="${card_data.name}">
            </a>
            <div class="card-body">
                <h5 class="card-title">${card_data.name}</h5>
                <p class="card-text">${card_data.img_description}</p>
                <p class="card-text">
                    <small class="text-muted">${card_data.editorial}. ${card_data.img_date}</small>
                </p>
            </div>
        </div>
    `;
    
    card_columns.innerHTML += cardHTML;
}

function makeModal(ruta_img) {
    const img_modales = document.querySelector(".img-modales");
    if (!img_modales) return;

    const modalHTML = `
        <div id="${ruta_img.id}" style="display: none;">
            <div class="fondo_modal d-flex justify-content-center align-items-center" onclick="showImg('${ruta_img.id}')">
                <img class="img-fluid" src="${ruta_img.img_route}" alt="${ruta_img.name}">
            </div>
        </div>
    `;
    
    img_modales.innerHTML += modalHTML;
}

document.addEventListener("DOMContentLoaded", function() {
    
    const path = window.location.pathname;
    const page = path.split("/").pop();

    switch (page) {
        case "comic.html":
            readTextFile('comic');
            break;
        case "grafica.html":
            readTextFile('graphic_design');
            break;
        case "ilustracion.html":
            readTextFile('illustration');
            break;
        default:
            break;
    }
});