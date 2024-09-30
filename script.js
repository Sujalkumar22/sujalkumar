const board = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.cell'));
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (const [a, b, c] of winningCombinations) {
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
    }
    if (cells.every(cell => cell.textContent)) {
        status.textContent = 'It\'s a tie!';
        gameActive = false;
    }
};

const handleClick = (e) => {
    const cell = e.target;

    if (cell.textContent || !gameActive) return;

    cell.textContent = currentPlayer;
    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
    gameActive = true;
};

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);
