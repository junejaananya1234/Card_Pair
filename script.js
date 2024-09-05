let cardsArray = [
    { 'name': 'Grape', 'img': '🍇' },
    { 'name': 'Watermelon', 'img': '🍉' },
    { 'name': 'Car', 'img': '🚗' },
    { 'name': 'Apple', 'img': '🍎' },
    { 'name': 'Ball', 'img': '🏀' },
    { 'name': 'Dog', 'img': '🐶' }
];

let attempts = 0; 
let clickCount = 0;
let firstCard = "";
let secondCard = "";
let firstCardElement, secondCardElement;
const parentDiv = document.querySelector("#card-section"); 
const gameCard = cardsArray.concat(cardsArray);
let shuffledChild = Array.from(gameCard).sort(() => 0.5 - Math.random());

const updateAttempts = () => {
    document.querySelector("#attempts").textContent = `Attempts: ${attempts}`;
};

const restartGame = () => {
    attempts = 0;
    updateAttempts();
    resetGame();
    parentDiv.innerHTML = "";
    shuffledChild = Array.from(gameCard).sort(() => 0.5 - Math.random());
    createCards();
};

document.querySelector("#restart-btn").addEventListener("click", restartGame);

const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((curElem) => {
        curElem.classList.add('card_match');
    });
};

const resetGame = () => {
    firstCard = "";
    secondCard = "";
    clickCount = 0;
    let card_selected = document.querySelectorAll('.card_selected');
    card_selected.forEach((curElem) => {
        curElem.classList.remove('card_selected');
    });
};

parentDiv.addEventListener('click', (event) => {
    let curCard = event.target.closest(".card");

    if (!curCard || curCard.classList.contains("card_match")) return;

    clickCount++;
    attempts++; 
    updateAttempts(); 

    if (clickCount === 1) {
        firstCard = curCard.dataset.name;
        firstCardElement = curCard;
        curCard.classList.add('card_selected');
    } else if (clickCount === 2) {
        secondCard = curCard.dataset.name;
        secondCardElement = curCard;
        curCard.classList.add('card_selected');

        if (firstCard !== "" && secondCard !== "") {
            if (firstCard === secondCard) {
                setTimeout(() => {
                    card_matches();
                    resetGame();
                }, 1000);
            } else {
                setTimeout(() => {
                    resetGame();
                }, 1000);
            }
        }
    }
});

const createCards = () => {
    for (let i = 0; i < shuffledChild.length; i++) {
        const childDiv = document.createElement("div");
        childDiv.classList.add("card");
        childDiv.dataset.name = shuffledChild[i].name;

        const frontCard = document.createElement("div");
        frontCard.classList.add("front-card");
        const backCard = document.createElement("div");
        backCard.classList.add("back-card");
        backCard.textContent = shuffledChild[i].img;

        childDiv.appendChild(frontCard);
        childDiv.appendChild(backCard);
        parentDiv.appendChild(childDiv);
    }
};

createCards();
