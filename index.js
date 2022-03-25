//put game status here for use later on
const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
// gameActive will be used to pause the game in the event of an end scenario

let currentPlayer = "X";
//this will set up who the current player is

let gameState = ["","","","","","","","",""];
//stores the current game stat in the form of empty strings in an array. 
//This allows tracking of played cells and will validate game state later.

//creates all the possible winning conditions/combinations for game outcomes.
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Functions can be used to declare message to the current player. 
//Using it this way means that it will be created with current data everytime its needed.
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game has ended in a draw`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//Set initial message to let the players know whose turn it is. 
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    //For-loop goes through elements and checks if they match the ones in winningConditions.
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    //Check if there are any values in the game state array that are still not populated with a player sign.

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    //By this point no one has won the game yet with moves remaining, so we continue by changing the current player.

    handlePlayerChange();

}

function handleCellClick(clickedCellEvent) {
    //Save the clicked HTML element in a variable for easier further use.
    const clickedCell = clickedCellEvent.target;
    //Grab 'data-cell-index' attribute to identify where cell is in the grid.
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    //check if the call has already been played or if the game is paused.
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame(){
    gameActive = true;
    currentPlayer = "X";
    gameState = ["","","","","","","","",""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

//Add event listeners to the act game cells.
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
//Create restart button to be used during/after games.
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);