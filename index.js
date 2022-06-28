function player(name,money){
    this.name = name;
    this.money = money;
}
let player1;
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
let mainGameButton = document.getElementById("main-game-button");
let newCardButton = document.getElementById("new-card-button");
let splitButton = document.getElementById("split-button");
let playerParagraph = document.getElementById("player-bank-display");
let input = document.getElementById("input");
let label = document.getElementById("label");
let playerCardsValues;
let dealerCardsValues;
let playerWager;

function start(){
    input.style.visibility = "visible";
    label.style.visibility = "visible";
    mainGameButton.textContent = "Submit";
    message.textContent = "hello! what's your name? (between 1 and 20 characters)";
    mainGameButton.onclick = submit;
}

function submit() {
    let name = input.value;
    if (name.length == 0 ) {
        message.textContent = "name can't be in blank";
    } else if (name.length > 20){
        message.textContent = "name too long";
    }else{
        player1 = new player(name, 1000);
        displayMoney();
        message.textContent = "insert your wager";
        label.textContent = "wager";
        mainGameButton.textContent = "start game";
        input.type = "number";
        mainGameButton.onclick = wager;
    }
}

function displayMoney() {
    playerParagraph.textContent = player1.name+"'s bank: $"+player1.money;
}

function wager() {
    playerWager = input.value;
    if (playerWager > player1.money) {
        message.textContent = "you can't wager more than you have in your bank";
    } else if (playerWager == 0) {
        message.textContent = "you need to insert a value";
    }else{
        label.style.visibility = "hidden";
        input.style.visibility = "hidden";
        startGame();
    }
}

function checkBlackjack(sumOfCards){
    if (sumOfCards === 21) {
        dealerSumedCards.style.visibility = "hidden";
        playing = false;
        displayDealer();
        displayPlayer();
        if (getSum(dealerCardsValues) == sumOfCards) {
        message.textContent = "Draw!"; 
        } else {
        message.textContent = "Blackjack! congrats! :D +$"+playerWager*1.5;
        player1.money = player1.money + playerWager*1.5;
        displayMoney();
        }
    } else {
        message.textContent ="wanna draw another card?";
    }
}

function isPlaying(playerSum){
    if (playerSum === 21) {
        playing = false;
        dealerTurn();
        checkWinner(getSum(dealerCardsValues),getSum(playerCardsValues), false);
    } else if (playerSum > 21) {
        playing = false;
        dealerSumedCards.style.visibility = "visible";
        displayDealer();
        message.textContent = "you lost! :( -$"+playerWager;
        player1.money = playe1.money - playerWager;
        displayMoney();
    }
}

function checkWinner(dealerSum, playerSum, isDoubled){
    if (playerSum == dealerSum) {
        message.textContent = "Draw!";
    } else if (playerSum < dealerSum) {
        if (isDoubled) {
            message.textContent = "you lost! :( -$" + playerWager*2;
            player1.money = player1.money - (playerWager*2);
        } else {
            message.textContent = "you lost! :( -$" + playerWager;
            player1.money = player1.money - playerWager;
        }
        displayMoney();
    } else{
        if (isDoubled) {
            message.textContent = "you won! congrats! :D +$" + playerWager*2;
            player1.money = player1.money + (playerWager*2);
        } else {
            message.textContent = "you won! congrats! :D +$" + playerWager;
            player1.money = player1.money + playerWager;
        }
        displayMoney();
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

function double() {
    if (playing) {
        playing = false;
        playerCardsValues.push(getCards());
        displayPlayer();
        dealerTurn();
        if (getSum(playerCardsValues) > 21) {
        message.textContent = "you lost! :C -$" +playerWager;
        player1.money = player1.money - (playerWager*2);
        displayMoney();
        } else if (getSum(dealerCardsValues) > 21) {
        message.textContent = "you won! :D +$"+ playerWager;
        player1.money = player1.money + (playerWager*2);
        displayMoney();
        }else{
        checkWinner(getSum(dealerCardsValues), getSum(playerCardsValues), true);}    
    } 
}

function hit(){
    mainGameButton.style.visibility = "hidden";
    splitButton.style.visibility = "hidden";
    if (getSum(playerCardsValues) < 21){
        playerCardsValues.push(getCards())
        game();
    }
}

function stand(){
    mainGameButton.style.visibility = "hidden";
    splitButton.style.visibility = "hidden";
    if (playing) {
        playing = false;
        dealerTurn();
        if (getSum(dealerCardsValues) <= 21) {
            checkWinner(getSum(dealerCardsValues),getSum(playerCardsValues), false);
        } else{
            message.textContent = "you won! :D +$" + playerWager;
            player1.money + playerWager;
        } 
    }
}

function startGame(){
    mainGameButton.textContent = "Double";
    mainGameButton.onclick = double;
    playerCards.style.visibility = "visible";
    playerSumedCards.style.visibility = "visible";
    dealerCards.style.visibility = "visible";
    newCardButton.style.visibility = "visible";
    standButton.style.visibility = "visible";
    splitButton.style.visibility = "visible";

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