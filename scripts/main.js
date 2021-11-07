// Game constants
const tableSize = 7;
const cellSize = 60;

const cellWallColor = 'rgb(65, 61, 58)';
const cellPathColor = 'rgb(255, 193, 7)';
const cellBorderColor = 'rgb(179, 130, 107)';
const arrowColor = 'white';

const diamondColor = 'rgb(54, 197, 216)';
const emeraldColor = 'rgb(39, 170, 78)';
const amethystColor = 'rgb(170, 25, 184)';
const rubyColor = 'rgb(161, 12, 19)';

// Cells to generate
let straightCellCount = 13;
let curvedCellCount = 15;
let intersectionCellCount = 6;

// Globally used elements
const gameTable = document.querySelector('div.game-table');
const gameStartBtn = document.querySelector('button#start');
const playerCountInp = document.querySelector('input#player-count');
const treasureCountInp = document.querySelector('input#treasure-count');

// Game parameters
let playerCount;
let treasuresPerPlayer;

// Treasure data
let allTreasures = [];
let playerTreasures = [];
let collectedTreasures = [0, 0, 0, 0];

// Current player data
let curplayer;
let curPlayerCell;
let curPlayerPos;
let counter = 1;

// For rotating the elements on right click
let rotatedeg = 90;

// For disabling the insertion of the element from the other side
let disabledInsert = 'canvas#placeholder';

// Available paths from each cell
let openPaths = [];

// The cells where the player can move
let availableCells = [];

// The adjacency matrix of the graph
let adjacencyMatrix = [];

class CellPaths {
    constructor(top, right, bottom, left) {
        this.top = top;
        this.right = right;
        this.bottom = bottom;
        this.left = left;
    }
}

// Stores game data
let savedGameData = {
    // parameters
    playerCount: undefined,
    treasuresPerPlayer: undefined,
    // players
    curplayer: undefined,
    curPlayerCell: undefined,
    curPlayerPos: undefined,
    counter: undefined,
    // treasures
    allTreasures: [],
    playerTreasures: [],
    collectedTreasures: [],
    // table
    gameTable: undefined,
    curelem: undefined,
    curelemRotate: undefined,
    curelemTreasure: undefined,
    curelemClassList: [],
    openPaths: [],
    adjacencyMatrix: [],
    availableCells: [],
    disabledInsert: undefined,
};

// Checks if a cell is in range of the table
function validCell(row, col) {
    return row >= 0 && row <= tableSize - 1 && col >= 0 && col <= tableSize - 1;
}

// Gets the rotation value from the transfrom: rotate property
function getRotateNum(str) {
    let rotateStr = '';
    let i = 7;
    while (str.charAt(i) !== 'd') {
        rotateStr += str.charAt(i);
        ++i;
    }
    let rotateNum = parseInt(rotateStr);
    return rotateNum;
}

// Maps the available paths from the cell
function mapPaths(cell, arr) {
    let transformation = [...cell.style.transform.toString()].splice(0, 6).join('');
    let rotateNum = getRotateNum(cell.style.transform);

    if (cell.classList.contains('straight')) {
        if (transformation === 'rotate' && (rotateNum === 0 || rotateNum % 360 === 0)) {
            arr.push(new CellPaths(true, false, true, false));
        } else if (transformation === 'rotate' && (rotateNum === 90 || rotateNum % 360 === 90)) {
            arr.push(new CellPaths(false, true, false, true));
        } else if (transformation === 'rotate' && (rotateNum === 180 || rotateNum % 360 === 180)) {
            arr.push(new CellPaths(true, false, true, false));
        } else if (transformation === 'rotate' && (rotateNum === 270 || rotateNum % 360 === 270)) {
            arr.push(new CellPaths(false, true, false, true));
        }
    }

    if (cell.classList.contains('curve')) {
        if (transformation === 'rotate' && (rotateNum === 0 || rotateNum % 360 === 0)) {
            arr.push(new CellPaths(false, true, true, false));
        } else if (transformation === 'rotate' && (rotateNum === 90 || rotateNum % 360 === 90)) {
            arr.push(new CellPaths(false, false, true, true));
        } else if (transformation === 'rotate' && (rotateNum === 180 || rotateNum % 360 === 180)) {
            arr.push(new CellPaths(true, false, false, true));
        } else if (transformation === 'rotate' && (rotateNum === 270 || rotateNum % 360 === 270)) {
            arr.push(new CellPaths(true, true, false, false));
        }
    }

    if (cell.classList.contains('intersection')) {
        if (transformation === 'rotate' && (rotateNum === 0 || rotateNum % 360 === 0)) {
            arr.push(new CellPaths(true, true, true, false));
        } else if (transformation === 'rotate' && (rotateNum === 90 || rotateNum % 360 === 90)) {
            arr.push(new CellPaths(false, true, true, true));
        } else if (transformation === 'rotate' && (rotateNum === 180 || rotateNum % 360 === 180)) {
            arr.push(new CellPaths(true, false, true, true));
        } else if (transformation === 'rotate' && (rotateNum === 270 || rotateNum % 360 === 270)) {
            arr.push(new CellPaths(true, true, false, true));
        }
    }
}
