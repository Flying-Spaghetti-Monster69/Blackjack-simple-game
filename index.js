function player(name,money){
    this.name = name;
    this.money = money;
}

let player1 = new player("felipe",1000);
let dealer = new player("goofy",10000);

let playing;
let message = document.getElementById("main-message");
let playerCards = document.getElementById("player-cards-paragraph");
let playerSumedCards = document.getElementById("player-sum-paragraph");
let dealerCards = document.getElementById("dealer-cards-paragraph");
let dealerSumedCards = document.getElementById("dealer-sum-paragraph");
let standButton = document.getElementById("stand-button");
let startGameButton = document.getElementById("start-game-button");
let newCardButton = document.getElementById("new-card-button");
let playerCardsValues = [];
let dealerCardsValues = [];

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
    if (getSum(playerCardsValues) < 21){
        playerCardsValues.push(getCards())
        Game();
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
    dealerSumedCards.style.visibility = "visible";
    newCardButton.style.visibility = "visible";
    standButton.style.visibility = "visible";
    playing = true;
    playerCardsValues.push(getCards());
    playerCardsValues.push(getCards());
    dealerCardsValues.push(getCards());
    dealerCardsValues.push(getCards());
    Game();
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
        cardsDisplay.textContent += cardsValues[i];
        if(i == cardsValues.length-1){
            break;
        }else{
            cardsDisplay.textContent += ", "
        }
        
    }
}

function Game() {
    if (playing){
        displayCards(player1.name, playerCards, playerCardsValues)
        displayCards(dealer.name, dealerCards, dealerCardsValues)
        displaySums(getSum(playerCardsValues),player1.name,playerSumedCards);
        displaySums(getSum(dealerCardsValues),dealer.name,dealerSumedCards);
        checkBlackjack(getSum(playerCardsValues));
    }  
}