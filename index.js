let playing = true;
let message = document.getElementById("main-message");
let cards = document.getElementById("cards-paragraph");
let sumedCards = document.getElementById("sum-paragraph");

function checkBlackjack(sumOfCards){
    
    console.log(sumOfCards)
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

function startGame() {
    playing = true;
    let firstCard = getCards();
    let secondCard = getCards();
    cards.textContent += firstCard + ", " + secondCard;
    sumedCards.textContent += firstCard + secondCard;
    
    checkBlackjack(secondCard + firstCard);
    
}