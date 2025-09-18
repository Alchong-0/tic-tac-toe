const tileElements = document.querySelectorAll("td");
const startElement = document.getElementById("start");

const gameboard = (function () {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    const placeXO = (pos, player) => gameboard[pos] = player;
    const reset = () => {
        for (let i = 0; i < gameboard.length; i++) {
            gameboard[i] = "";
        }
    };
    const checkWinner = (pos) => {
        switch (pos) {
            case "0":
                if ((gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]) ||
                    (gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6]) ||
                    (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8])) {
                    return true;
                }
                return false;
            case "1":
                if ((gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]) ||
                    (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7])) {
                    return true;
                }
                return false;
            case "2":
                if ((gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2]) ||
                    (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8]) ||
                    (gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6])) {
                    return true;
                }
                return false;
            case "3":
                if ((gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5]) ||
                    (gameboard[3] === gameboard[0] && gameboard[3] === gameboard[6])) {
                    return true;
                }
                return false;
            case "4":
                if ((gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5]) ||
                    (gameboard[6] === gameboard[4] && gameboard[4] === gameboard[2]) ||
                    (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8])) {
                    return true;
                }
                return false;
            case "5":
                if ((gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5]) ||
                    (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8])) {
                    return true;
                }
                return false;
            case "6":
                if ((gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]) ||
                    (gameboard[6] === gameboard[3] && gameboard[3] === gameboard[0]) ||
                    (gameboard[6] === gameboard[4] && gameboard[4] === gameboard[2])) {
                    return true;
                }
                return false;
            case "7":
                if ((gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]) ||
                    (gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7])) {
                    return true;
                }
                return false;
            case "8":
                if ((gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8]) ||
                    (gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8]) ||
                    (gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8])) {
                    return true;
                }
                return false;
            default:
                return false;
        }
    };
    return { gameboard, placeXO, reset, checkWinner };
})();

function createPlayer (name) {
    return { name };
};

const game = (function () {
    let player = "O";
    let turn = 0;
    const startGame = () => {
        gameboard.reset();
        turn = 0;
    }
    const takeTurn = (pos) => {
        // Stop game from progressing beyond 9 turns
        // Check if position is in bounds (Adding click display should make this unnecessary)
        if (turn < 9 && pos <= 8 && pos >= 0) {
            gameboard.placeXO(pos, player);
            if (gameboard.checkWinner(pos)) {
                console.log(`${player} wins.`);
                turn = 9;
            }
            // Alternate player turns
            if (player === "O") {
                player = "X";
            } else {
                player = "O";
            }
            turn++;
            gameDisplay.updateDisplay();
        } else {
            console.log("Error: game is over, please reset game");
        }
    }
    return { turn, startGame, takeTurn };
})();

const gameDisplay = (function () {
    // Individual Update
    const addTile = (pos, player) => {
        document.getElementById('tile' + pos).innerText = player;
    };

    // Update all
    const updateDisplay = () => {
        for (let i = 0; i < gameboard.gameboard.length; i++) {
            document.getElementById('tile' + i).innerText = gameboard.gameboard[i];
        }
    };
    return { addTile, updateDisplay };
})();


// Enable click on positions
function enableTiles() {
    for (let i = 0; i < tileElements.length; i++) {
        tileElements[i].addEventListener("click", clickTile, {once: true});
    }
}

function disableTiles() {
    for (let i = 0; i < tileElements.length; i++) {
        tileElements[i].removeEventListener("click", clickTile);
    }
}

function clickTile(event) {
    let position = event.currentTarget.getAttribute("id")[4];
    game.takeTurn(position);
}

startElement.addEventListener("click", () => {
    game.startGame();
    gameDisplay.updateDisplay();
    console.log(gameboard.gameboard);
    enableTiles();
});