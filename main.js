'use strict'

const gameBoard = (function() {
    let board = ['', '', '', '', '', '', '', '', ''];
    let state = true;

    function checkState(marker) {
        if (
            (gameBoard.board[0] === marker && gameBoard.board[4] === marker && gameBoard.board[8] === marker) ||
            (gameBoard.board[2] === marker && gameBoard.board[4] === marker && gameBoard.board[6] === marker) ||
            (gameBoard.board[0] === marker && gameBoard.board[1] === marker && gameBoard.board[2] === marker) ||
            (gameBoard.board[3] === marker && gameBoard.board[4] === marker && gameBoard.board[5] === marker) ||
            (gameBoard.board[6] === marker && gameBoard.board[7] === marker && gameBoard.board[8] === marker) ||
            (gameBoard.board[0] === marker && gameBoard.board[3] === marker && gameBoard.board[6] === marker) ||
            (gameBoard.board[1] === marker && gameBoard.board[4] === marker && gameBoard.board[7] === marker) ||
            (gameBoard.board[2] === marker && gameBoard.board[5] === marker && gameBoard.board[8] === marker)
        ) {
            if (marker === '○') {
                playerOne.score++;
                document.querySelector('#p1score').textContent = `${playerOne.score}`;
                document.documentElement.style.setProperty('--current', 'orange');
                document.querySelector('#message').textContent = `${playerOne.name} wins!`;
            } else {
                playerTwo.score++;
                document.querySelector('#p2score').textContent = `${playerTwo.score}`;
                document.documentElement.style.setProperty('--current', 'skyblue');
                document.querySelector('#message').textContent = `${playerTwo.name} wins!`;
            }

            gameBoard.state = false;
            document.querySelector('#replay').style.display = 'grid';
        } else if (gameBoard.board.indexOf('') === -1) {
            document.documentElement.style.setProperty('--current', 'white');
            document.querySelector('#message').textContent = `Draw!`;

            gameBoard.state = false;
            document.querySelector('#replay').style.display = 'grid';
        }
    }

    return {
        checkState,
        state,
        board
    };
})();

function Player(newName) {
    let score = 0;
    let name = newName;

    document.querySelector('#p1').addEventListener('input', function() {
        playerOne.name = this.value;
    });

    document.querySelector('#p2').addEventListener('input', function() {
        playerTwo.name = this.value;
    });

    return {
        score,
        name
    };
}

const playerOne = Player('Player One');
const playerTwo= Player('Player Two');

const displayController = (function() {
    let currentTurn = true;

    function move() {
        if (!gameBoard.board[this.getAttribute('data')] && gameBoard.state) {
            if (currentTurn) {
                gameBoard.board[this.getAttribute('data')] = '○';

                this.style.color = 'orange';
                document.documentElement.style.setProperty('--current', 'skyblue');
                
                gameBoard.checkState('○');
            } else {
                gameBoard.board[this.getAttribute('data')] = '×';

                this.style.color = 'skyblue';
                document.documentElement.style.setProperty('--current', 'orange');

                gameBoard.checkState('×');
            }

            this.textContent = gameBoard.board[this.getAttribute('data')];

            currentTurn = !currentTurn;
        }
    }

    function replay() {
        gameBoard.board = ['', '', '', '', '', '', '', '', ''];
        gameBoard.state = true;

        document.querySelectorAll('div').forEach(tile => {
            tile.textContent = '';
        });

        document.querySelector('#message').textContent = '';

        if (currentTurn) {
            document.documentElement.style.setProperty('--current', 'orange');
        } else {
            document.documentElement.style.setProperty('--current', 'skyblue');
        }

        this.style.display = 'none';
    }

    document.querySelector('#replay').addEventListener('click', replay);

    for (let i = 0; i < 9; i++) {
        document.querySelector('main').appendChild(document.createElement('div'));
        document.querySelector('div:last-child').setAttribute('data', i);
        document.querySelector('div:last-child').addEventListener('click', move);
    }

    return {};
})();