document.getElementById('bonusFamily1').classList.add('hidden');
document.getElementById('bonusFamily2').classList.add('hidden');
document.getElementById('bonusFamily3').classList.add('hidden');
document.getElementById('bonusFamily4').classList.add('hidden');
document.getElementById('bonusFamily5').classList.add('hidden');
document.getElementById('bonusFamily6').classList.add('hidden');
document.getElementById('bonusFamily7').classList.add('hidden');
document.getElementById('BonusCards').classList.add('hidden');
document.getElementById('codeInput').classList.add('hidden');
document.getElementById('errorContain').classList.add('hidden');
document.getElementById('inputContain').classList.add('hidden');

// Afficher titre section
let titleSection = document.getElementById('title_Home').innerText = 'Choose your Familly';


const familyBonusMapping = {
    'family1': 'bonusFamily1',
    'family2': 'bonusFamily2',
    'family3': 'bonusFamily3',
    'family4': 'bonusFamily4',
    'family5': 'bonusFamily5',
    'family6': 'bonusFamily6',
    'family7': 'bonusFamily7'
};

function showCodeInput(cardId, correctCode) {
    document.getElementById('inputContain').classList.remove('hidden');
    document.getElementById('inputContain').classList.add('flex');
    // Masquer les cartes et afficher le champ de texte
    document.getElementById('cardsContainer').classList.add('hidden');
    document.getElementById('codeInput').classList.remove('hidden');
    document.getElementById('codeInput').classList.add('show');
    titleSection = document.getElementById('title_Home').innerText = 'Enter The Code of your Family';
   
    // Stocker les informations de la carte sélectionnée dans les attributs data
    document.getElementById('codeInput').setAttribute('data-card-id', cardId);
    document.getElementById('codeInput').setAttribute('data-correct-code', correctCode);
}

function compareCode () {
    // Récupérer les informations de la carte sélectionnée
    const cardId = document.getElementById('codeInput').getAttribute('data-card-id');
    const correctCode = document.getElementById('codeInput').getAttribute('data-correct-code');

    // Récupérer le code saisi par l'utilisateur
    const userCode = document.getElementById('code').value;

    let comparedCode = '';

    if (correctCode.length === userCode.length) {
        for (let i = 0; i < correctCode.length; i++) {
            if (correctCode[i] === userCode[i]) {
                comparedCode += '<span class="correct">' + userCode[i] + '</span>';
            } else {
                comparedCode += '<span class="incorrect">' + userCode[i] + '</span>';
            }
        }
    } else if (correctCode.length > userCode.length) {
        comparedCode = '<p class="incorrect">It\'s too short</p>';
    } else {
        comparedCode = '<p class="incorrect">It\'s too big</p>';
    }
    
    return comparedCode;
}

function checkCode() {
    // Récupérer les informations de la carte sélectionnée
    const cardId = document.getElementById('codeInput').getAttribute('data-card-id');
    const correctCode = document.getElementById('codeInput').getAttribute('data-correct-code');
    // Récupérer le code saisi par l'utilisateur
    const userCode = document.getElementById('code').value;

    // Vérifier si le code est correct
    if (userCode === correctCode) {
        // Afficher une nouvelle carte avec une nouvelle couleur
        document.getElementById(cardId).style.backgroundColor = getRandomColor();

        titleSection = document.getElementById('title_Home').innerHTML = 'Here\'s your last card <br /> <span>place it in the right spot on the board!</span>';
        
        // Afficher la carte bonus correspondante
        document.getElementById('BonusCards').classList.remove('hidden');
        const bonusCardId = familyBonusMapping[cardId];
        console.log(bonusCardId);
        document.getElementById(bonusCardId).classList.remove('hidden');

        // Réinitialiser le champ de texte
        document.getElementById('code').value = '';

        // Masquer le champ de texte
        document.getElementById('codeInput').style.display = 'none';

        // Afficher les cartes
        document.getElementById('cardsContainer').style.display = 'flex';

        // Masquer les cartes Famille
        document.getElementById('familyCards').style.display = 'none';

        document.getElementById('gallery-controls').style.display = 'none';


    } else {
        // Masquer le champ de texte
        document.getElementById('inputContain').classList.add('hidden');
        
        document.getElementById('errorContain').classList.remove('hidden');
        document.getElementById('errorContain').classList.add('show');

        resultCompare = compareCode ();
        document.getElementById('compare').innerHTML = resultCompare;
        
        // Afficher un message d'erreur et réafficher les cartes
        document.getElementById('errorMessage').innerText = 'Code incorrect';

        setTimeout(() => {
            // Masquer les messages d'erreurs
            document.getElementById('errorMessage').innerText = '';
            document.getElementById('compare').innerHTML = '';
            document.getElementById('code').value = '';

            document.getElementById('cardsContainer').classList.remove('hidden');
            document.getElementById('inputContain').classList.remove('flex');
            titleSection = document.getElementById('title_Home').innerText = 'Choose your Familly';
        }, 5000);
    }
}


function getRandomColor() {
    console.log("Color");
    // Générer une couleur aléatoire
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}


const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
    constructor(container, items, controls) {
        this.carouselContainer = container;
        this.carouselControls = controls;
        this.carouselArray = [...items];
    }

    updateGallery() {
        this.carouselArray.forEach(el => {
            el.classList.remove('gallery-item-1');
            el.classList.remove('gallery-item-2');
            el.classList.remove('gallery-item-3');
            el.classList.remove('gallery-item-4');
            el.classList.remove('gallery-item-5');
            el.classList.remove('gallery-item-6');
        });

        this.carouselArray.slice(0, 5).forEach((el, i) => {
            el.classList.add(`gallery-item-${i+1}`)
        })  
    }

    setCurrentState(direction) {
        if (direction.className == 'gallery-controls-previous') {
            this.carouselArray.unshift(this.carouselArray.pop());
        } else {
            this.carouselArray.push(this.carouselArray.shift());
        }
        this.updateGallery();
    }

    setControls() {
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerText = control;
        })
    }

    useControls() {
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.setCurrentState(control);
            });
        });
    }
}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.useControls();