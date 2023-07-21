const button = document.querySelectorAll(".btn");
const boxes = document.querySelectorAll(".square")

const sectionOne = document.getElementById("section-1");
const sectionTwo = document.getElementById("section-2");
const sectionThree = document.getElementById("section-3");
const sectionFour = document.getElementById("section-4");

const secPageIconX = document.querySelector(".x-icon-2");
const secPageIconO = document.querySelector(".o-icon-2");
const xPlayer = document.querySelector(".x-player");
const oPlayer = document.querySelector(".o-player");
const ties = document.querySelector(".ties");
const xIcon = document.querySelectorAll(".icon-x");
const oIcon = document.querySelectorAll(".icon-o");
const winnerMark = document.querySelector(".winner");
const quit = document.querySelector(".quit");
const nextRound = document.querySelector(".next-round");
const yesRestart = document.querySelector(".yes");

const winSms = document.querySelector(".winningSms");
const win = document.querySelector(".win");
const xScoreElement = document.querySelector(".x-score");
const oScoreElement = document.querySelector(".o-score");
const tieScoreElement = document.querySelector(".ties-score");

const xHover = document.querySelector(".xHover");
const oHover = document.querySelector(".oHover");
const board = document.getElementById("main");

let xScores = 0;
let oScores = 0;
let tieScores = 0;

let playerMark = "x";
let player;
let myTurn = true;

let gameState = [0,1,2,3,4,5,6,7,8];
let markIndicator = [];
const randomIndex = Math.floor(Math.random() * gameState.length);
let count = 0;

const winnerCombination = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];
let xWinner = [];
let oWinner = [];
  /* -- functions below check whether a particular mark has won or not -- */

   const CheckXwin= () => {
    return winnerCombination.some((combination) => {
      return combination.every(elem => {
        return xWinner.includes(elem);

      });
    });
    
   }

   const CheckOwin = () => {
    return winnerCombination.some((combination) => {
      return combination.every(elem => {
        return oWinner.includes(elem);
       
      });
    });
  }

  /*--  functions below define what to do if particular mark wins --*/
  let onWinX = () => {
    xScores++;
    xScoreElement.textContent = xScores;
    
    sectionThree.style.display = "flex";
    winnerMark.src = "assets/icon-x-small.svg";
    winnerMark.style.display = "flex";

     if(player === "player"){
        win.innerHTML = "PLAYER 1 WINS";
        winSms.innerHTML = "TAKES THE ROUND";
  }else if(player === "cpu" && playerMark === "x"){
        win.innerHTML = "YOU WON!";
        winSms.innerHTML = "TAKES THE ROUND";
  }else if(player === "cpu" && playerMark == "o"){
        win.innerHTML = "YOU LOST!";
        winSms.innerHTML = "TAKES THE ROUND";
  } 
}

let onWinO = ()=>{
  oScores++;
  oScoreElement.textContent = oScores;
    
  sectionThree.style.display = "flex";
  winnerMark.src = "assets/icon-o-small.svg";
  winnerMark.style.display = "flex";

   if(player === "player"){
      win.innerHTML = "PLAYER 2 WINS";
      winSms.innerHTML = "TAKES THE ROUND";
}else if(player === "cpu" && playerMark === "x"){
      win.innerHTML = "YOU LOST!";
      winSms.innerHTML = "TAKES THE ROUND";
}else if(player === "cpu" && playerMark == "o"){
      win.innerHTML = "YOU WON!";
      winSms.innerHTML = "TAKES THE ROUND";
}
  
}

function winner() {
  const winX = CheckXwin();
  const winO = CheckOwin();
  myTurn = true;
  
  setTimeout(()=>{
    if(winX){
      onWinX();
      if(boxes[markIndicator[0]].classList.contains("x-active")){
        playerMark = "x";
      }else{
        playerMark = "o";
      }
      return;

    }
    else if(winO){
      onWinO();
      if(boxes[markIndicator[0]].classList.contains("o-active")){
        playerMark = "o";
      }else{
        playerMark = "x";
      }
      return;
     }else if(xWinner.length === 5 || oWinner.length === 5){
        tieScores++;
        tieScoreElement.innerHTML = tieScores.toString();
  
        sectionThree.style.display = "flex";
        winnerMark.style.display= "none";
        winSms.innerHTML = "ROUND TIES";
        win.style.display = "none";
        if(boxes[markIndicator[0]].classList.contains("o-active")){
          playerMark = "o";
        }else{
          playerMark = "x";
        }
        return;
      
    }
  }, 100);
  }

Restart();
startGame();

function startGame(){
  boxes.forEach((button, index) => {
    button.classList.remove("x-active");
    button.classList.remove("o-active");
    button.classList.remove("oHover");
    button.classList.remove("xHover");

    button.addEventListener("click", (elem)=>{
      let cell = elem.target;
      if(!cell.classList.contains("x-active") && !cell.classList.contains("o-active")){

        if(playerMark === 'x' && player === "player"){
          cell.classList.add("x-active");
          xWinner.push(index);
          markIndicator.push(index);
          gameState = gameState.filter(elem => elem !== index);
          playerMark = "o";
         
          
        }else if(playerMark === 'o' && player === "player"){
          cell.classList.add("o-active");
          oWinner.push(index);
          markIndicator.push(index);
          gameState = gameState.filter(elem => elem !== index);
          playerMark = "x";
         
    
        }else if(playerMark === 'x' && player === "cpu" && myTurn === true){
            
            cell.classList.add("x-active");
            gameState = gameState.filter(elem => elem !== index);
            xWinner.push(index);
            markIndicator.push(index);
            myTurn = !true;
            if(CheckXwin() === false){
            randomO();
            }else{
              myTurn = true;
            }

        }else if(playerMark === 'o' && player === "cpu" && myTurn === true) {
         
          cell.classList.add("o-active");
          gameState = gameState.filter(elem => elem !== index);
          oWinner.push(index);
          markIndicator.push(index);
          myTurn = !true;
          if(CheckOwin() === false){
          randomX();
          }else{
            myTurn = true;
          }
        }
      }
      winner();
    });
    HoverEffect();
})
}


/*-- this functions below make the random x/o mark -- */

function randomO(){
 
  setTimeout(()=>{
    if(gameState.length > 0){
      const randomIndex = Math.floor(Math.random() * gameState.length);
      const randomNum = gameState[randomIndex];
      boxes[randomNum].classList.add("o-active");
      oWinner.push(randomNum);
      gameState = gameState.filter(elem => elem !== randomNum);
      myTurn = true;
      console.log(oWinner);
      winner();
    }
   
  }, 300)
  
}

function randomX(){
  
  setTimeout(()=>{    
    if(gameState.length > 0){
      const randomIndex = Math.floor(Math.random() * gameState.length);
      const randomNum = gameState[randomIndex];
      boxes[randomNum].classList.add("x-active");
      xWinner.push(randomNum);
      gameState = gameState.filter(elem => elem !== randomNum);
      myTurn = true;
      console.log(xWinner);
      winner();
    }
    
  }, 300)

}

/* -- this function below defines the activation mode of the first page icons -- */

    function changeBtn (elem){
      if(elem === 'x'){
        button[0].classList.add("active");
        button[1].classList.remove("active");
        playerMark = elem;
    
      }else{
        button[0].classList.remove("active");
        button[1].classList.add("active");
        playerMark = elem;
      }
    }

    /*-- this variable below is defined in the html document by "onClick" method --*/

    const playerBtn = function (button) {
      if(playerMark === 'x' || playerMark === 'o'){
        sectionOne.style.display = "none";
        sectionTwo.style.display = "flex";
        player = button;
      }
      if(playerMark === "o" && player !== "player"){
        boxes[randomIndex].classList.add("x-active");
        xWinner.push(randomIndex);
        gameState = gameState.filter(elem => elem!==randomIndex);
      }
      SecondPageIcon();
      Players();
    }

    
    /* -- functions below defines what should be displayed 
          when a player and playermark are selected -- */

    function SecondPageIcon(){
      let result = playerMark === 'x' ? secPageIconO.style.display = "none" :
                                        secPageIconX.style.display = "none ";
    
    }
    function Players(){
      if(playerMark === 'o' && player === "cpu"){
      xPlayer.innerHTML = "X (CPU)";
      oPlayer.innerHTML = "O (P1)"
      
      }else if(playerMark === 'o' && player === "player"){
        xPlayer.innerHTML = "X (P2)";
        oPlayer.innerHTML = "O (P1)"
        }else if(playerMark === 'x' && player === "player"){
          xPlayer.innerHTML = "X (P1)";
          oPlayer.innerHTML = "O (P2)"
          }
    }


function RestartGame(){
  sectionFour.style.display = "flex";
}
function no(){
  sectionFour.style.display = "none";
}
function yes() {
  Restart();
  myTurn = true;
  playerMark = "x";
}
nextRound.addEventListener("click", ()=>{
  boxes.forEach(button => {
    button.classList.remove("x-active");
    button.classList.remove("o-active");
  })

  sectionThree.style.display = "none";
  xWinner = [];
  oWinner = [];
  gameState = [0,1,2,3,4,5,6,7,8];
  markIndicator = [];
  if(player === "cpu" && playerMark === "o"){
    randomX();
  }
  

})


   function Restart(){
    
    button[0].classList.add("active");
    button[1].classList.remove("active");
    boxes.forEach((button) => {
      button.classList.remove("x-active");
      button.classList.remove("o-active");
      })
    secPageIconO.style.display = "flex";
    secPageIconX.style.display = "flex";
    xWinner = [];
    oWinner = [];
    gameState = [0,1,2,3,4,5,6,7,8];
    playerMark = "x";
    markIndicator = [];
    tieScores = 0;
    oScores = 0;
    xScores = 0;
    tieScoreElement.textContent = tieScores;
    xScoreElement.textContent = xScores;
    oScoreElement.textContent = oScores;
    sectionTwo.style.display = "none";
    sectionThree.style.display = "none";
    sectionFour.style.display = "none";
    sectionOne.style.display = "flex"
}

function HoverEffect(){
  boxes.forEach(button => {
    button.addEventListener("mouseenter", (btn)=>{
      let cell = btn.target;
      if(!cell.classList.contains("x-active") && !cell.classList.contains("o-active")){
        if(playerMark === "x"){
            cell.classList.add("xHover");
        }else{
          cell.classList.add("oHover");
        }
      }
    })
  })
  boxes.forEach(button => {
  button.addEventListener("mouseleave", (btn)=>{
    let cell = btn.target;
    cell.classList.remove("oHover");
    cell.classList.remove("xHover");
  })
})

}
