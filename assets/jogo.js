let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
}

let playerTurn = '';
let winner = '';
let gameStatus = false;

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {

    item.addEventListener('click', itemClick);
})

function itemClick (event) {

    let item = event.target.getAttribute('data-item');

    if (gameStatus && board[item] === '') {

        board[item] = playerTurn;

        renderBoard();
        togglePlayer();
    }
}

function reset () {

    winner = '';

    let rnd = Math.floor(Math.random() * 2);

    playerTurn = (rnd === 0) ? 'x' : 'o';

    for (let i in board) {

        board[i] = '';
    }

    gameStatus = true;

    renderBoard();
    renderInfo();
}

function togglePlayer () {

    playerTurn = (playerTurn == 'x') ? 'o' : 'x';

    renderInfo();
}


function renderBoard () {

    for (let i in board) {

        let item = document.querySelector(`div[data-item=${i}]`);

        item.innerHTML = board[i];

        checkGameStatus();
    }
}

function checkGameStatus () {

    if (checkWinnerFor('x')) {

        winner = 'O "x" venceu';
        gameStatus = false;
        console.log(winner);

    } else if (checkWinnerFor('o')) {

        winner = 'O "o" venceu';
        gameStatus = false;
        console.log(winner);

    } else if (isFull()) {

        winner = 'Deu véia';
        gameStatus = false;
        console.log(winner);
    }
}

function checkWinnerFor (player) {

    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for (let pItem in pos) {

        let pArray = pos[pItem].split(',');

        let hasWon = pArray.every(option => board[option] === player);

        if (hasWon) {

            return true;
        }
    }

    return false;
}

function isFull () {

    for (let i in board) {

        if (board[i] === '') {

            return false;
        }
    }

    return true;
}

function renderInfo () {

    document.querySelector('.turn').innerHTML = playerTurn;
    document.querySelector('.result').innerHTML = winner;
}