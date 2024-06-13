const cells = document.querySelectorAll(".cell")
const status = document.querySelector("#status")
const restartBtn = document.querySelector("#restart")


let winConditions = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [0,3,6],
   [1,4,7],
   [2,5,8],
   [0,4,8],
   [2,4,6]
]

let options = ["","","","","","","","",""]
let currentPlayer = "X";
let gameRunning = false;

startGame()

function startGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked))
    restartBtn.addEventListener("click",restart);
    status.textContent =` ${currentPlayer}'s Turn`
    gameRunning = true;
}


function cellClicked(){
   const cellIndex = this.getAttribute("cellIndex");

   if(options[cellIndex] != "" || !gameRunning ){
    return;
   }
   updateCell(this,cellIndex);
 
   checkWinner()
}

function updateCell(cell,index){
   options[index] = currentPlayer; 
   cell.textContent = currentPlayer;
}

function updatePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    status.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner(){
  let winner = false;
  
  for(let i = 0 ; i < winConditions.length ; i++ ){
    let condition = winConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];

    if(cellA == " " || cellB == "" || cellC == " " ){
        continue;
    }
    if (cellA == cellB && cellB == cellC){
        winner = true;
        break;
    }
  }

  if(winner){
    status.textContent = `${currentPlayer} won ! `; 
    gameRunning = false;
  }
  else if (!options.includes("")){
    status.textContent = "It's a Draw"
    gameRunning = false;
  }
  else{
    updatePlayer()
  }
}


function restart(){

  currentPlayer = "X"; 
  status.textContent = `${currentPlayer}'s Turn`;
  options = ["","","","","","","","","",]
  cells.forEach(cells=> cells.textContent = "" )
  gameRunning = true;
}