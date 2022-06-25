function player(name,money){
    this.name = name;
    this.money = money;
}

let player1 = new player("felipe",1000);
let dealer = new player("goofy",10000);

let A = {
    name: "A",
    highValue: 11,
    lowValue:1
}

let playing;
let message = document.getElementById("main-message");
let playerCards = document.getElementById("player-cards-paragraph");
let playerSumedCards = document.getElementById("player-sum-paragraph");
let dealerCards = document.getElementById("dealer-cards-paragraph");
let dealerSumedCards = document.getElementById("dealer-sum-paragraph");
let standButton = document.getElementById("stand-button");
let startGameButton = document.getElementById("start-game-button");
let newCardButton = document.getElementById("new-card-button");
let playerCardsValues;
let dealerCardsValues;

function checkBlackjack(sumOfCards){
    if (sumOfCards === 21) {
    message.textContent ="you got blackjack!";
    playing = false;
    dealerTurn();
    } else if (sumOfCards < 21) {
    message.textContent ="wanna draw another card?";
    } else {
    message.textContent = "you lost!";
    playing = false;
    dealerTurn();
}

}

function dealerTurn(){

}

function getCards(){
    card = Math.floor(Math.random() * 10) + 2;
    if (card == 11) {
        return A;
    } else{
        return card;
    }
}

function hit(){
    if (getSum(playerCardsValues) < 21){
        playerCardsValues.push(getCards())
        display();
    }
}

function stand(){
    console.log("I stand still!!")
}

function startGame(){
    startGameButton.textContent = "double";
    startGameButton.style.visibility = "hidden";
    playerCards.style.visibility = "visible";
    playerSumedCards.style.visibility = "visible";
    dealerCards.style.visibility = "visible";
    newCardButton.style.visibility = "visible";
    standButton.style.visibility = "visible";

    playing = true;
    playerCardsValues = [];
    dealerCardsValues = [];

    playerCardsValues.push(getCards());
    playerCardsValues.push(getCards());
    dealerCardsValues.push(getCards());
    dealerCardsValues.push(getCards());

    dealerCards.textContent = dealer.name + " up card: " + dealerCardsValues[0]; 

    display();
}

function getSum(cardsValues){
    let sum = 0;
    for (let index = 0; index < cardsValues.length; index++) {
        sum = sum + cardsValues[index];
    }
    return sum;
}

function displaySums(sum, name, sumDisplay){
    sumDisplay.textContent = name + " sum: " + sum;
}

function displayCards(playerDisplay, cardsDisplay, cardsValues){
    cardsDisplay.textContent = playerDisplay + " cards: ";
    for (i = 0; i < cardsValues.length; i++){
        if (typeof cardsValues[i] == "object") {
            cardsDisplay.textContent += cardsValues[i].name;
        }else{
            cardsDisplay.textContent += cardsValues[i];
        }
        
        if(i == cardsValues.length-1){
            break;
        }else{
            cardsDisplay.textContent += ", "
        }
        
    }
}

function display() {
    if (playing){
        displayCards(player1.name, playerCards, playerCardsValues)
        displaySums(getSum(playerCardsValues),player1.name,playerSumedCards);
        checkBlackjack(getSum(playerCardsValues));
    }  
}