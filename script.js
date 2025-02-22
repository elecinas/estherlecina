const illustrationBody = document.getElementById('ilustration-body');
illustrationBody.addEventListener('onload', loadGalleryCards('illustration'));

function toggleMenu() {
    document.getElementById("navbarNav").classList.toggle("menu-visible");
}

async function readJsonFile() {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error("Error en la petición");
    return response.json();
}

function selectData(data, dataType) {
    switch (dataType) {
        case 'illustration':
            return data['illustration'];
        case 'comic':
            return data['comic'];
        case 'graphic_design':
            return data['graphic_design'];
        case 'web':
            return data['web'];
    }
}

function loadGalleryCards(dataType) {
    readJsonFile()
        .then(data => {
            const galleryContainer = document.querySelector('.gallery-container');
            const selectedInfo = selectData(data, dataType);
            selectedInfo.map(e => createGalleryCards(e, galleryContainer));
            loadCardButtons();
        })
        .catch(error => console.error(error));
}

function createSvg({
    viewBox = "0 0 576 512",
    paths = [],
    classes = [],
    attributes = {},
    events = {},
    parentElement = document.body
}) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", viewBox);
    classes.forEach(cls => svg.classList.add(cls));
    Object.entries(attributes).forEach(([key, value]) => svg.setAttribute(key, value));
    Object.entries(events).forEach(([event, handler]) => svg.addEventListener(event, handler));
    paths.forEach(d => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);
        svg.appendChild(path);
    });
    parentElement.appendChild(svg);

    return svg;
}


function createGalleryCards(cardData, container) {
    console.log(cardData, "what?")
    const cardBox = document.createElement('div');
    cardBox.classList.add('card-box', 'gallery-item');
    container.appendChild(cardBox);

    const card = document.createElement('div');
    card.classList.add('card');
    cardBox.appendChild(card);

    const cardFrontFace = document.createElement('div');
    cardFrontFace.classList.add('card-face');
    card.appendChild(cardFrontFace);

    //creamos el SVG eye
    const svgEye = {
        viewBox: "0 0 576 512",
        paths: ["M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"],
        classes: ["card-icon-eye"],
        attributes: {
            role: "button",
            tabindex: 0,
        },
        events: {
            click: () => displayImage(cardData.img_route, cardData.alt_description)
        },
        parentElement: cardFrontFace,
    }
    createSvg(svgEye);

    //creamos el svg info:
    const svgInfo = {
        viewBox: "0 0 512 512",
        paths: ["M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"],
        classes: ["card-icon-info"],
        attributes: {
            role: "button",
            tabindex: 0,
        },
        events: {},
        parentElement: cardFrontFace,
    }
    createSvg(svgInfo);

    //Creamos el elemento img
    const cardImg = document.createElement('img');
    cardData.img_card_route && cardImg.setAttribute('src', cardData.img_card_route);
    cardImg.setAttribute('alt', cardData.alt_description);
    cardFrontFace.appendChild(cardImg);

    //Creamos la parte de atrás de la card:
    const cardBackFace = document.createElement('div');
    cardBackFace.classList.add('gallery-item-info', 'card-face', 'back');
    card.appendChild(cardBackFace);

    //creamos otro SVG eye
    svgEye.parentElement = cardBackFace;
    createSvg(svgEye);

    const svgCloseInfo = {
        viewBox: "0 0 512 512",
        paths: ["M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"],
        classes: ["card-icon-info"],
        attributes: {
            role: "button",
            tabindex: 0,
        },
        events: {},
        parentElement: cardBackFace,
    }
    createSvg(svgCloseInfo);

    //creamos el div con la info:
    //<div class="card-info-container">
    const infoContainer = document.createElement('div');
    infoContainer.classList.add('card-info-container');
    cardBackFace.appendChild(infoContainer);

    //<h3 class="card-info-title">Carta Mimo</h3>
    const h3Info = document.createElement('h3');
    h3Info.classList.add('card-info-title');
    h3Info.textContent = cardData.name;
    infoContainer.appendChild(h3Info);
    //<p class="card-info-text">
    const pInfo = document.createElement('p');
    pInfo.classList.add('card-info-text');
    pInfo.textContent = cardData.img_description;
    infoContainer.appendChild(pInfo);
    //<p class="card-info-client-date">Colors of Talent. 2022</p>
    const pInfoBottom = document.createElement('p');
    pInfoBottom.classList.add('card-info-client-date');
    pInfoBottom.textContent = `${cardData.editorial}. ${cardData.img_date}`;
    infoContainer.appendChild(pInfoBottom);
}

function loadCardButtons() {
    document.querySelectorAll(".card-icon-info").forEach(svg => {
        svg.addEventListener("click", function (event) {
            const card = event.target.closest(".card");
            card && card.classList.toggle("switched");
        })
    })
}

function displayImage(imageSrc, imageAlt = 'ilustración') {
    //creamos un nuevo div contenedor antes de main
    //<div class="image-displayer">
    const body = document.body;
    const main = document.querySelector("main");
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-displayer');
    // imageContainer.textContent = imageSrc;
    body.insertBefore(imageContainer, main);

    //creamos el div contenedor del botón que cerrará la ventana dentro del div principal
    //<div class="image-closer-container">
    const closeContainer = document.createElement('div');
    closeContainer.classList.add('image-closer-container');
    imageContainer.appendChild(closeContainer);

    //creamos el elemento button que cerrará la ventana en su contenedor
    //<button class="image-closer" type="button" onclick="">
    const closerButton = document.createElement('button');
    closerButton.classList.add('image-closer');
    closerButton.setAttribute('type', 'button');
    closerButton.setAttribute('onclick', 'closeImageDisplayer()'); //TODO
    closeContainer.appendChild(closerButton);

    //creamos el SVG dentro de button
    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("role", "button");
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgElement.setAttribute("viewBox", "0 0 448 512");

    // Creamos el elemento PATH dentro del SVG
    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("d", "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z");
    svgElement.appendChild(pathElement);
    closerButton.appendChild(svgElement);

    // Creamos el contenedor del elemento img dentro del contenedor principal
    // <div class="image-container">
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-container');
    imageContainer.appendChild(imageWrapper);

    //Creamos el elemento img dentro de image-container
    //<img class="image" src="./img/ilustracion/msn_Los_Otros_niebla.jpg" alt="bla">
    const image = document.createElement('img');
    image.classList.add('image');
    image.setAttribute('src', imageSrc);
    image.setAttribute('alt', imageAlt);
    imageWrapper.appendChild(image);
}

function closeImageDisplayer() {
    const imageDisplayer = document.querySelector('.image-displayer');
    imageDisplayer && imageDisplayer.remove();
} 