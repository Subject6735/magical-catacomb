// Get current player position
function getCurrentPlayerPosition() {
    gameTable.querySelectorAll('canvas.cell').forEach((cell) => {
        if (cell.hasAttribute('players')) {
            let players = cell.getAttribute('players').split(',');
            if (players.includes(curplayer)) {
                curPlayerCell = cell;
                curPlayerPos = openPaths[parseInt(cell.getAttribute('row'))][parseInt(cell.getAttribute('col'))];
            }
        }
    });
}

// Moves the players
const movePlayer = (e) => {
    if (availableCells.includes(e.target)) {
        let players = curPlayerCell.getAttribute('players').split(',');

        let targetplayers = [null, null, null, null];
        if (e.target.hasAttribute('players')) targetplayers = e.target.getAttribute('players').split(',');

        if (curplayer === 'p1') {
            if (curPlayerCell !== e.target) {
                generatePlayers(curPlayerCell, null, players[1], players[2], players[3]);
                generatePlayers(e.target, players[0], targetplayers[1], targetplayers[2], targetplayers[3]);
                curPlayerCell.setAttribute('players', `null,${players[1]},${players[2]},${players[3]}`);
                e.target.setAttribute('players', `${players[0]},${targetplayers[1]},${targetplayers[2]},${targetplayers[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    drawTreasure(curPlayerCell, curPlayerCell.getAttribute('treasure'));
                }

                if (e.target.hasAttribute('treasure')) {
                    let treasure = e.target.getAttribute('treasure');

                    if (treasure === playerTreasures[0][0]) {
                        playerTreasures[0].reverse().pop();
                        playerTreasures[0].reverse();
                        ++collectedTreasures[0];
                        e.target.removeAttribute('treasure');
                    } else {
                        drawTreasure(e.target, treasure);
                    }
                }
            } else {
                generatePlayers(curPlayerCell, players[0], targetplayers[1], targetplayers[2], targetplayers[3]);
                curPlayerCell.setAttribute('players', `${players[0]},${targetplayers[1]},${targetplayers[2]},${targetplayers[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    let treasure = curPlayerCell.getAttribute('treasure');

                    if (treasure === playerTreasures[0][0]) {
                        playerTreasures[0].reverse().pop();
                        playerTreasures[0].reverse();
                        ++collectedTreasures[0];
                        curPlayerCell.removeAttribute('treasure');
                    } else {
                        drawTreasure(curPlayerCell, treasure);
                    }
                }
            }

            const p1start = `canvas.cell[row='0'][col='0']`;
            const winnerdiv = document.querySelector('div.winner');

            if (collectedTreasures[0] === treasuresPerPlayer && e.target.matches(p1start)) {
                winnerdiv.querySelector('div.player').innerHTML = `Player 1 won!`;
                winnerdiv.style.display = 'grid';
                document.querySelector('div.overlay').style.display = 'block';
            }
        }
        if (curplayer === 'p2') {
            if (curPlayerCell !== e.target) {
                generatePlayers(curPlayerCell, players[0], null, players[2], players[3]);
                generatePlayers(e.target, targetplayers[0], players[1], targetplayers[2], targetplayers[3]);
                curPlayerCell.setAttribute('players', `${players[0]},null,${players[2]},${players[3]}`);
                e.target.setAttribute('players', `${targetplayers[0]},${players[1]},${targetplayers[2]},${targetplayers[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    drawTreasure(curPlayerCell, curPlayerCell.getAttribute('treasure'));
                }

                if (e.target.hasAttribute('treasure')) {
                    let treasure = e.target.getAttribute('treasure');

                    if (treasure === playerTreasures[1][0]) {
                        playerTreasures[1].reverse().pop();
                        playerTreasures[1].reverse();
                        ++collectedTreasures[1];
                        e.target.removeAttribute('treasure');
                    } else {
                        drawTreasure(e.target, treasure);
                    }
                }
            } else {
                generatePlayers(curPlayerCell, targetplayers[0], players[1], targetplayers[2], targetplayers[3]);
                curPlayerCell.setAttribute('players', `${targetplayers[0]},${players[1]},${targetplayers[2]},${targetplayers[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    let treasure = curPlayerCell.getAttribute('treasure');

                    if (treasure === playerTreasures[1][0]) {
                        playerTreasures[1].reverse().pop();
                        playerTreasures[1].reverse();
                        ++collectedTreasures[1];
                        curPlayerCell.removeAttribute('treasure');
                    } else {
                        drawTreasure(curPlayerCell, treasure);
                    }
                }
            }

            const p2start = `canvas.cell[row='0'][col='${tableSize - 1}']`;
            const winnerdiv = document.querySelector('div.winner');

            if (collectedTreasures[1] === treasuresPerPlayer && e.target.matches(p2start)) {
                winnerdiv.querySelector('div.player').innerHTML = `Player 2 won!`;
                winnerdiv.style.display = 'grid';
                document.querySelector('div.overlay').style.display = 'block';
            }
        }
        if (curplayer === 'p3') {
            if (curPlayerCell !== e.target) {
                generatePlayers(curPlayerCell, players[0], players[1], null, players[3]);
                generatePlayers(e.target, targetplayers[0], targetplayers[1], players[2], targetplayers[3]);
                curPlayerCell.setAttribute('players', `${players[0]},${players[1]},null,${players[3]}`);
                e.target.setAttribute('players', `${targetplayers[0]},${targetplayers[1]},${players[2]},${targetplayers[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    drawTreasure(curPlayerCell, curPlayerCell.getAttribute('treasure'));
                }

                if (e.target.hasAttribute('treasure')) {
                    let treasure = e.target.getAttribute('treasure');

                    if (treasure === playerTreasures[2][0]) {
                        playerTreasures[2].reverse().pop();
                        playerTreasures[2].reverse();
                        ++collectedTreasures[2];
                        e.target.removeAttribute('treasure');
                    } else {
                        drawTreasure(e.target, treasure);
                    }
                }
            } else {
                generatePlayers(curPlayerCell, targetplayers[0], targetplayers[1], players[2], targetplayers[3]);
                curPlayerCell.setAttribute('players', `${targetplayers[0]},${targetplayers[1]},${players[2]},${targetplayers[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    let treasure = curPlayerCell.getAttribute('treasure');

                    if (treasure === playerTreasures[2][0]) {
                        playerTreasures[2].reverse().pop();
                        playerTreasures[2].reverse();
                        ++collectedTreasures[2];
                        curPlayerCell.removeAttribute('treasure');
                    } else {
                        drawTreasure(curPlayerCell, treasure);
                    }
                }
            }

            const p3start = `canvas.cell[row='${tableSize - 1}'][col='0']`;
            const winnerdiv = document.querySelector('div.winner');

            if (collectedTreasures[2] === treasuresPerPlayer && e.target.matches(p3start)) {
                winnerdiv.querySelector('div.player').innerHTML = `Player 3 won!`;
                winnerdiv.style.display = 'grid';
                document.querySelector('div.overlay').style.display = 'block';
            }
        }
        if (curplayer === 'p4') {
            if (curPlayerCell !== e.target) {
                generatePlayers(curPlayerCell, players[0], players[1], players[2], null);
                generatePlayers(e.target, targetplayers[0], targetplayers[1], targetplayers[2], players[3]);
                curPlayerCell.setAttribute('players', `${players[0]},${players[1]},${players[2]},null`);
                e.target.setAttribute('players', `${targetplayers[0]},${targetplayers[1]},${targetplayers[2]},${players[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    drawTreasure(curPlayerCell, curPlayerCell.getAttribute('treasure'));
                }

                if (e.target.hasAttribute('treasure')) {
                    let treasure = e.target.getAttribute('treasure');

                    if (treasure === playerTreasures[3][0]) {
                        playerTreasures[3].reverse().pop();
                        playerTreasures[3].reverse();
                        ++collectedTreasures[3];
                        e.target.removeAttribute('treasure');
                    } else {
                        drawTreasure(e.target, treasure);
                    }
                }
            } else {
                generatePlayers(curPlayerCell, targetplayers[0], targetplayers[1], targetplayers[2], players[3]);
                curPlayerCell.setAttribute('players', `${targetplayers[0]},${targetplayers[1]},${targetplayers[2]},${players[3]}`);

                if (curPlayerCell.hasAttribute('treasure')) {
                    let treasure = curPlayerCell.getAttribute('treasure');

                    if (treasure === playerTreasures[3][0]) {
                        playerTreasures[3].reverse().pop();
                        playerTreasures[3].reverse();
                        ++collectedTreasures[3];
                        curPlayerCell.removeAttribute('treasure');
                    } else {
                        drawTreasure(curPlayerCell, treasure);
                    }
                }
            }

            const p4start = `canvas.cell[row='${tableSize - 1}'][col='${tableSize - 1}']`;
            const winnerdiv = document.querySelector('div.winner');

            if (collectedTreasures[3] === treasuresPerPlayer && e.target.matches(p4start)) {
                winnerdiv.querySelector('div.player').innerHTML = `Player 4 won!`;
                winnerdiv.style.display = 'grid';
                document.querySelector('div.overlay').style.display = 'block';
            }
        }

        refreshCollectedTreasures();
        displayCurrentTreasure();

        ++counter;
        if (curplayer === `p${playerCount}`) {
            curplayer = 'p1';
            counter = 1;
        } else {
            curplayer = `p${counter}`;
        }

        refreshCurPlayer();

        document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
            elem.addEventListener('mouseover', placeCurelem);
        });

        document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
            elem.addEventListener('mouseout', resetCurelem);
        });

        document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
            elem.addEventListener('mousedown', rotateCurelem);
        });

        document.querySelectorAll('div.extended-table div.border canvas').forEach((elem) => {
            elem.style.opacity = '1';
            elem.style.cursor = 'pointer';
        });

        document.querySelector(disabledInsert).style.opacity = '0.5';
        document.querySelector(disabledInsert).style.cursor = 'not-allowed';

        document.querySelectorAll('div.extended-table div.border').forEach((elem) => elem.addEventListener('click', insertCurelem));

        gameTable.querySelectorAll('canvas.cell').forEach((cell) => {
            cell.style.opacity = '1';
            cell.style.cursor = 'initial';
            cell.removeEventListener('click', movePlayer);
        });

        const btnnew = document.querySelector('div.player-details button#new');
        btnnew.disabled = false;
        btnnew.classList.add('enabled');

        const btnsave = document.querySelector('div.player-details button#save');
        btnsave.disabled = false;
        btnsave.classList.add('enabled');

        const btnload = document.querySelector('div.player-details button#load');
        btnload.disabled = false;
        btnload.classList.add('enabled');

        savedGameExists();
    }
};

// Displays the cells where the player can move
function enableMoves() {
    adjacencyMatrix = [];
    fillAdjacencyMatrix();

    getCurrentPlayerPosition();

    let d = [];
    let pi = [];
    let s = parseInt(curPlayerCell.getAttribute('vertex'));

    BFS(adjacencyMatrix, d, pi, s);

    vertices = [];

    for (let i = 0; i < d.length; ++i) {
        if (d[i] !== undefined) {
            vertices.push(i);
        }
    }

    availableCells = [];

    vertices.forEach((elem) => availableCells.push(gameTable.querySelector(`canvas.cell[vertex='${elem}']`)));

    gameTable.querySelectorAll('canvas.cell').forEach((cell) => {
        cell.style.opacity = '0.5';
        cell.style.cursor = 'not-allowed';
    });

    availableCells.forEach((cell) => {
        cell.style.opacity = '1';
        cell.style.cursor = 'pointer';
    });

    document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
        elem.removeEventListener('mouseover', placeCurelem);
    });

    document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
        elem.removeEventListener('mouseout', resetCurelem);
    });

    document.querySelectorAll('div.extended-table div.border').forEach((elem) => {
        elem.removeEventListener('mousedown', rotateCurelem);
    });

    document.querySelectorAll('div.extended-table div.border canvas').forEach((elem) => {
        elem.style.opacity = '0.5';
        elem.style.cursor = 'not-allowed';
    });

    document.querySelectorAll('div.extended-table div.border').forEach((elem) => elem.removeEventListener('click', insertCurelem));
    gameTable.querySelectorAll('canvas.cell').forEach((cell) => cell.addEventListener('click', movePlayer));
}
