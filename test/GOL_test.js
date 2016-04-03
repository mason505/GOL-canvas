import { expect } from 'chai';
import GOL from '../src/GOL.js';

describe('GOL', function() {

    it('has a height', function() {
        const life = new GOL(3, 6);
        expect(life.getHeight()).to.equal(6);
    });

    it('has a width', function() {
        const life = new GOL(3, 6);
        expect(life.getWidth()).to.equal(3);
    });

    it('can be created as a square with a single value', function() {
        const life = new GOL(8);
        expect(life.getWidth()).to.equal(8);
        expect(life.getHeight()).to.equal(8);
    });

    it('has a list of living cells', function() {
        const life = new GOL(4);
        const livingCells = life.getAliveCells();
        expect( livingCells ).to.be.instanceof(Array);
    });

    it('has a step function', function()  {
        const life = new GOL(3);
        expect( life.step ).to.exist;
    });

    it('can generate a grid', function() {
        const life = new GOL(3);

        const grid = life.getGrid();
        const row = grid[0];

        expect( grid ).to.be.instanceof(Array);
        expect( grid.length ).to.be.equal(3);

        expect( row ).to.be.instanceof(Array);
        expect( row.length ).to.be.equal(3);
    });

    it('can generate a grid representation', function() {
        const life = new GOL(3);

        life.spawnLife(0,0);
        life.spawnLife(0,1);

        const grid = life.getGrid();

        const { ALIVE, DEAD } = GOL.STATES();

        expect( grid[0][0] ).to.be.equal(ALIVE);
        expect( grid[0][1] ).to.be.equal(ALIVE);
        expect( grid[2][2] ).to.be.equal(DEAD);
    });

    it('can tell is a square is valid', function() {
        const life = new GOL(3);

        expect( life.isValidCell(0,0) ).to.be.true;
    });

    it('can tell if a cell is dead', function(){
        const life = new GOL(3);

        expect( life.isAlive(2,2) ).to.not.be.true;
    });

    it('can tell if a cell is alive', function(){
        const life = new GOL(4, 2);

        life.spawnLife(0,0);
        expect( life.isAlive(0, 0) ).to.be.true;
        expect( life.isAlive(3, 3) ).to.not.be.true;
        expect( life.isAlive(2, 3) ).to.not.be.true;
        expect( life.isAlive(-1, 0) ).to.not.be.true;

        printGrid(life.getGrid());

    });

    it('can spawn life in a cell', function() {
        const life = new GOL(4);
        life.spawnLife(2,2);

        const livingCells = life.getAliveCells();
        expect(livingCells).to.include({ x: 2, y:2 });
    });

    it('can generate the coords of all the neighbors of a cell', function(){
        const life = new GOL(3);

        const n1 = life.getNeighbors(0,0);
        expect(n1).to.deep.include.members([ [0,1], [1,0] ]);

        const n2 = life.getNeighbors(2,1);
        expect(n2).to.deep.include.members([ [2,0], [1,1], [1,2] ]);

        const n3 = life.getNeighbors(1,1);
        exist(n3).to.deep.include.members([ [0,1], [1,2], [2,1], [1,0] ]);
    });

    it('can update its state according to GOL rules', function() {
        const life = new GOL(3);
        life.spawnLife(1,0);
        life.spawnLife(1,2);

        life.step();

        expect(life.isAlive(1,1)).to.be.true;
    });
});


function printGrid(grid) {
    grid.forEach(r => {
        console.log(r);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
