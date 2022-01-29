let round=0;
const gameBoard = (() => {
    const board =['','','','','','','','',''];


    const reset = () =>{
    for (let i=0;i<board.length; i++){
    board[i]='';
    }
    }
    return {board,reset};
}) ();

const players = (sign) => {
        this.sign=sign;
    const getSign = () =>{
        return sign
    }
    return {getSign};
}

const displayController = (() => {
// game board array must be updated and iterate through each box to update every round
let allBoxes=document.querySelectorAll('[data-index]');
let message=document.querySelector('.playerTurn');
let resetButton=document.querySelector('.reset');

// Add Event Listener for box, dependent on round
allBoxes.forEach(element => {
    element.addEventListener('click',function(e){
        let playerTurn=gameController.roundController();
        if(gameBoard.board[e.target.dataset.index]!=''){
            return;
        }
        else{
        gameBoard.board[e.target.dataset.index]=playerTurn;
        boxDisplayer();
        gameController.playRound();
        if(gameController.winChecker()!='noone'){
            gameController.gameOver(gameController.winChecker())
            return;
        }
        if (round===9){
            messageChanger('tie');
            return;
        }
        messageChanger();
        }
    })
})

// Displays Boxes on screen from array
const boxDisplayer = () =>{
    let boxesArray=Array.from(document.querySelectorAll('[data-index]'));
        for (let i=0;i<boxesArray.length;i++){
            boxesArray[i].textContent=gameBoard.board[i]
        }
    }


    // Say's who's turn it is
function messageChanger(vari){
    if(vari==='tie'){
        message.textContent= 'It is a tie!'
        return;
    }
    if (vari!=null){
        message.textContent=`Player ${vari} has won!`
    }
    else{
        message.textContent= `Player ${gameController.roundController()} 's turn `
    }
}


    // add Event Listener for reset 
    resetButton.addEventListener('click',function(e) {
        gameController.gameReset();
        gameBoard.reset();
        boxDisplayer();
        messageChanger();
    })
    return {messageChanger,boxDisplayer}
}) ();




const gameController = (()=> {
    const playerX = players('X');
    const playerO = players('O');
    
    
    const playRound = () => {
        round++
        
    }
    
    const roundController =() =>{
        if (round%2===1) {
            return playerO.getSign();
        } 
        else {
            return playerX.getSign();
        }
    }
    const gameReset = () => {
        round=0;
    }
    const winCondition = () => {
        const win = [
            ['0','1','2'],
            ['3','4','5'],
            ['6','7','8'],
            ['0','3','6'],
            ['1','4','7'],
            ['2','5','8'],
            ['0','4','8'],
            ['2','4','6'],
        ]
        return win;
    }



    const winChecker =() => {
        let xArray=[];
        let oArray=[];
        for (i=0; i<gameBoard.board.length; i++){
            if(gameBoard.board[i]==='X'){
                xArray.push(`${i}`);
            }
            else if(gameBoard.board[i]==='O'){
                oArray.push(`${i}`);
            }
        }
    let winner='noone'
    winCondition().forEach(element => {
        let counter=0;
        for (i=0; i<element.length ; i++){
            if (xArray.includes(element[i])){
                counter++;
            }
            if (counter===3){
                winner='X'
            }
        }
    })
    winCondition().forEach(element => {
        let counter=0;
        for (i=0; i<element.length ; i++){
            if (oArray.includes(element[i])){
                counter++;
            }
            if (counter===3){
                winner='O'
            }
        }
    })
    return (winner);
    }

    const gameOver =(winner) => {
        //fill gameboard so it cant be used anymore
        for(i=0;i<gameBoard.board.length;i++){
        gameBoard.board[i]='aaaaa'
        }
        if (winner !=null){
         displayController.messageChanger(winner)
        }
    }
        return {roundController, playRound,gameReset,winCondition, winChecker,gameOver,round}
}) ();

//next steps, figure out how to implement win condition
// messagechanger function includes when player has won and draw
// gameOver when win or draw --- after 9 rounds 