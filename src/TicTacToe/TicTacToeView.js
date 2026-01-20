import Event from './Event.js';

class TicTacToeView {
    constructor() {
        this.cells = null;
        this.message = null;
        this.playEvent = new Event();
    }

    render() {
         console.log('TicTacToeView rendering');
         const board = document.querySelector('.board');
         if (!board) {
             console.error('Board element not found');
             return;
         }

         board.innerHTML = ''; // Ensure board is empty before rendering
         this.cells = Array(9).fill().map((_el, index) => {
             const cell = document.createElement('div');
             cell.className = 'cell';

             cell.addEventListener('click', () => {
                 this.playEvent.trigger(index);
             });

             board.appendChild(cell);

             return cell;
         });

         this.message = document.querySelector('.message');
    }

    updateCell(data) {
        this.cells[data.position].innerHTML = data.player;
    }

    victory(player) {
        this.message.innerHTML = `${player} won!`;
    }

    draw() {
        this.message.innerHTML = 'Draw!';
    }
}

export default TicTacToeView;
