// Places the element to the current arrow position on hover
const placeCurelem = (e) => {
    if (e.target.matches('canvas') && !e.target.matches(disabledInsert)) {
        const curelem = document.querySelector('canvas.curelem');
        const arrowpos = e.target.getAttribute('pos');

        if (e.target.parentNode.classList.contains('toprow')) {
            const spacing = document.querySelector('div.extended-table div.toparea');
            spacing.querySelectorAll('div').forEach((div) => {
                if (div.getAttribute('pos') === arrowpos) {
                    div.innerHTML = '';
                    const curelemCopy = curelem.cloneNode();
                    generateCell(curelemCopy, null);

                    if (curelemCopy.hasAttribute('treasure')) {
                        let treasure = curelemCopy.getAttribute('treasure');
                        drawTreasure(curelemCopy, treasure);
                    }

                    div.appendChild(curelemCopy);
                }
            });
        }

        if (e.target.parentNode.classList.contains('rightcol')) {
            const spacing = document.querySelector('div.extended-table div.rightarea');
            spacing.querySelectorAll('div').forEach((div) => {
                if (div.getAttribute('pos') === arrowpos) {
                    div.innerHTML = '';
                    const curelemCopy = curelem.cloneNode();
                    generateCell(curelemCopy, null);

                    if (curelemCopy.hasAttribute('treasure')) {
                        let treasure = curelemCopy.getAttribute('treasure');
                        drawTreasure(curelemCopy, treasure);
                    }

                    div.appendChild(curelemCopy);
                }
            });
        }

        if (e.target.parentNode.classList.contains('botrow')) {
            const spacing = document.querySelector('div.extended-table div.botarea');
            spacing.querySelectorAll('div').forEach((div) => {
                if (div.getAttribute('pos') === arrowpos) {
                    div.innerHTML = '';
                    const curelemCopy = curelem.cloneNode();
                    generateCell(curelemCopy, null);

                    if (curelemCopy.hasAttribute('treasure')) {
                        let treasure = curelemCopy.getAttribute('treasure');
                        drawTreasure(curelemCopy, treasure);
                    }

                    div.appendChild(curelemCopy);
                }
            });
        }

        if (e.target.parentNode.classList.contains('leftcol')) {
            const spacing = document.querySelector('div.extended-table div.leftarea');
            spacing.querySelectorAll('div').forEach((div) => {
                if (div.getAttribute('pos') === arrowpos) {
                    div.innerHTML = '';
                    const curelemCopy = curelem.cloneNode();
                    generateCell(curelemCopy, null);

                    if (curelemCopy.hasAttribute('treasure')) {
                        let treasure = curelemCopy.getAttribute('treasure');
                        drawTreasure(curelemCopy, treasure);
                    }

                    div.appendChild(curelemCopy);
                }
            });
        }
    }
};

// Places the element back if we leave the arrow
const resetCurelem = (e) => {
    if (e.target.matches('canvas') && !e.target.matches(disabledInsert)) {
        const curelem = document.querySelector('canvas.curelem');
        const curelemdiv = document.querySelector('div.player-details div.curelemdiv');
        curelemdiv.innerHTML = '';
        curelemdiv.appendChild(curelem);
    }
};

// Rotates element when we right click the arrows
const rotateCurelem = (e) => {
    if (e.target.matches('canvas') && !e.target.matches(disabledInsert) && e.which === 3) {
        const curelem = document.querySelector('canvas.curelem');
        curelem.style.transform = `rotate(${rotatedeg}deg)`;
        rotatedeg += 90;

        const curelemCopy = curelem.cloneNode();
        generateCell(curelemCopy, null);

        if (curelemCopy.hasAttribute('treasure')) {
            let treasure = curelemCopy.getAttribute('treasure');
            drawTreasure(curelemCopy, treasure);
        }

        const curelemdiv = document.querySelector('div.player-details div.curelemdiv');
        curelemdiv.innerHTML = '';
        curelemdiv.appendChild(curelemCopy);
    }
};

// Prevent contextmenu from showing
const disableContextMenu = (e) => {
    if (e.target.matches('canvas')) {
        e.preventDefault();
    }
};

function updateCells(curelemCopy, firstCell, lastCell) {
    const curelem = document.querySelector('canvas.curelem');

    generateCell(curelemCopy, null);

    if (curelemCopy.hasAttribute('treasure')) {
        let treasure = curelemCopy.getAttribute('treasure');
        drawTreasure(curelemCopy, treasure);
    }

    let treasure;
    let treasurePresent = false;

    if (lastCell.hasAttribute('treasure')) {
        treasure = lastCell.getAttribute('treasure');
        treasurePresent = true;
        lastCell.removeAttribute('treasure');
    }

    curelemCopy.classList.remove('curelem');

    if (lastCell.hasAttribute('players')) {
        let players = lastCell.getAttribute('players').split(',');

        generatePlayers(curelemCopy, players[0], players[1], players[2], players[3]);

        // Draw the treasure if the cell had one
        if (treasurePresent) {
            drawTreasure(curelemCopy, treasure);
        }

        curelemCopy.setAttribute('players', lastCell.getAttribute('players'));
        lastCell.removeAttribute('players');
    }

    firstCell.replaceWith(curelemCopy);

    let lastCellCopy = lastCell.cloneNode(true);
    generateCell(lastCellCopy, null);
    lastCellCopy.classList.add('curelem');
    lastCellCopy.removeAttribute('row');
    lastCellCopy.removeAttribute('col');

    lastCellCopy.setAttribute('treasure', treasure);
    drawTreasure(lastCellCopy, treasure);

    curelem.replaceWith(lastCellCopy);
}

// Inserts the current element to the table
const insertCurelem = (e) => {
    if (e.target.matches('canvas') && !e.target.matches(disabledInsert)) {
        disabledInsert = 'canvas#placeholder';

        const arrowpos = e.target.getAttribute('pos');
        const curelem = document.querySelector('canvas.curelem');

        if (e.target.parentNode.classList.contains('toprow')) {
            const cells = [...document.querySelectorAll(`canvas.cell[col='${arrowpos}']`)];
            const firstCell = document.querySelector(`canvas.cell[row='0'][col='${arrowpos}']`);
            const lastCell = document.querySelector(`canvas.cell[row='${tableSize - 1}'][col='${arrowpos}']`);
            const curelemCopy = curelem.cloneNode(true);

            updateCells(curelemCopy, firstCell, lastCell);

            for (let i = 1; i < tableSize; ++i) {
                const cell = document.querySelector(`canvas.cell[row='${i}'][col='${arrowpos}']`);
                cell.replaceWith(cells[i - 1]);
            }

            refreshTable();
            enableMoves();

            disabledInsert = `div.extended-table div.botrow canvas[pos='${arrowpos}']`;
        }

        if (e.target.parentNode.classList.contains('rightcol')) {
            const cells = [...document.querySelectorAll(`canvas.cell[row='${arrowpos}']`)];
            const firstCell = document.querySelector(`canvas.cell[row='${arrowpos}'][col='${tableSize - 1}']`);
            const lastCell = document.querySelector(`canvas.cell[row='${arrowpos}'][col='0']`);
            const curelemCopy = curelem.cloneNode(true);

            updateCells(curelemCopy, firstCell, lastCell);

            for (let j = tableSize - 2; j >= 0; --j) {
                const cell = document.querySelector(`canvas.cell[row='${arrowpos}'][col='${j}']`);
                cell.replaceWith(cells[j + 1]);
            }

            refreshTable();
            enableMoves();

            disabledInsert = `div.extended-table div.leftcol canvas[pos='${arrowpos}']`;
        }

        if (e.target.parentNode.classList.contains('botrow')) {
            const cells = [...document.querySelectorAll(`canvas.cell[col='${arrowpos}']`)];
            const firstCell = document.querySelector(`canvas.cell[row='${tableSize - 1}'][col='${arrowpos}']`);
            const lastCell = document.querySelector(`canvas.cell[row='0'][col='${arrowpos}']`);
            const curelemCopy = curelem.cloneNode(true);

            updateCells(curelemCopy, firstCell, lastCell);

            for (let i = tableSize - 2; i >= 0; --i) {
                const cell = document.querySelector(`canvas.cell[row='${i}'][col='${arrowpos}']`);
                cell.replaceWith(cells[i + 1]);
            }

            refreshTable();
            enableMoves();

            disabledInsert = `div.extended-table div.toprow canvas[pos='${arrowpos}']`;
        }

        if (e.target.parentNode.classList.contains('leftcol')) {
            const cells = [...document.querySelectorAll(`canvas.cell[row='${arrowpos}']`)];
            const firstCell = document.querySelector(`canvas.cell[row='${arrowpos}'][col='0']`);
            const lastCell = document.querySelector(`canvas.cell[row='${arrowpos}'][col='${tableSize - 1}']`);
            const curelemCopy = curelem.cloneNode(true);

            updateCells(curelemCopy, firstCell, lastCell);

            for (let j = 1; j < tableSize; ++j) {
                const cell = document.querySelector(`canvas.cell[row='${arrowpos}'][col='${j}']`);
                cell.replaceWith(cells[j - 1]);
            }

            refreshTable();
            enableMoves();

            disabledInsert = `div.extended-table div.rightcol canvas[pos='${arrowpos}']`;
        }

        const btnnew = document.querySelector('div.player-details button#new');
        btnnew.disabled = true;
        btnnew.classList.remove('enabled');

        const btnsave = document.querySelector('div.player-details button#save');
        btnsave.disabled = true;
        btnsave.classList.remove('enabled');

        const btnload = document.querySelector('div.player-details button#load');
        btnload.disabled = true;
        btnload.classList.remove('enabled');
    }
};

// Replaces the new current element after we click an arrow
const replaceCurelem = () => {
    const curelem = document.querySelector('canvas.curelem');
    const curelemDiv = document.querySelector('div.curelemdiv');
    curelemDiv.innerHTML = '';
    curelemDiv.appendChild(curelem);
};
