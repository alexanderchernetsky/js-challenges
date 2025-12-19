// Cats, Rabbits, Snails game

// [   0 1 2 3 4 5 6
//  0 [0,0,0,0,0,0,0],
//  1 [0,0,0,0,0,0,0],
//  2 [0,0,0,0,0,0,0],
//  3 [0,0,0,0,0,0,0],
//  4 [0,0,0,0,0,0,0],
//  5 [0,0,0,0,0,0,0],
//  6 [0,0,0,0,0,0,0]
// ]

class Model {
    constructor(size = 7) {
        this.board = Array.from({ length: size }, () =>
            Array(size).fill(0)
        ); // creates an empty array of size 7, maps it to have an array with 7 zeros in each slot

        this.currentPlayer = 'A'; // 2 players: 'A' and 'B'.
        this.characters = new Map(); // { [id]: [{ id:1, player: 'A', type: 'cat'}, ...]
    }

    getBoard() {
        return this.board;
    }

    setCurrentPlayer(player) {
        this.currentPlayer = player;
    }

    addCharacter(character) {
        this.characters.set(character.id, character);
    }

    removeCharacter(character) {
        this.characters.delete(character.id);
    }

    setCharacterPosition(character, position) {
        // position { x: 0, y: 0}
        const { x, y } = position;

        // clean previous slot
        const prevPosition = this.getCharacterPosition(character);
        if (prevPosition) {
            const { x: prevX, y: prevY } = prevPosition;
            // remove from prev. position
            this.board[prevY][prevX] = 0;
        }

        this.board[y][x] = character;
    }

    getCharacterPosition(character) {
        const characterId = character.id;

        let y;
        let x;

        for (let i = 0; i < this.board.length; i++) {
            const currentRow = this.board[i];
            const foundX = currentRow.findIndex(slot => slot && slot.id === characterId);
            if (foundX !== -1) {
                x = foundX;
                y = i;
            }
        }

        if (x !== undefined && y !== undefined) {
            return { x, y };
        } else {
            return null;
        }
    }

    getAllowedMoveRange(character, currentPosition) {
        // todo
        return true;
    }

    moveCat(character, newPosition) {
        // 1. get current position
        const currentPosition = this.getCharacterPosition(character);
        if (!currentPosition) return;

        const { x: startX, y: startY } = currentPosition;
        const { x: endX, y: endY } = newPosition;

        const dx = endX - startX;
        const dy = endY - startY;

        // Determine if horizontal or vertical move
        const isHorizontal = dy === 0 && dx !== 0;
        const isVertical = dx === 0 && dy !== 0;

        if (!isHorizontal && !isVertical) {
            console.error('Cats can only move strictly horizontally or vertically!');
            return;
        }

        // 2. check if newPosition is in allowed range
        const isNewPositionAllowed = this.getAllowedMoveRange(character, currentPosition);
        if (!isNewPositionAllowed) {
            console.error('Move is not in the allowed range!');
            return;
        }

        // 3. handle movement
        const stepX = isHorizontal ? Math.sign(dx) : 0;
        const stepY = isVertical ? Math.sign(dy) : 0;

        // Move up to 3 steps
        let x = startX;
        let y = startY;
        for (let i = 0; i < 3; i++) {
            const nextX = x + stepX;
            const nextY = y + stepY;

            // Check boundaries
            if (nextX < 0 || nextX >= this.board.length || nextY < 0 || nextY >= this.board.length) break;

            // Check if the next cell is empty
            if (this.board[nextY][nextX] === 0) {
                x = nextX;
                y = nextY;
                this.setCharacterPosition(character, { x, y });
            } else {
                // Stop if blocked by any character
                // todo: eat enemy snail (removeCharacter) and move forward, or remain blocked by friend / enemy cat or rabbit
                console.log('Cat move is blocked!');
                break;
            }
        }

    }

    moveCharacter(character, newPosition) {
        // todo: move character square by square using unique moves, eat enemies, stop if blocked
        if (character.type === 'cat') {
            this.moveCat(character, newPosition);
        }
    }
}


const gameModel = new Model();


const cat1 = {id: 1, type: 'cat', player: 'A'};
const rabbit1 = {id: 2, type: 'rabbit', player: 'B'};
const snail1 = {id: 3, type: 'snail', player: 'B'};

gameModel.addCharacter(cat1);
gameModel.addCharacter(rabbit1);
gameModel.addCharacter(snail1);

gameModel.setCharacterPosition(cat1, {x: 0, y: 0});
gameModel.setCharacterPosition(rabbit1, {x: 1, y: 0});
gameModel.setCharacterPosition(snail1, {x: 2, y: 0});

gameModel.moveCharacter(cat1, {x: 0, y: 3});
console.log(gameModel.getCharacterPosition(cat1));
console.log(gameModel.getBoard());
