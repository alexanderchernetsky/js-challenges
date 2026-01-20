import TicTacToeView from './TicTacToeView.js';
import TicTacToeModel from './TicTacToeModel.js';

// We’ve arrived at the place where we connect everything,
// the role of the controller is to glue both the view and the model together while keeping their roles separated.
class TicTacToeController {
    constructor() {
        this.view = new TicTacToeView();
        this.model = new TicTacToeModel();

        this.view.playEvent.addListener(position => this.model.play(position));
        this.model.updateCellEvent.addListener((data) => this.view.updateCell(data));
        this.model.victoryEvent.addListener(player => this.view.victory(player));
        this.model.drawEvent.addListener(() => this.view.draw());
    }


    run() {
        console.log('TicTacToeController running');
        this.view.render();
    }
}

export default TicTacToeController;
