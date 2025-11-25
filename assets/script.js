// ========================================
// DONNÉES DU CARROUSEL
// ========================================

// Tableau contenant toutes les informations des 4 slides
const slides = [
	{
		"image":"./assets/images/slideshow/slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"./assets/images/slideshow/slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"./assets/images/slideshow/slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"./assets/images/slideshow/slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

// ========================================
// PRÉCHARGEMENT DES IMAGES
// ========================================

// Fonction pour précharger toutes les images du carrousel
function preloadImages() {
    // Pour chaque slide du tableau
    slides.forEach(slide => {
        // Crée un nouvel objet Image en mémoire
        const img = new Image();
        // Charge l'image en mémoire (sans l'afficher)
        img.src = slide.image;
    });
}

// Lance le préchargement dès que le script est chargé
preloadImages();

// ========================================
// VARIABLES GLOBALES
// ========================================

// Variable qui stocke l'index du slide actuellement affiché (on commence à 0 = slide 1)
let currentIndex = 0;

// ========================================
// SÉLECTION DES ÉLÉMENTS HTML
// ========================================

// Récupère l'élément <img> de la bannière pour pouvoir changer son src
const bannerImg = document.querySelector('.banner-img');

// Récupère l'élément <p> qui contient le texte de la bannière
const bannerText = document.querySelector('#banner p');

// Récupère la flèche gauche pour y ajouter un écouteur d'événement
const arrowLeft = document.querySelector('.arrow_left');

// Récupère la flèche droite pour y ajouter un écouteur d'événement
const arrowRight = document.querySelector('.arrow_right');

// Récupère le conteneur des dots (bullet points) pour y ajouter les points
const dotsContainer = document.querySelector('.dots');

// ========================================
// FONCTION : CRÉATION DES BULLET POINTS
// ========================================

function createDots() {
    // Boucle qui tourne autant de fois qu'il y a de slides (ici 4 fois)
    for (let i = 0; i < slides.length; i++) {
        
        // Crée un nouvel élément <div> pour chaque bullet point
        const dot = document.createElement('div');
        
        // Ajoute la classe CSS "dot" au bullet point
        dot.classList.add('dot');
        
        // Si c'est le premier dot (index 0), on lui ajoute la classe "dot_selected"
        if (i === 0) {
            dot.classList.add('dot_selected');
        }
        
        // Ajoute un écouteur d'événement sur chaque dot
        dot.addEventListener('click', () => {
            // Change l'index du slide actuel pour correspondre au dot cliqué
            currentIndex = i;
            // Met à jour l'affichage du carrousel
            updateCarousel();
        });
        
        // Ajoute le dot créé à l'intérieur du conteneur .dots dans le HTML
        dotsContainer.appendChild(dot);
    }
}

// ========================================
// FONCTION : MISE À JOUR DU CARROUSEL
// ========================================

function updateCarousel() {
    
    // Change l'attribut src de l'image pour afficher le slide correspondant à currentIndex
    bannerImg.src = slides[currentIndex].image;
    
    // Change le contenu HTML du paragraphe avec le texte du slide actuel
    bannerText.innerHTML = slides[currentIndex].tagLine;
    
    // Récupère tous les dots dans le DOM (les 4 bullet points)
    const dots = document.querySelectorAll('.dot');
    
    // Parcourt chaque dot pour mettre à jour leur apparence
    dots.forEach((dot, index) => {
        
        // Si l'index du dot correspond au slide actuel
        if (index === currentIndex) {
            // Ajoute la classe "dot_selected" pour le mettre en surbrillance
            dot.classList.add('dot_selected');
        } else {
            // Sinon, retire la classe "dot_selected" pour le désactiver visuellement
            dot.classList.remove('dot_selected');
        }
    });
}

// ========================================
// FONCTION : NAVIGATION SLIDE PRÉCÉDENT
// ========================================

function prevSlide() {
    
    // Diminue l'index du slide actuel de 1 (on recule d'un slide)
    currentIndex--;
    
    // Si l'index devient négatif (on est avant le premier slide)
    if (currentIndex < 0) {
        // On revient au dernier slide (boucle infinie)
        currentIndex = slides.length - 1;
    }
    
    // Appelle la fonction pour mettre à jour l'affichage du carrousel
    updateCarousel();
}

// ========================================
// FONCTION : NAVIGATION SLIDE SUIVANT
// ========================================

function nextSlide() {
    
    // Augmente l'index du slide actuel de 1 (on avance d'un slide)
    currentIndex++;
    
    // Si l'index dépasse le nombre de slides (on est après le dernier slide)
    if (currentIndex >= slides.length) {
        // On revient au premier slide (index 0) pour créer une boucle infinie
        currentIndex = 0;
    }
    
    // Appelle la fonction pour mettre à jour l'affichage du carrousel
    updateCarousel();
}

// ========================================
// ÉCOUTEURS D'ÉVÉNEMENTS
// ========================================

// Quand on clique sur la flèche gauche, on appelle la fonction prevSlide()
arrowLeft.addEventListener('click', prevSlide);

// Quand on clique sur la flèche droite, on appelle la fonction nextSlide()
arrowRight.addEventListener('click', nextSlide);

// ========================================
// INITIALISATION DU CARROUSEL
// ========================================

// Au chargement de la page, on crée les 4 bullet points
createDots();