// Sélection des éléments HTML
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("Contrast"); 
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let upphoto = document.getElementById("upphoto");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.getElementById("reset");
let imgBox = document.querySelector('.img-box');

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

// Fonction de réinitialisation
function resetValues() {
    img.style.filter = 'none';
    saturate.value = '100';
    contrast.value = '100';
    brightness.value = '100';
    sepia.value = '0';
    grayscale.value = '0';
    blur.value = '0';
    hueRotate.value = '0';
    applyFilters();
}

// Actions à exécuter après le chargement de la page
window.onload = function() {
    download.style.display = 'none';
    reset.style.display = 'none';
    imgBox.style.display = 'none';
    upphoto.style.display = 'block';
}

// Action à exécuter lors du changement de fichier
upload.onchange = function() {
    resetValues();
    upphoto.style.display = 'none' ;
    download.style.display = 'block';
    reset.style.display = 'block';
    imgBox.style.display = 'block';
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function() { 
        img.src = file.result;
    }
    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        applyFilters();
        img.style.display = 'none';
    }
}

// Appliquer les filtres
function applyFilters() {
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value}%)
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Action à exécuter lors du changement des valeurs des filtres
let filters = document.querySelectorAll("ul li input");
filters.forEach(filter => {
    filter.addEventListener('input', function() {
        applyFilters();
    });
});

// Action à exécuter lors du clic sur le bouton de téléchargement
download.onclick = function() {
    download.href = canvas.toDataURL();
}

// Action à exécuter lors du clic sur le bouton de réinitialisation
reset.onclick = function() {
    resetValues();
};
