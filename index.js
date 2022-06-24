let playing = true;
let message = document.getElementById("main-message");
let cards = document.getElementById("cards-paragraph");
let sumedCards = document.getElementById("sum-paragraph");
let startGameButton = document.getElementById("start-game-button")
let newCardButton = document.getElementById("start-game-button")

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

function newCard(){
    console.log("drawing new card from the deck")
}

function getCards(){
    return Math.floor(Math.random() * 10) + 2;
}

function startGame() {
    startGameButton.textContent = "Restart Game";
    cards.style.visibility = "visible";
    sumedCards.style.visibility = "visible";
    playing = true;
    let firstCard = getCards();
    cards.textContent = "cards: " + firstCard;
    let secondCard = getCards();
    cards.textContent += ", " + secondCard;
    let sumOfCards = firstCard + secondCard
    sumedCards.textContent = "sum: " + sumOfCards;
    
    checkBlackjack(sumOfCards);
    
}