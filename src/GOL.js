import _ from 'lodash';

class GOL {

    static STATES(){
        return {
            ALIVE: 1,
            DEAD: 0,
        };
    }

    constructor(width, height){
        this.getWidth = () => width;
        this.getHeight = () => height || width;
        this.living = [];
    }

    getAliveCells() {
        return [...this.living];
    }

    step() {
        /*
for every living cell count number of living neighbors.
*/
    }

    getNeighbors(x, y) {
        const neighbors = [];
    }

    isValidCell(x, y) {
        return x >= 0 && y >= 0
            && x < this.getWidth()
            && y <= this.getHeight();
    }

    getGrid() {
        const { ALIVE, DEAD } = GOL.STATES();

        const width = this.getWidth();
        const height = this.getHeight();

        const grid = [];
        for (let x = 0; x < width; x++) {
            let row = [];
            for (let y = 0; y < height; y++) {
                const state = this.isAlive(x, y)
                          ? ALIVE
                          : DEAD;

                row.push(state);
            }
            grid.push(row);
        }

        return grid;
    }

    isAlive(row, col) {
        const matches = cell => {
            return cell.x === row && cell.y === col;
        };

        return _.some(this.living, matches);
    }

    spawnLife(row, col) {
        if (this.isAlive(row, col)) return;
        this.living = [...this.living, { x: row, y:col }];
    }

}


export default GOL;
