/**
 * CS 132
 * CP2: Tic Tac Toe
 * 
 * This is the javascript file for my CP2 tic tac toe project. It contains
 * code to switch between the rules view and game view. It also contains the
 * code necessary to play tic tac toe.
 */

(function() {
    "use strict";
    let MOVE = true;
    let moves = 0;
    const NOMOVE = 0;
    const BLUEMOVE = 1;
    const REDMOVE = 2;
    let board = [[NOMOVE, NOMOVE, NOMOVE], [NOMOVE, NOMOVE, NOMOVE], [NOMOVE, NOMOVE, NOMOVE]];

    /**
     * Init function which adds event listeners to the go to button, rules button,
     * and the start game button.
     */
    function init() {

        const goToButton = qs("#goto-button");
        const rulesButton = qs("#rules-button");
        const startButton = qs("#start-button");
        goToButton.addEventListener("click", () => { 
            changeView(true) 
        });
        rulesButton.addEventListener("click", () => { 
            changeView(false) 
        });
        startButton.addEventListener("click", startGame)
    }
    /**
     * Switches from the rule view to the grid view to allow the player to play
     * the game.
     * @param {boolean} menu - Indicates which view the website is currently on.
     */
    function changeView(menu) {
        const check = id("check");

        const rulesView = qs("#rules-view");
        const gridView = qs("#grid-view");
        if (menu === true) {
            if (check.checked){
                rulesView.classList.add("hidden");
                gridView.classList.remove("hidden");
            }
        } else {
            rulesView.classList.remove("hidden");
            gridView.classList.add("hidden");
        }
    }
    /**
     * Startgame function which resets the board, removing any marks that were
     * previously played. Also, adds new event listeners corresponding to
     * each playable spot on the board.
     */
    function startGame() {
        const gridSpot = qsa(".gridspot");
        const marks = qsa(".mark");
        board = [[NOMOVE, NOMOVE, NOMOVE], [NOMOVE, NOMOVE, NOMOVE], [NOMOVE, NOMOVE, NOMOVE]];
        moves = 0;
        MOVE = true;

        for (let i = 0; i < marks.length; i++) {
            marks[i].remove();
            
        }
        for (let i = 0; i < gridSpot.length; i++) {
            gridSpot[i].addEventListener("click", makeMove);
        }
        id("instructions").textContent = "Red's Turn";
    }

    /**
     * Makes a move by removing the event listener at the spot corresponding
     * to where the move was made. Then, adds the correct mark to that spot
     * by adding a DOM element. Also updates the board variable which keeps
     * track of moves that have been made.
     * @param {*} e - event object when clicking the spot
     */
    function makeMove(e) {
        e.target.removeEventListener("click", makeMove);
        let row = parseInt(e.target.id.charAt(5)) - 1;
        let col = parseInt(e.target.id.charAt(6)) - 1;
        if (MOVE == false) {
            id("instructions").textContent = "Red's Turn";
            MOVE = true;

            const newMove = gen("img");
            newMove.src = "imgs/o.jpeg";
            newMove.alt = "blue mark";
            newMove.classList.add("mark");
            e.target.appendChild(newMove);
            board[row][col] = BLUEMOVE;
            if (checkWin() == true) {
                id("instructions").textContent = "Blue Wins! Start a New Game!";
            }
        } else {
            id("instructions").textContent = "Blue's Turn";
            MOVE = false;

            const newMove = gen("img");
            newMove.src = "imgs/x.jpeg";
            newMove.alt = "red mark";
            newMove.classList.add("mark");
            e.target.appendChild(newMove);
            board[row][col] = REDMOVE;
            if (checkWin() == true) {
                id("instructions").textContent = "Red Wins! Start a New Game!";
            }
        }
        moves = moves + 1;
        if (moves == 9) {
            id("instructions").textContent = "Tie Game! Start a New Game!";
        }
    }
    /**
     * Checks the board to see if any player has won the game. Called after
     * every move.
     * @returns {boolean} Boolean which is true if someone has won the game.
     */
    function checkWin() {
        for (let row = 0; row < 3; row++) {
            if (board[row][0] == board[row][1] && board[row][1] == board[row][2] 
                && (board[row][0] != NOMOVE)) {
                return true;
            }
        }
        for (let col = 0; col < 3; col++) {
            if (board[0][col] == board[1][col] && board[1][col] == board[2][col] 
                && (board[0][col] != NOMOVE)) {
                return true;
            }
        }
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] 
            && (board[0][0] != NOMOVE)) {
            return true;
        }
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] 
            && (board[1][1] != NOMOVE)) {
            return true;
        }
    }

    init();
})();