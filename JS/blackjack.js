// variables
let dealerSum = 0;
let playerSum = 0;
let dealerAces = 0;
let playerAces = 0;
let facedown;
let deck;
let hitYes =true;
// ^allows new card if <21
// when window opens functions are called// 
window.onload = function(){
    makeDeck();
    shuffleDeck();
    getStarted();
}
function makeDeck(){
    let values = ["A","Q","K","J","2","3","4","5","6","7","8","9","10"];
    let suites = ["C", "D", "S","H"]; 
    deck = [];  
    for (let i=0; i<suites.length; i++){
        for (let j=0; j<values.length; j++){
        deck.push(values[j] + "-" + suites[i]);
        } 
    } 
}
function shuffleDeck(){ 
    for (let i=0; i<deck.length; i++){
        const j = Math.floor(Math.random()* deck.length);
        let temp = deck[i];
        deck[i] = deck[j]
        deck[j] = temp;
    }   
}
function getStarted(){
    facedown = deck.pop();      //takes one card to be facedown
    dealerSum += cardValue(facedown);
    dealerAces += isAce(facedown);
    while (dealerSum < 17 ) {                             //keeps dealers card less than 17 on initial
        let cardImg = document.createElement("img");    //creates crd img
        let card = deck.pop();                          //one crd from deck
        cardImg.src = "./images/cards/" + card + ".png";      //adds image to value by src   
        dealerSum += cardValue(card);                   //add value of crd
        dealerAces += isAce(card);                      //ck ace add to total
        document.getElementById("dealerCards").append(cardImg); 
        }
    for (let i=0; i<2; i++){        //allows 2 cards to start
        let cardImg = document.createElement("img");    
        let card = deck.pop();              //pull a card from deck
        cardImg.src = "./images/cards/" + card + ".png";  //how to put images w/values
        playerSum += cardValue(card);     //adds to sum with each card
        playerAces += isAce(card);      //checks for Aces
        document.getElementById("playerCards").append(cardImg); //add image to player cards
    }
    document.getElementById("hit").addEventListener("click", hit);  //when clicked get new card
    document.getElementById("stay").addEventListener("click", stay);    //stop game and add score
}

function hit(){
    if (!hitYes){
        return;
    } 
        let cardImg = document.createElement("img");    //get image for new crd
        let card = deck.pop();
        cardImg.src = "./images/cards/" + card + ".png";   //combines value and img
        playerSum += cardValue(card);               //add value of new crd
        playerAces += isAce(card);                  //add value of Ace
        document.getElementById("playerCards").append(cardImg);
    if(reduceAce(playerSum, playerAces) > 21){  //goal to not go over 21
            hitYes = false;         //stops new cards from coming
    }
}
function cardValue(card){
    let data = card.split("-");     //slits card so value is separated out
    let value = data[0];
    if (isNaN(value)){          //ck for KQJA
        if(value == "A"){       //deals with A's before hitting 21
        return 11;
        }
        return 10;              //KQJ all equal 10
    }
    return parseInt(value);     //returns value of crd number since separated
}
function isAce(card){
    if(card[0] == "A"){
        return 1;
    }  
     return 0;
}

function reduceAce(playerSum, playerAces){  //deals with A's being either 1 or 11
    while(playerSum > 21 && playerAces > 0){        //conditions
        playerSum -= 10;
        playerAces -= 1;
    }
    return playerSum;
}

function stay(){           //stay button clicked stops and totals amt
    dealerSum = reduceAce(dealerSum, dealerAces);
    playerSum = reduceAce(playerSum, playerAces);
    hitYes = false;
    document.getElementById("facedown").src = "./images/cards/" + facedown + ".png";
    let message = "";               //gives multiple messages for diff totals
    if (playerSum > 21){
        message = "You Lose!";
    }
    else if (dealerSum > 21){
        message = "You Win!";
    }else if (playerSum == dealerSum){
        message = "tie!";
    }
    else if (playerSum > dealerSum){
        message = "You Win!";
    }else if (playerSum < dealerSum){
        message = "You lose!";
    }
    document.getElementById("dealerSum").innerText = dealerSum; //reveals final amt.
    document.getElementById("playerSum").innerText = playerSum; //reveals final amt.
    document.getElementById("win").innerText = message;   //tells who won at top
    }

    




   

