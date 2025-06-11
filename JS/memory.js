const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

const items = [
    {name:"baby", image:"baby.jpg"},
    {name:"bluedragon", image: "bluedragon.jpg"},
    {name:"browndragon", image: "browndragon.jpg" },
    {name:"chinese", image: "chinese.jpg" },
    {name:"firedragon", image: "firedragon.jpg" },
    {name:"flyingdragon", image: "flyingdragon.jpg" },
    {name:"horneddragon", image: "horneddragon.jpg" },
    {name:"mountaindragon", image: "mountaindragon.jpg" },
    {name:"dream", image:"dream.jpg"},
    {name:"talldragon", image:"talldragon.jpg"},
    {name:"fighter", image:"fighter.jpg"},
    {name:"starsdragon", image:"starsdragon.jpg"}
];


let seconds = 0,
    minutes = 0;
let movesCount = 0,
    winCount = 0;
// ************ next for timer******************************

const timeGenerator = () => {
    seconds += 1;
    if(seconds>= 60) {
        minutes += 1;
        seconds = 0;
    }
    let secondsValue = seconds < 10 ? `0${seconds}`:
    seconds;
    let minutesValue = minutes < 10 ? `0${minutes}`:minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
} ;   

// ********************to calculate number of moves***********************************

const movesCounter = () =>{
    movesCount += 1;
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

// ********************Randomize Cards******************************************

const generateRandom = (size = 4) => {
    let tempArray = [...items];
    let cardValues = [];
    size = (size * size) / 2;     //to double images 4*4 matrix(/2 pairs)
    for (let i = 0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);    //select one
        tempArray.splice(randomIndex, 1);          //remove afterwards
        }
    return cardValues;
};
// *************************************************************************
    //data-card-value store the cards to match later line 78
    // card before front crd w/? (see line 75)
    //card after image crd(see line 76)

const matrixGenerator = (cardValues, size = 4) =>{     //line 65
    gameContainer.innerHTML = "";
    cardValues = [... cardValues, ... cardValues];
    cardValues.sort(() => Math.random()- 0.5);
    for (let i=0; i< size * size; i++){
      gameContainer.innerHTML += `
        <div class="card-container" data-card-value="${cardValues[i].name}">
         <div class="card-before">?</div>      
         <div class="card-after">
            <img src="${cardValues[i].image}" class="image"/>
         </div>
        </div>
      `;
    }
    gameContainer.style.gridTemplateColumns =`repeat(${size}, auto)`;
    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) =>{
        card.addEventListener("click", () =>{
            if(!card.classList.contains("matched")){    //if not matched then run
            card.classList.add("flipped");              //flip crd
            if(!firstCard){                             //1st crd =false
               firstCard = card;                        //now 1st crd is current Crd
               firstCardValue = card.getAttribute("data-card-value");   //store crd
            }  else{
            movesCounter();                     //Line48
            secondCard = card;                          //now 2nd cr is current crd
            let secondCardValue =card.getAttribute("data-card-value");   //store to ck
            if (firstCardValue == secondCardValue){                     //condition
                firstCard.classList.add("matched");           //add matched class
                secondCard.classList.add("matched");         //so ignored next time  
                firstCard = false;                          //now next crd = 1st crd
                winCount += 1;                              //match count increases
                if(winCount == Math.floor(cardValues.length/2)) {     //half means all 
                    result.innerHTML = `<h2>You Won!</h2><h4>Moves:${movesCount}</h4>`;
                    stopGame();
                }
            }else{                                  //if do not match
               let [tempFirst, tempSecond] = [firstCard, secondCard];
               firstCard = false;
               secondCard = false; 
            let delay = setTimeout(() => {
                tempFirst.classList.remove("flipped");  //so back in list/flipped back
                tempSecond.classList.remove("flipped");
            } ,900);
           }
          }
         }
      });
    });
};

startButton.addEventListener("click", () =>{
    movesCount = 0;
    time = 0;
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timeGenerator,1000);     //Line 35
    moves.innerHTML = `<span>Moves:</span>${movesCount}`;
    initializer();
});
stopButton.addEventListener("click", (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
}))

// function call

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    matrixGenerator(cardValues);
  };

