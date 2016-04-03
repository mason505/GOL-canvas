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
        const livingCells = this.getAliveCells();

        let possibleLife = livingCells
                .map(([x,y]) => this.getNeighbors(x,y));

        possibleLife = _.flatten(possibleLife).concat(livingCells);
        possibleLife = _.uniqWith(possibleLife, _.isEqual);


        if (! possibleLife.length) console.log('no morelife');
        const aliveNext = [];
        possibleLife.forEach( ([x,y]) => {
            const livingNs = this.countLivingNeighbors(x,y);
            const isAlive = this.isAlive(x,y);

            if (isAlive) {
                if (livingNs < 2) {
                    return;
                } else if (livingNs === 2 || livingNs === 3) {
                    aliveNext.push([x,y]);
                } else if (livingNs > 3) {
                    return;
                }
            } else {
                if (livingNs === 3) {
                    aliveNext.push([x,y]);
                }
            }

        });


        this.living = aliveNext;
    }

    checkCell(x, y) {
        if (! this.isValidCell(x, x))
            throw new Error(`INVALID POSITION: { x: ${x}, y: ${y} }`);
    }

    getNeighbors(x, y) {
        this.checkCell(x,y);
        const neighbors = [
            [x-1, y-1],
            [x+1, y-1],
            [x-1, y+1],
            [x+1, y+1],
            [x-1, y],
            [x, y-1],
            [x+1, y],
            [x, y+1]
        ];

        return neighbors.filter(([x,y]) => this.isValidCell(x,y));
    }

    countLivingNeighbors(x, y) {
        return this.getNeighbors(x, y)
            .filter(([x, y]) => this.isAlive(x,y))
            .length;
    }

    isValidCell(x, y) {
        return x >= 0 && y >= 0
            && x < this.getWidth()
            && y < this.getHeight();
    }

    getGrid() {
        const { ALIVE, DEAD } = GOL.STATES();

        const width = this.getWidth();
        const height = this.getHeight();

        const grid = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
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
        this.checkCell(row, col);
        const matches = cell =>  _.isEqual(cell, [row, col]);
        return _.some(this.living, matches);
    }

    spawnLife(x, y) {
        if (this.isAlive(x, y)) return;
        this.living = [...this.living, [x,y] ];
    }

}


export default GOL;
