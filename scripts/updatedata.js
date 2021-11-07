// Refreshes the current player
function refreshCurPlayer() {
    const curplayerdiv = document.querySelector('div.curplayer');
    curplayerdiv.innerHTML = '';

    const playerIcon = document.createElement('canvas');
    playerIcon.width = 60;
    playerIcon.height = 60;
    drawPlayer(playerIcon, curplayer, 30, 30);
    curplayerdiv.appendChild(playerIcon);

    const playerName = document.createElement('div');
    playerName.innerHTML = `Játékos ${curplayer.toString().charAt(1)}`;
    curplayerdiv.appendChild(playerName);
}

// Refreshes the number of collected treasures
function refreshCollectedTreasures() {
    const playerDetails = document.querySelector('div.player-details');

    for (let i = 0; i < playerCount; ++i) {
        const collected = playerDetails.querySelector(`div.coll${i + 1}`);
        collected.innerHTML = `${collectedTreasures[i]}/${treasuresPerPlayer}`;
    }
}

// Displays the current treasure the players have to collect
function displayCurrentTreasure() {
    const playerDetails = document.querySelector('div.player-details');

    for (let i = 0; i < playerCount; ++i) {
        const playerTreasureDiv = playerDetails.querySelector(`div.treasure${i + 1}`);

        playerTreasureDiv.style.display = 'flex';
        playerTreasureDiv.style.alignItems = 'center';
        playerTreasureDiv.style.justifyContent = 'center';

        let curTreasure = playerTreasures[i][0];

        let treasureIcon = document.createElement('canvas');
        treasureIcon.width = 60;
        treasureIcon.height = 60;
        drawTreasure(treasureIcon, curTreasure);

        const treasureName = document.createElement('div');
        if (curTreasure === 'diamond') treasureName.innerHTML = 'Gyémánt';
        else if (curTreasure === 'emerald') treasureName.innerHTML = 'Smaragd';
        else if (curTreasure === 'amethyst') treasureName.innerHTML = 'Ametiszt';
        else if (curTreasure === 'ruby') treasureName.innerHTML = 'Rubin';

        playerTreasureDiv.innerHTML = '';
        playerTreasureDiv.appendChild(treasureIcon);
        playerTreasureDiv.appendChild(treasureName);

        if (collectedTreasures[i] === treasuresPerPlayer) {
            playerTreasureDiv.innerHTML = '';

            playerTreasureDiv.innerHTML = 'Menj vissza a kezdőpontodra!';
            playerTreasureDiv.innerHTML += '<br>';

            if (i === 0) playerTreasureDiv.innerHTML += '(bal felső sarok)';
            else if (i === 1) playerTreasureDiv.innerHTML += '(jobb felső sarok)';
            else if (i === 2) playerTreasureDiv.innerHTML += '(bal alsó sarok)';
            else if (i === 3) playerTreasureDiv.innerHTML += '(jobb alsó sarok)';
        }
    }
}

// Refreshes the table with new paths, positions and vertices
function refreshTable() {
    openPaths = [];

    const cells = [...gameTable.querySelectorAll('canvas.cell')];
    let cellInd = 0;

    let n = 0;
    for (let i = 0; i < tableSize; ++i) {
        let cellPaths = [];

        for (let j = 0; j < tableSize; ++j) {
            cells[cellInd].setAttribute('row', i);
            cells[cellInd].setAttribute('col', j);
            cells[cellInd].setAttribute('vertex', n);
            mapPaths(cells[cellInd], cellPaths);
            ++n;
            ++cellInd;
        }

        openPaths.push(cellPaths);
    }
}
