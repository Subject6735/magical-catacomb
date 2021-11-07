// Generates the table
function generateTable() {
    straightCellCount = 13;
    curvedCellCount = 15;
    intersectionCellCount = 6;

    for (let i = 0; i < tableSize; ++i) {
        for (let j = 0; j < tableSize; ++j) {
            let gameTableCell = document.createElement('canvas');

            gameTableCell.classList.add('cell');

            if (i % 2 == 0 && j % 2 == 0) {
                gameTableCell.classList.add('fixed-cell');

                if (i === 0 && j === 0) {
                    gameTableCell.classList.add('curve');
                    generateCell(gameTableCell, 0);
                }

                if (i === 0 && j === tableSize - 1) {
                    gameTableCell.classList.add('curve');
                    generateCell(gameTableCell, 90);
                }

                if (i === tableSize - 1 && j === tableSize - 1) {
                    gameTableCell.classList.add('curve');
                    generateCell(gameTableCell, 180);
                }

                if (i === tableSize - 1 && j === 0) {
                    gameTableCell.classList.add('curve');
                    generateCell(gameTableCell, 270);
                }

                if (i === 0 && j !== 0 && j !== tableSize - 1) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 90);
                }

                if (i === tableSize - 1 && j !== 0 && j !== tableSize - 1) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 270);
                }

                if (j === 0 && i !== 0 && i !== tableSize - 1) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 0);
                }

                if (j === tableSize - 1 && i !== 0 && i !== tableSize - 1) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 180);
                }

                if (i === 2 && j === 2) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 0);
                }

                if (i === 2 && j === 4) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 90);
                }

                if (i === 4 && j === 2) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 270);
                }

                if (i === 4 && j === 4) {
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, 180);
                }
            } else {
                let rand = Math.floor(Math.random() * 3);

                if (curvedCellCount === 0 && intersectionCellCount === 0) {
                    rand = 0;
                }
                if (straightCellCount === 0 && intersectionCellCount === 0) {
                    rand = 1;
                }
                if (straightCellCount === 0 && curvedCellCount === 0) {
                    rand = 2;
                }

                if (straightCellCount !== 0 && curvedCellCount !== 0 && intersectionCellCount === 0) {
                    let r = Math.floor(Math.random() * 2);
                    if (r === 0) {
                        rand = 0;
                    } else {
                        rand = 1;
                    }
                }
                if (straightCellCount !== 0 && curvedCellCount === 0 && intersectionCellCount !== 0) {
                    let r = Math.floor(Math.random() * 2);
                    if (r === 0) {
                        rand = 0;
                    } else {
                        rand = 2;
                    }
                }
                if (straightCellCount === 0 && curvedCellCount !== 0 && intersectionCellCount !== 0) {
                    let r = Math.floor(Math.random() * 2);
                    if (r === 0) {
                        rand = 1;
                    } else {
                        rand = 2;
                    }
                }

                if (rand === 0) {
                    const transform = [90, 180, 270];
                    let t = Math.floor(Math.random() * 3);
                    gameTableCell.classList.add('straight');
                    generateCell(gameTableCell, transform[t]);
                    --straightCellCount;
                }
                if (rand === 1) {
                    const transform = [90, 180, 270];
                    let t = Math.floor(Math.random() * 3);
                    gameTableCell.classList.add('curve');
                    generateCell(gameTableCell, transform[t]);
                    --curvedCellCount;
                }
                if (rand === 2) {
                    const transform = [90, 180, 270];
                    let t = Math.floor(Math.random() * 3);
                    gameTableCell.classList.add('intersection');
                    generateCell(gameTableCell, transform[t]);
                    --intersectionCellCount;
                }
            }

            gameTable.appendChild(gameTableCell);
        }
    }

    const curelemdiv = document.querySelector('div.player-details div.curelemdiv');
    const cell = document.createElement('canvas');
    cell.classList.add('curelem');

    if (straightCellCount === 1) {
        cell.classList.add('cell', 'straight');
        const transform = [90, 180, 270];
        let t = Math.floor(Math.random() * 3);
        generateCell(cell, transform[t]);
    }

    if (curvedCellCount === 1) {
        cell.classList.add('cell', 'curve');
        const transform = [90, 180, 270];
        let t = Math.floor(Math.random() * 3);
        generateCell(cell, transform[t]);
    }

    if (intersectionCellCount === 1) {
        cell.classList.add('cell', 'intersection');
        const transform = [90, 180, 270];
        let t = Math.floor(Math.random() * 3);
        generateCell(cell, transform[t]);
    }

    curelemdiv.appendChild(cell);
}

// Generates the arrows to the sides
function generateArrows() {
    document.querySelectorAll('div.extended-table div.border').forEach((div) => {
        for (let i = 0; i < tableSize; ++i) {
            if (i % 2 == 0) {
                const space = document.createElement('div');
                space.setAttribute('pos', i);
                space.style.width = cellSize;
                space.style.height = cellSize;

                if (div.classList.contains('toprow')) space.classList.add('toprowpos');
                else if (div.classList.contains('botrow')) space.classList.add('botrowpos');
                else if (div.classList.contains('rightcol')) space.classList.add('rightcolpos');
                else if (div.classList.contains('leftcol')) space.classList.add('leftcolpos');

                div.appendChild(space);
            } else {
                const canvas = document.createElement('canvas');
                canvas.setAttribute('pos', i);
                canvas.width = cellSize;
                canvas.height = cellSize;

                if (div.classList.contains('toprow')) canvas.classList.add('toprowpos');
                else if (div.classList.contains('botrow')) canvas.classList.add('botrowpos');
                else if (div.classList.contains('rightcol')) canvas.classList.add('rightcolpos');
                else if (div.classList.contains('leftcol')) canvas.classList.add('leftcolpos');

                drawArrow(canvas.getContext('2d'));
                div.appendChild(canvas);
            }
        }
    });
}

// Generates spacing between table and arrows
function generateSpacing() {
    document.querySelectorAll('div.extended-table div.spacing').forEach((div) => {
        for (let i = 0; i < tableSize; ++i) {
            const space = document.createElement('div');
            space.setAttribute('pos', i);
            space.style.width = cellSize;
            space.style.height = cellSize;

            if (div.classList.contains('toparea')) space.classList.add('topareapos');
            else if (div.classList.contains('botarea')) space.classList.add('botareapos');
            else if (div.classList.contains('rightarea')) space.classList.add('rightareapos');
            else if (div.classList.contains('leftarea')) space.classList.add('leftareapos');

            div.appendChild(space);
        }
    });
}

// Generates the treasures on the table
function generateTreasures() {
    let treasureCount = playerCount * treasuresPerPlayer;

    let noCornerCells = [];
    gameTable.querySelectorAll('canvas.cell').forEach((cell) => {
        let row = parseInt(cell.getAttribute('row'));
        let col = parseInt(cell.getAttribute('col'));
        let corner = (row === 0 && col === 0) || (row === tableSize - 1 && col === tableSize - 1) || (row === 0 && col === tableSize - 1) || (row === tableSize - 1 && col === 0);
        if (!corner) {
            noCornerCells.push(cell);
        }
    });

    let n = noCornerCells.length;

    for (let i = 0; i < treasureCount; ++i) {
        let rand = Math.floor(Math.random() * n);

        let randTreasure = Math.floor(Math.random() * 4);
        drawTreasure(noCornerCells[rand], randTreasure);

        noCornerCells = noCornerCells.filter((cell) => cell !== noCornerCells[rand]);

        n = noCornerCells.length;
    }
}

// Distributes the treasures randomly between players
function distributeTreasures() {
    gameTable.querySelectorAll('canvas.cell').forEach((cell) => {
        if (cell.hasAttribute('treasure')) {
            allTreasures.push(cell);
        }
    });

    let n = allTreasures.length;

    for (let i = 0; i < playerCount; ++i) {
        let curplayerTreasures = [];

        for (let j = 0; j < treasuresPerPlayer; ++j) {
            let rand = Math.floor(Math.random() * n);

            curplayerTreasures.push(allTreasures[rand].getAttribute('treasure'));
            allTreasures = allTreasures.filter((t) => t !== allTreasures[rand]);

            n = allTreasures.length;
        }

        playerTreasures.push(curplayerTreasures);
    }
}

// Generates up to four players on a cell
function generatePlayers(canvas, p1, p2, p3, p4) {
    generateCell(canvas, null);

    let transformation = [...canvas.style.transform.toString()].splice(0, 6).join('');

    let rotateNum = getRotateNum(canvas.style.transform);

    if (transformation === 'rotate' && (rotateNum === 0 || rotateNum % 360 === 0)) {
        drawPlayer(canvas, p1, 15, 15);
        drawPlayer(canvas, p2, 45, 15);
        drawPlayer(canvas, p3, 15, 45);
        drawPlayer(canvas, p4, 45, 45);
    }
    if (transformation === 'rotate' && (rotateNum === 90 || rotateNum % 360 === 90)) {
        drawPlayer(canvas, p1, 15, 45);
        drawPlayer(canvas, p2, 15, 15);
        drawPlayer(canvas, p3, 45, 45);
        drawPlayer(canvas, p4, 45, 15);
    }
    if (transformation === 'rotate' && (rotateNum === 180 || rotateNum % 360 === 180)) {
        drawPlayer(canvas, p1, 45, 45);
        drawPlayer(canvas, p2, 15, 45);
        drawPlayer(canvas, p3, 45, 15);
        drawPlayer(canvas, p4, 15, 15);
    }
    if (transformation === 'rotate' && (rotateNum === 270 || rotateNum % 360 === 270)) {
        drawPlayer(canvas, p1, 45, 15);
        drawPlayer(canvas, p2, 45, 45);
        drawPlayer(canvas, p3, 15, 15);
        drawPlayer(canvas, p4, 15, 45);
    }

    canvas.setAttribute('players', `${p1},${p2},${p3},${p4}`);
}

// Places the players
function placePlayers() {
    const firstCorner = document.querySelector(`canvas.cell[row='0'][col='0']`);
    const secondCorner = document.querySelector(`canvas.cell[row='0'][col='${tableSize - 1}']`);
    const thirdCorner = document.querySelector(`canvas.cell[row='${tableSize - 1}'][col='0']`);
    const fourthCorner = document.querySelector(`canvas.cell[row='${tableSize - 1}'][col='${tableSize - 1}']`);

    if (playerCount === 1) {
        generatePlayers(firstCorner, 'p1', null, null, null);
        firstCorner.setAttribute('players', 'p1,null,null,null');
    }
    if (playerCount === 2) {
        generatePlayers(firstCorner, 'p1', null, null, null);
        generatePlayers(secondCorner, null, 'p2', null, null);
        firstCorner.setAttribute('players', 'p1,null,null,null');
        secondCorner.setAttribute('players', 'null,p2,null,null');
    }
    if (playerCount === 3) {
        generatePlayers(firstCorner, 'p1', null, null, null);
        generatePlayers(secondCorner, null, 'p2', null, null);
        generatePlayers(thirdCorner, null, null, 'p3', null);
        firstCorner.setAttribute('players', 'p1,null,null,null');
        secondCorner.setAttribute('players', 'null,p2,null,null');
        thirdCorner.setAttribute('players', 'null,null,p3,null');
    }
    if (playerCount === 4) {
        generatePlayers(firstCorner, 'p1', null, null, null);
        generatePlayers(secondCorner, null, 'p2', null, null);
        generatePlayers(thirdCorner, null, null, 'p3', null);
        generatePlayers(fourthCorner, null, null, null, 'p4');
        firstCorner.setAttribute('players', 'p1,null,null,null');
        secondCorner.setAttribute('players', 'null,p2,null,null');
        thirdCorner.setAttribute('players', 'null,null,p3,null');
        fourthCorner.setAttribute('players', 'null,null,null,p4');
    }
}

// Generates the player details section
function generatePlayerDetails() {
    const playerDetails = document.querySelector('div.player-details');

    for (let i = 0; i < playerCount; ++i) {
        const player = document.createElement('div');
        player.classList.add(`player${i + 1}`);
        player.style.gridArea = `p${i + 1}`;
        player.style.display = 'flex';
        player.style.alignItems = 'center';

        const playerIcon = document.createElement('canvas');
        playerIcon.width = 60;
        playerIcon.height = 60;
        drawPlayer(playerIcon, `p${i + 1}`, 30, 30);
        player.appendChild(playerIcon);

        const playerName = document.createElement('div');
        playerName.innerHTML = `Játékos ${i + 1}`;
        player.appendChild(playerName);

        const treasure = document.createElement('div');
        treasure.classList.add(`treasure${i + 1}`);
        treasure.style.gridArea = `t${i + 1}`;

        const collected = document.createElement('div');
        collected.classList.add(`coll${i + 1}`);
        collected.style.gridArea = `c${i + 1}`;

        playerDetails.appendChild(player);
        playerDetails.appendChild(treasure);
        playerDetails.appendChild(collected);
    }

    const curplayerdiv = document.querySelector('div.curplayer');
    curplayerdiv.style.display = 'flex';
    curplayerdiv.style.alignItems = 'center';

    const playerIcon1 = document.createElement('canvas');
    playerIcon1.width = 60;
    playerIcon1.height = 60;
    drawPlayer(playerIcon1, `p1`, 30, 30);
    curplayerdiv.appendChild(playerIcon1);

    const playerName1 = document.createElement('div');
    playerName1.innerHTML = `Játékos 1`;
    curplayerdiv.appendChild(playerName1);
}
