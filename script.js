let currentPlayer = 'X';
let gameOver = false;

function makeMove(cell) {
    if (!cell.innerText && !gameOver) {
        cell.innerText = currentPlayer;
        cell.classList.add(currentPlayer);
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
            gameOver = true;
            const winner = currentPlayer === 'X' ? 'X' : 'O';

            // Display a popup message for the winner
            setTimeout(() => {
                alert(`${winner} wins!`);
                resetGame();
            }, 100);

            // Create a line element for the winning line
            const line = document.createElement('div');
            line.className = 'line-animation';
            document.body.appendChild(line);

            // Calculate the position and rotation for the line
            const cellA = cells[a].getBoundingClientRect();
            const cellC = cells[c].getBoundingClientRect();

            line.style.top = `${(cellA.top + cellC.top + cellA.height) / 2}px`;
            line.style.left = `${(cellA.left + cellC.left + cellA.width) / 2}px`;
            line.style.width = `${Math.sqrt(Math.pow(cellC.left - cellA.left, 2) + Math.pow(cellC.top - cellA.top, 2))}px`;
            line.style.transformOrigin = '0 50%';
            line.style.transform = `rotate(${Math.atan2(cellC.top - cellA.top, cellC.left - cellA.left)}rad)`;
          // Add the winning-cell class to the winning cells
            cells[a].classList.add('winning-cell');
            cells[b].classList.add('winning-cell');
            cells[c].classList.add('winning-cell');

            return;
        }
    }

    if ([...cells].every(cell => cell.innerText)) {
        gameOver = true;
        setTimeout(() => {
            winnerAlert("It's a draw!");
            resetGame();
        }, 100);
    }
}




function resetGame() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('X', 'O', 'winning-cell');
    });
    currentPlayer = 'X';
    gameOver = false;
    
    // Remove the winning line
    const line = document.querySelector('.line-animation');
    if (line) {
        line.remove();
    }
}

function winnerAlert(winner) {
    const winPopup = document.createElement('div');
    winPopup.className = 'win-popup';
    winPopup.innerHTML = `<p>${winner} wins!</p>`;
    document.body.appendChild(winPopup);

    // Remove the win popup after a delay
    setTimeout(() => {
        winPopup.remove();
    }, 2000); // Adjust the time to display the popup (2 seconds in this example)
}


