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

function updateCells(curelem, curelemCopy, firstCell, lastCell) {
    // Generate the canvas
    curelemCopy.getContext('2d').clearRect(0, 0, curelemCopy.width, curelemCopy.height);
    generateCell(curelemCopy, null);

    curelemCopy.classList.remove('curelem');

    // Check if the curelem had treasure
    let curelemTreasure = undefined;

    if (curelem.hasAttribute('treasure')) {
        curelemTreasure = curelem.getAttribute('treasure');
    }

    // Check if the last cell had players, then draw them on the cell
    if (lastCell.hasAttribute('players')) {
        let players = lastCell.getAttribute('players').split(',');
        generatePlayers(curelemCopy, players[0], players[1], players[2], players[3]);
        curelemCopy.setAttribute('players', lastCell.getAttribute('players'));
        lastCell.removeAttribute('players');
    }

    // Only draw the treasure after the players were drawn
    if (curelemTreasure !== undefined) {
        drawTreasure(curelemCopy, curelemTreasure);
    }

    firstCell.replaceWith(curelemCopy);

    let lastCellCopy = lastCell.cloneNode(true);

    lastCellCopy.getContext('2d').clearRect(0, 0, lastCellCopy.width, lastCellCopy.height);
    generateCell(lastCellCopy, null);

    lastCellCopy.classList.add('curelem');
    lastCellCopy.removeAttribute('row');
    lastCellCopy.removeAttribute('col');

    if (lastCell.hasAttribute('treasure')) {
        let treasure = lastCell.getAttribute('treasure');
        drawTreasure(lastCellCopy, treasure);
        lastCellCopy.setAttribute('treasure', treasure);
    }

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

            updateCells(curelem, curelemCopy, firstCell, lastCell);

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

            updateCells(curelem, curelemCopy, firstCell, lastCell);

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

            updateCells(curelem, curelemCopy, firstCell, lastCell);

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

            updateCells(curelem, curelemCopy, firstCell, lastCell);

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
