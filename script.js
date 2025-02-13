let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let player1Name = "Player 1";
let player2Name = "Player 2";

function startGame() {
    const p1 = document.getElementById("player1").value;
    const p2 = document.getElementById("player2").value;
    
    if (p1) player1Name = p1;
    if (p2) player2Name = p2;

    document.querySelector(".input-container").classList.add("hide");
    document.querySelector(".game-board").classList.remove("hide");

    document.getElementById("turn-indicator").textContent = `${player1Name}'s Turn (X)`;
    gameActive = true;
}

document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive) return;
        let index = cell.getAttribute("data-index");

        if (board[index] === "") {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("placed");

            if (checkWin()) {
                gameActive = false;
                highlightWinningCells();
                document.getElementById("turn-indicator").textContent = `${currentPlayer === "X" ? player1Name : player2Name} Wins! 🎉`;
                return;
            }

            if (!board.includes("")) {
                gameActive = false;
                document.getElementById("turn-indicator").textContent = "It's a Draw! 🤝";
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("turn-indicator").textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s Turn (${currentPlayer})`;
        }
    });
});

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            document.querySelectorAll(".cell")[a].classList.add("winning-cell");
            document.querySelectorAll(".cell")[b].classList.add("winning-cell");
            document.querySelectorAll(".cell")[c].classList.add("winning-cell");
            return true;
        }
        return false;
    });
}

function highlightWinningCells() {
    document.querySelectorAll(".winning-cell").forEach(cell => {
        cell.classList.add("sparkle");
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.getElementById("turn-indicator").textContent = `${player1Name}'s Turn (X)`;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winning-cell", "sparkle");
    });
}
