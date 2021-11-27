// Save game
document.querySelector('button#save').addEventListener('click', () => {
    getCurrentPlayerPosition();

    savedGameData.playerCount = playerCount;
    savedGameData.treasuresPerPlayer = treasuresPerPlayer;

    savedGameData.curplayer = curplayer;
    savedGameData.curPlayerCell = curPlayerCell.outerHTML;
    savedGameData.curPlayerPos = curPlayerPos;
    savedGameData.counter = counter;

    savedGameData.allTreasures = allTreasures;
    savedGameData.playerTreasures = playerTreasures;
    savedGameData.collectedTreasures = collectedTreasures;

    savedGameData.gameTable = gameTable.innerHTML;

    savedGameData.curelem = document.querySelector('canvas.curelem').outerHTML;
    savedGameData.curelemRotate = document.querySelector('canvas.curelem').style.transform;

    if (document.querySelector('canvas.curelem').hasAttribute('treasure')) {
        savedGameData.curelemTreasure = document.querySelector('canvas.curelem').getAttribute('treasure');
    } else {
        savedGameData.curelemTreasure = undefined;
    }

    let classlist = document.querySelector('canvas.curelem').classList;
    savedGameData.curelemClassList = [];
    classlist.forEach((elem) => savedGameData.curelemClassList.push(elem));

    savedGameData.openPaths = openPaths;
    savedGameData.adjacencyMatrix = adjacencyMatrix;
    savedGameData.availableCells = availableCells;
    savedGameData.disabledInsert = disabledInsert;

    localStorage.setItem('savedgamedata', JSON.stringify(savedGameData));

    const dialog = document.querySelector('div.save.dialog');
    document.querySelector('div.overlay').style.display = 'block';
    dialog.style.display = 'grid';

    dialog.querySelector('button#ok').addEventListener('click', () => {
        document.querySelector('div.overlay').style.display = 'none';
        dialog.style.display = 'none';
    });

    savedGameExists();
});

// Load game
document.querySelectorAll('button#load').forEach((elem) =>
    elem.addEventListener('click', () => {
        const dialog = document.querySelector('div.load.dialog');
        document.querySelector('div.overlay').style.display = 'block';
        dialog.style.display = 'grid';

        dialog.querySelector('button#no').addEventListener('click', () => {
            document.querySelector('div.overlay').style.display = 'none';
            dialog.style.display = 'none';
        });

        dialog.querySelector('button#yes').addEventListener('click', () => {
            document.querySelector('div.overlay').style.display = 'none';
            dialog.style.display = 'none';

            document.querySelectorAll('div.extended-table > div').forEach((elem) => (elem.innerHTML = ''));
            document.querySelectorAll('div.player-details > div').forEach((elem) => (elem.innerHTML = ''));

            document.querySelector('div.parameters').style.display = 'none';
            document.querySelector('div.extended-table').style.display = 'grid';
            document.querySelector('div.player-details').style.display = 'grid';

            document.querySelector('div.playersdiv').innerHTML = 'Players';
            document.querySelector('div.treasuresdiv').innerHTML = 'Current treasure';
            document.querySelector('div.collecteddiv').innerHTML = 'Collected';
            document.querySelector('div.curplayertext').innerHTML = 'Current player';
            document.querySelector('div.curelemtext').innerHTML = 'Current element';

            let loadedGameData = JSON.parse(localStorage.getItem('savedgamedata'));

            playerCount = loadedGameData.playerCount;
            treasuresPerPlayer = loadedGameData.treasuresPerPlayer;

            curPlayerCell = document.createElement('canvas');

            let curPlayerCellData = new DOMParser().parseFromString(loadedGameData.curPlayerCell, 'text/xml');
            curPlayerCell.replaceWith(curPlayerCellData.children[0]);

            curplayer = loadedGameData.curplayer;
            curPlayerPos = loadedGameData.curPlayerPos;
            counter = loadedGameData.counter;

            allTreasures = loadedGameData.allTreasures;
            playerTreasures = loadedGameData.playerTreasures;
            collectedTreasures = loadedGameData.collectedTreasures;

            gameTable.innerHTML = loadedGameData.gameTable;
            openPaths = loadedGameData.openPaths;
            adjacencyMatrix = loadedGameData.adjacencyMatrix;
            availableCells = loadedGameData.availableCells;
            disabledInsert = loadedGameData.disabledInsert;

            let curelemData = new DOMParser().parseFromString(loadedGameData.curelem, 'text/xml');

            const curelem = document.createElement('canvas');

            curelem.replaceWith(curelemData.children[0]);
            [...loadedGameData.curelemClassList].forEach((elem) => {
                curelem.classList.add(elem);
            });

            generateCell(curelem, null);

            if (loadedGameData.curelemTreasure !== undefined) {
                curelem.setAttribute('treasure', loadedGameData.curelemTreasure);
                drawTreasure(curelem, loadedGameData.curelemTreasure);
            }

            document.querySelector('div.curelemdiv').innerHTML = '';
            document.querySelector('div.curelemdiv').appendChild(curelem);

            curelem.style.transform = loadedGameData.curelemRotate;

            gameTable.querySelectorAll('canvas.cell').forEach((cell) => {
                generateCell(cell, null);
                if (cell.hasAttribute('players')) {
                    let players = cell.getAttribute('players').split(',');
                    generatePlayers(cell, players[0], players[1], players[2], players[3]);
                }
                if (cell.hasAttribute('treasure')) {
                    let treasure = cell.getAttribute('treasure');
                    drawTreasure(cell, treasure);
                }
            });

            generateArrows();
            generateSpacing();

            refreshTable();

            generatePlayerDetails();
            refreshCurPlayer();

            displayCurrentTreasure();
            refreshCollectedTreasures();

            const disabledarrow = document.querySelector(disabledInsert);
            if (disabledarrow !== null) {
                disabledarrow.style.opacity = '0.5';
                disabledarrow.style.cursor = 'not-allowed';
            }
        });
    })
);

// Check if a saved game exists
function savedGameExists() {
    let gameSaved = localStorage.getItem('savedgamedata') !== null;
    if (gameSaved) {
        document.querySelectorAll('button#load').forEach((btn) => {
            btn.disabled = false;
            btn.classList.add('enabled');
        });
    } else {
        document.querySelectorAll('button#load').forEach((btn) => {
            btn.disabled = true;
            btn.classList.remove('enabled');
        });
    }
}
