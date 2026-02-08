let currentProjectsData = []; // Proyectos de la página actual
let activeImageIndex = 0;    // Índice de la imagen que se está viendo

/*muestra y oculta la imagen de la galería*/

function showImg(img) {
    activeImageIndex = 0; // Sempre començarà amb la primera imatge
    let x = document.getElementById(img); //obtenim l'element enviat
   
    if (x.style.display === "none") {
        x.style.display = "block"; //ensenyem l'imatge
        document.body.classList.add("no_scroll") //bloquegem l'scroll
    } else {
        x.style.display = "none"; //amaguem l'imatge
       document.body.classList.remove("no_scroll") //desbloquegem l'scroll
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
            currentProjectsData = data;
            loadingFront(data, data_type);
        })
        .catch(error => {
            console.error("Error:", error);
        })
}

/*enviando los datos de data.json al front*/

function loadingFront(data, data_type) {
    const sectionData = data[data_type];
    currentProjectsData = sectionData;
    makingFront(sectionData);
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
                <img class="card-img-top" src="${card_data.images[0].url}" alt="${card_data.name}">
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

function makeModal(project) {
    const img_modales = document.querySelector(".img-modales");
    if (!img_modales) return;

    // Solo mostramos flechas si hay más de una imagen
    const showControls = project.images.length > 1 ? 'd-flex' : 'd-none';

    const modalHTML = `
        <div id="${project.id}" class="modal-proyecto" style="display: none;">
            <div class="fondo_modal d-flex flex-column justify-content-center align-items-center" onclick="if(event.target == this) showImg('${project.id}')">
                
                <button class="btn-cerrar" onclick="showImg('${project.id}')">&times;</button>

                <div class="contenedor-principal-modal d-flex align-items-center">
                    <button class="nav-arrow ${showControls}" onclick="changeImg('${project.id}', -1)">&#10094;</button>
                    
                    <div class="imagen-wrapper text-center">
                        <img id="img-${project.id}" class="img-fluid" src="${project.images[0].url}" alt="${project.name}">
                    </div>

                    <button class="nav-arrow ${showControls}" onclick="changeImg('${project.id}', 1)">&#10095;</button>
                </div>

                <div class="modal-info-footer text-center text-white mt-3">
                    <h4 class="mb-1">${project.name}</h4>
                    <p id="caption-${project.id}" class="mb-0 text-muted">${project.images[0].caption || ''}</p>
                    <small id="counter-${project.id}" class="d-block mt-2">${1} / ${project.images.length}</small>
                </div>
            </div>
        </div>
    `;
    
    img_modales.innerHTML += modalHTML;
}

function changeImg(projectId, direction) {
    // Encontrar el proyecto
    const project = currentProjectsData.find(p => p.id === projectId);
    if (!project) return;

    // Actualizar el índice, efecto bucle
    activeImageIndex += direction;
    if (activeImageIndex >= project.images.length) activeImageIndex = 0;
    if (activeImageIndex < 0) activeImageIndex = project.images.length - 1;

    // Actualizar el DOM (Imagen, Caption y Contador)
    document.getElementById(`img-${projectId}`).src = project.images[activeImageIndex].url;
    document.getElementById(`caption-${projectId}`).innerText = project.images[activeImageIndex].caption || '';
    document.getElementById(`counter-${projectId}`).innerText = `${activeImageIndex + 1} / ${project.images.length}`;
    document.activeElement.blur(); // quita el foco del botón
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