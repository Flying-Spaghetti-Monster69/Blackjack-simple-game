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
    playing = false;
    displayDealer();
    displayPlayer();
        if (getSum(dealerCardsValues) == sumOfCards) {
        message.textContent = "Draw!"; 
        } else {
        
        message.textContent = "Blackjack! congrats! :D";
        }
    } else {
        message.textContent ="wanna draw another card?";
    }
}

function isPlaying(playerSum){
    if (playerSum === 21) {
        playing = false;
        dealerTurn();
        checkWinner(getSum(dealerCardsValues),getSum(playerCardsValues));
    } else if (playerSum > 21) {
        playing = false;
        displayDealer();
        message.textContent = "you lost! :(";
    }
}

function checkWinner(dealerSum, playerSum){
    if (playerSum == dealerSum) {
        message.textContent = "Draw!";
    } else if (playerSum < dealerSum) {
        message.textContent = "you lost! :(";
    } else{
        message.textContent = "you won! congrats! :D"
    }
}


function displayDealer(){
    displayCards(dealer.name, dealerCards, dealerCardsValues);
    displaySums(getSum(dealerCardsValues),dealer.name,dealerSumedCards)
}
function displayPlayer(){
    displayCards(player1.name, playerCards, playerCardsValues)
    displaySums(getSum(playerCardsValues),player1.name,playerSumedCards);
}

function dealerTurn(){
    dealerSumedCards.style.visibility = "visible";
    while (getSum(dealerCardsValues) < 17){
        dealerCardsValues.push(getCards());
    }
    displayDealer();
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
        game();
    }
}

function stand(){
    if (playing) {
        playing = false;
        dealerTurn();
        if (getSum(dealerCardsValues) <= 21) {
            checkWinner(getSum(dealerCardsValues),getSum(playerCardsValues));
        } else{
            message.textContent = "you won! :D"
        } 
    }
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

    if (typeof dealerCardsValues[0] == "object") {
        dealerCards.textContent = dealer.name + " up card: " + dealerCardsValues[0].name;
    } else {
        dealerCards.textContent = dealer.name + " up card: " + dealerCardsValues[0];
    }
    checkBlackjack(getSum(playerCardsValues));

    game();
}

function getSum(cardsValues){
    let sum = 0;
    const objectsArray = cardsValues.filter(object => { return typeof object == "object"});
    const numbersArray = cardsValues.filter(numbers => { return typeof numbers == "number"});
    for (let index = 0; index < numbersArray.length; index++) {
        sum += numbersArray[index];
    }
    for(let i = 0; i < objectsArray.length; i++){
        if (sum + objectsArray[i].highValue <= 21){
            sum += objectsArray[i].highValue; 
        }else{
            sum += objectsArray[i].lowValue;
        }
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

function game() {
    if (playing){
        displayPlayer();
        isPlaying(getSum(playerCardsValues));
    }  
}