// Sets the parameters on load, checks if a saved game exists
window.addEventListener('load', () => {
    playerCount = parseInt(playerCountInp.value);
    treasuresPerPlayer = parseInt(treasureCountInp.value);
    document.querySelector('div#treasures').innerHTML = `Játékosonkénti kincskártyák száma: (1 - ${24 / playerCount})`;
    savedGameExists();
});

// New game dialog
document.querySelector('div.player-details button#new').addEventListener('click', () => {
    const dialog = document.querySelector('div.newgame.dialog');
    document.querySelector('div.overlay').style.display = 'block';
    dialog.style.display = 'grid';

    dialog.querySelector('button#no').addEventListener('click', () => {
        document.querySelector('div.overlay').style.display = 'none';
        dialog.style.display = 'none';
    });
});

// Starts a new game
document.querySelectorAll('button#newgame').forEach((elem) =>
    elem.addEventListener('click', () => {
        document.querySelectorAll('div.extended-table > div').forEach((elem) => (elem.innerHTML = ''));
        document.querySelectorAll('div.player-details > div').forEach((elem) => (elem.innerHTML = ''));
        document.querySelector('div.parameters').style.display = 'grid';
        document.querySelector('div.extended-table').style.display = 'none';
        document.querySelector('div.player-details').style.display = 'none';
        document.querySelector('div.winner').style.display = 'none';
        document.querySelector('div.overlay').style.display = 'none';
        document.querySelector('div.newgame.dialog').style.display = 'none';
        playerCount = parseInt(playerCountInp.value);
        treasuresPerPlayer = parseInt(treasureCountInp.value);
        curplayer = 'p1';
        counter = 1;
        disabledInsert = 'canvas#placeholder';
        savedGameExists();
    })
);

// Displays game description
document.querySelectorAll('button#help').forEach((btn) => {
    btn.addEventListener('click', () => {
        const helpdiv = document.querySelector('div.help');
        helpdiv.style.display = 'grid';
        document.querySelector('div.overlay').style.display = 'block';

        const okBtn = document.querySelector('div.help button#ok');
        okBtn.addEventListener('click', () => {
            helpdiv.style.display = 'none';
            document.querySelector('div.overlay').style.display = 'none';
        });
    });
});

// Check the game parameters
function checkParameters() {
    playerCount = parseInt(playerCountInp.value);
    treasuresPerPlayer = parseInt(treasureCountInp.value);

    let validPlayerVal = playerCount >= 1 && playerCount <= 4 && !isNaN(playerCount);
    let validTreasureVal = treasuresPerPlayer >= 1 && treasuresPerPlayer <= 24 / playerCount && !isNaN(treasuresPerPlayer);

    if (!validPlayerVal || !validTreasureVal) {
        playerCountInp.style.border = '3px solid red';
        treasureCountInp.style.border = '3px solid red';

        if (!validPlayerVal) {
            document.querySelector('div#treasures').innerHTML = `Nem megfelelő játékosszám!`;
        } else {
            document.querySelector('div#treasures').innerHTML = `Játékosonkénti kincskártyák száma: (1 - ${24 / playerCount})`;
        }

        document.querySelector('div#invalidmsg').hidden = false;
        gameStartBtn.classList.remove('enabled');
        gameStartBtn.disabled = true;
    } else {
        playerCountInp.style.border = '3px solid white';
        treasureCountInp.style.border = '3px solid white';
        document.querySelector('div#treasures').innerHTML = `Játékosonkénti kincskártyák száma: (1 - ${24 / playerCount})`;

        document.querySelector('div#invalidmsg').hidden = true;
        gameStartBtn.classList.add('enabled');
        gameStartBtn.disabled = false;
    }
}

playerCountInp.addEventListener('input', checkParameters);
treasureCountInp.addEventListener('input', checkParameters);

// Starts the game
gameStartBtn.addEventListener('click', () => {
    document.querySelector('div#invalidmsg').hidden = true;
    document.querySelector('div.parameters').style.display = 'none';
    document.querySelector('div.extended-table').style.display = 'grid';
    document.querySelector('div.player-details').style.display = 'grid';

    document.querySelector('div.playersdiv').innerHTML = 'Játékosok';
    document.querySelector('div.treasuresdiv').innerHTML = 'Aktuális kincs';
    document.querySelector('div.collecteddiv').innerHTML = 'Összegyűjtve';
    document.querySelector('div.curplayertext').innerHTML = 'Aktuális játékos';
    document.querySelector('div.curelemtext').innerHTML = 'Aktuális elem';

    disabledInsert = 'canvas#placeholder';

    collectedTreasures = [0, 0, 0, 0];
    playerTreasures = [];

    generateTable();
    refreshTable();

    generateArrows();
    generateSpacing();

    generatePlayerDetails();
    placePlayers();

    generateTreasures();
    distributeTreasures();
    displayCurrentTreasure();
    refreshCollectedTreasures();

    curplayer = 'p1';
});

// Places the current element next to the arrow
document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
    elem.addEventListener('mouseover', placeCurelem);
});

// Removes the current element from the arrow
document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
    elem.addEventListener('mouseout', resetCurelem);
});

// Rotates the current element, disables context menu on right click
document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
    elem.addEventListener('contextmenu', disableContextMenu, false);
    elem.addEventListener('mousedown', rotateCurelem);
});

// Inserts elements
document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
    elem.addEventListener('click', insertCurelem);
    elem.addEventListener('click', replaceCurelem);
});
