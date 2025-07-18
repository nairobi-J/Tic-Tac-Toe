



let cellClicked = null
let inputClicked = null
const wholeBoard = document.getElementById('board')
const board = document.querySelectorAll('.grid')
const result = document.getElementById('res')
board.forEach((cell) =>{
    cell.addEventListener('click' , () => {
        cellClicked = cell.getAttribute('id');
        play(cellClicked)
        console.log("cell clicked" , cellClicked)

    })
})



const play = (cellClicked) => {
    console.log(cellClicked);
     
    draw(cellClicked);
     check();
    computer();
}

let d = 0;
const check = () => {
    const filledx = [];
   board.forEach(cell => {
    if(cell.textContent === "X") filledx.push(cell.id);
   })
   console.log(filledx);

   checkWin(filledx, "X");

   const filledo = [];
   board.forEach(cell => {
    if(cell.textContent === "O") filledo.push(cell.id);
   })
    checkWin(filledo, "O");
   console.log(filledo, "O");
}
const draw = (cellClicked) => {
    
    const cellAddress = document.getElementById(cellClicked);
    
    if(cellAddress && cellAddress.textContent === ''){

        if(d%2 === 0){
            cellAddress.textContent = "X";
             //check();
        }
        else cellAddress.textContent = "O";
         check();
        d++;
        if(d == 9) {
             check();

            if(result && result.textContent === ""){
                result.textContent = "It's a Draw! Reload to Play the game";
                if(wholeBoard){
                    wholeBoard.classList.add('game-over')
                }
            }
        }
        
    }else if(cellAddress){
        console.warn("cell is occupied");
    }
    else {
        console.error(`Cell not found where id is ${cellClicked}`)
    }

  
}


const computer = () =>{
  
   const emptyCells = [];
   board.forEach(cell =>{
    if(cell.textContent === ''){emptyCells.push(cell.id)}
   }) 
   console.log(emptyCells);
   
   
    const index = Math.floor(Math.random() * emptyCells.length);
    const computerCell = emptyCells[index];
     
    draw(computerCell);
}



const checkWin = (filledx, who) => {

 const toWin = [
    
        ['1', '2' ,'3'],
        ['4', '5' ,'6'],
        ['7', '8' ,'9'],
        
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],

        ['1', '5', '9'],
        ['3', '5', '7']
 ]

 for(const combos of toWin){
    const isWinning = combos.every(cellId => filledx.includes(cellId));
    if(isWinning){
       if (result && result.textContent === "") {
        if(who === "X") result.textContent = "You Win ! Reload to play again";
        else result.textContent = "Computer Won ! Reload to play again";
        


        if(wholeBoard){
             wholeBoard.classList.add('game-over'); 
        }
        
}

        
    }
 }

}