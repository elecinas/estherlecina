let currentProjectsData = []; // Proyectos de la página actual
let activeImageIndex = 0;    // Índice de la imagen que se está viendo

/*muestra y oculta la imagen de la galería*/

function showImg(img) {
    activeImageIndex = 0;
    let x = document.getElementById(img);

    if (x.style.display === "none" || x.style.display === "") {
        x.style.display = "flex"; // CAMBIADO DE BLOCK A FLEX
        document.body.classList.add("no_scroll");
    } else {
        x.style.display = "none";
        document.body.classList.remove("no_scroll");
    }
}


/*acceder a los datos de data.json */

function readTextFile(data_type) {
    const requestURL = 'data.json';

    fetch(requestURL)
        .then(response => {
            if (!response.ok) throw new Error("Error al cargar el archivo JSON");
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
    const galleryContainer = document.querySelector(".gallery-container");
    if (!galleryContainer) return;

    // OPCIÓN A: Número fijo de columnas para que todas las cards sean iguales
    const squaresX = 16;
    const squareWidth = 100 / squaresX;

    // 1. RECTÁNGULO BASE: Bloque sólido inferior (75% del alto)
    let svgContent = `<rect x="0" y="25%" width="100%" height="75%" fill="rgb(35, 35, 35)" stroke="none" />`;

    // 2. FILA SUPERIOR: Cuadrados de transición con ritmo fijo
    for (let col = 0; col < squaresX; col++) {
        let fill = 'rgb(35, 35, 35)';
        let opacity = 1;

        if (col === 0) {
            fill = 'rgb(35, 35, 35)';
        } else if (col === 1) {
            fill = 'rgba(58, 127, 129, 1)';
        } else if (col === 2) {
            fill = 'rgba(82, 220, 223, 1)';
        } else {
            fill = 'rgba(82, 220, 223, 1)';
            // Desvanecimiento: ajusta el 0.25 si quieres que el rastro sea más largo o corto
            opacity = Math.max(0, 1 - ((col - 2) * 0.25));
        }

        svgContent += `<rect x="${col * squareWidth}%" y="0" width="${squareWidth}%" height="25%" fill="${fill}" fill-opacity="${opacity}" stroke="none" />`;
    }

    // Generamos las etiquetas de técnica dinámicamente
    const techTags = card_data.technique.map(t => `<span class="art-pill">${t}</span>`).join('');

    const cardHTML = `
        <div class="card-box" data-category="${card_data.category}" onclick="toggleCardFlip('${card_data.id}', event)">
            <div class="card-inner" id="inner-${card_data.id}">
                <div class="card-face front">
                    <img src="${card_data.cardImgUrl}" alt="${card_data.name}" loading="lazy">
                    <div class="mosaico-wrapper">
                        <svg class="mosaico-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                            ${svgContent} </svg>
                        <h3 class="card-front-title">[ ${card_data.name.toUpperCase()} ]</h3>
                    </div>
                </div>

                <div class="card-face back-card">
                    <div class="card-info-container">
                        <div class="art-pills-container">${techTags}</div>
                        
                        <h3 class="card-info-title">${card_data.name}</h3>
                        <p class="card-info-text">${card_data.description}</p>
                        
                        <div class="card-info-footer">
                            <p class="card-info-client"><strong>Cliente:</strong> ${card_data.client}</p>
                            <p class="card-info-date">${card_data.date}</p>
                        </div>
        
                        <div class="button-wrapper">
                            <button class="btn-terminal-style" 
                                onclick="event.stopPropagation(); showImg('${card_data.id}')">
                                [ VER_PROYECTO ]
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    galleryContainer.innerHTML += cardHTML;
}
// Función para girar la carta
function toggleCardFlip(id, event) {
    // Si clicamos el botón "VER PROYECTO" o cualquier cosa dentro de button-wrapper, NO giramos
    if (event.target.closest('.button-wrapper') || event.target.closest('.btn-terminal-style')) {
        return;
    }

    const cardInner = document.getElementById(`inner-${id}`);
    if (cardInner) {
        cardInner.classList.toggle('switched');
    }
}

function makeModal(project) {
    const img_modales = document.querySelector(".img-modales");
    if (!img_modales) return;

    const showControls = project.images.length > 1 ? '' : 'd-none';

    const modalHTML = `
        <div id="${project.id}" class="modal-proyecto">
            <div class="contenedor-principal-modal">
                <button class="nav-arrow ${showControls}" onclick="changeImg('${project.id}', -1)">&#10094;</button>
                
                <div class="imagen-wrapper">
                    <img id="img-${project.id}" src="${project.images[0].url}" alt="${project.name}">
                    
                    <div class="modal-info-footer">
                        <h4>${project.name}</h4>
                        <p id="caption-${project.id}">${project.images[0].caption || ''}</p>
                        <small id="counter-${project.id}">${1} / ${project.images.length}</small>
                    </div>
                </div>

                <button class="nav-arrow ${showControls}" onclick="changeImg('${project.id}', 1)">&#10095;</button>
            </div>
            
            <button class="btn-cerrar" onclick="showImg('${project.id}')">&times;</button>
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
    // document.activeElement.blur(); // quita el foco del botón
}

document.addEventListener("DOMContentLoaded", function () {

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

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.navbar-toggler');
    const closeBtn = document.querySelector('.navbar-close');
    const navMenu = document.querySelector('.navbar-collapse');

    // Abrir menú
    menuBtn?.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar menú
    const closeMenu = () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    closeBtn?.addEventListener('click', closeMenu);

    // Cerrar si se clica un enlace (útil para Single Page Apps o anclas)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
});