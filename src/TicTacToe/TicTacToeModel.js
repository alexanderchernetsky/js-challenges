import Event from './Event.js';

class TicTacToeModel {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X'; // or 'O'
        this.gameFinished = false;

        // events
        this.updateCellEvent = new Event();
        this.victoryEvent = new Event();
        this.drawEvent = new Event();
    }

    play(position) {
        // check if game is finished or cell is already taken
        if (this.gameFinished || this.board[position]) {
            return false;
        }

        // update board data
        this.board[position] = this.currentPlayer;
        // notify view
        this.updateCellEvent.trigger({position, player: this.currentPlayer});

        this.gameFinished = this.victory() || this.draw();

        // switch player
        if (!this.gameFinished) {
            this.switchPlayer();
        }

        return true;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    draw() {
        // all cells are filled
        const draw = this.board.every(cell => cell !== null);

        if (draw) {
            this.drawEvent.trigger();
        }

        return draw;
    }

    victory() {
        // return winner if any
        // winning combinations:
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
            [0, 4, 8], [2, 4, 6]             // diagonal
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.victoryEvent.trigger(this.currentPlayer);
                return this.currentPlayer;
            }
        }

        return false;
    }
}

export default TicTacToeModel;
