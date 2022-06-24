let playing = true;
let message = document.getElementById("main-message");
let cards

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


function startGame() {
    playing = true;
    let firstCard = Math.floor(Math.random() * 10) + 2;
    let secondCard = Math.floor(Math.random() * 10) + 2;
    firstCard
    console.log(secondCard)
    
    checkBlackjack(secondCard + firstCard);
    
}