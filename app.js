const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");
const width = 8;
let playerGo = 'black';
playerDisplay.textContent = 'black';

const startPieces = [
rook, knight, bishop, king, queen, bishop, knight, rook,
pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
rook, knight, bishop, queen, king, bishop, knight, rook
   
];
function createBoard(){
    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');
        square.classList.add('square');
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', true);
        square.setAttribute('square-id',i);
        const row = Math.floor((63 - i)/8) + 1;
        if (row % 2 === 0){
                square.classList.add(i % 2 === 0 ? 'beige' : 'brown');
            
        } else {
            square.classList.add(i % 2 === 0 ? 'brown' : 'beige');
        }

        if( i <= 15){
            square.firstChild.firstChild.classList.add('black');
        }
        if( i >= 48){
            square.firstChild.firstChild.classList.add('white');
            
        }

        gameBoard.append(square);

    })
}
createBoard();

const allSquares = document.querySelectorAll(" .square");
allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
})
let startPostitionId
let draggedElement

function dragStart (e) {
    startPostitionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
}
    
function dragOver (e) {
    e.preventDefault();
}

function dragDrop (e) {
  e.stopPropagation();
 const correctGo = draggedElement.firstChild.classList.contains(playerGo)
 const taken = e.target.classList.contains('piece');
 const valid = checkIfVaild(e.target)
 const oppenentGo = playerGo === 'white' ? 'black' : 'white';
 const takenByOpponent = e.target.firstChild?.classList.contains(oppenentGo);

 if(correctGo){
   if(takenByOpponent && valid){
   e.target.parentNode.append(draggedElement);
   e.target.remove();
   changePlayer();
   return
 }
  

if(taken && !takenByOpponent){
    infoDisplay.textContent = 'Think Again Einstein';
    setTimeout(() => infoDisplay.textContent = '', 2000);
 return
}

if(valid){
    e.target.append(draggedElement);
    changePlayer();
    return
}
}
}


function checkIfVaild(target){
console.log(target)
const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'));
const startId = Number(startPostitionId);
const piece = draggedElement.id
// console.log("taget", targetId)
// console.log("start", startId)
// console.log("piece", piece)

switch(piece){
    case 'pawn':
        const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
        if(
            starterRow.includes(startId) && startId + width * 2 === targetId || startId + width === targetId
          ){
            return true;
        }
    }
}


function changePlayer(){
    if(playerGo === 'black'){ 
        reverseIds();
        playerGo = 'white';
        playerDisplay.textContent = 'white';
       
    } else {
        revertIds();
        playerGo = 'white';
        playerDisplay.textContent = 'black';
       
    }
}

function reverseIds(){
    const allsquares = document.querySelectorAll('.square');
    allsquares.forEach((square, i) => {
        square.setAttribute('square-id',(width * width-1)-i);
    })
}

function revertIds(){
    const allsquares = document.querySelectorAll('.square');
   allsquares.forEach((square,i) => square.setAttribute('square-id', i))
}