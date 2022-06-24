let playing = true;
let message = document.getElementById("main-message");
let cards = document.getElementById("cards-paragraph");
let sumedCards = document.getElementById("sum-paragraph");
let standButton = document.getElementById("stand-button");
let startGameButton = document.getElementById("start-game-button")
let newCardButton = document.getElementById("new-card-button")

function checkBlackjack(sumOfCards){
    if (sumOfCards === 21) {
    message.textContent ="you got blackjack!";
    playing = false;
    } else if (sumOfCards < 21) {
    message.textContent ="wanna draw another card?";
    } else {
    message.textContent = "you lost!";
    playing = false;}
}

function getCards(){
    return Math.floor(Math.random() * 10) + 2;
}

function hit(){
    
}

function stand(){
    console.log("I stand still!!")
}



function startGame(){
    startGameButton.textContent = "Restart Game";
    cards.style.visibility = "visible";
    sumedCards.style.visibility = "visible";
    newCardButton.style.visibility = "visible";
    standButton.style.visibility = "visible";
    playing = true;
    Game();
}

function Game() {
    let playerCards = []; 
    playerCards[0] = getCards();
    cards.textContent = "your cards: " + playerCards[0];
    playerCards[1] = getCards();
    cards.textContent += ", " + playerCards[1];
    let sumOfCards = playerCards[0] + playerCards[1];
    sumedCards.textContent = "your sum: " + sumOfCards;
    
    checkBlackjack(sumOfCards);
    
}