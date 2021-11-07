// Fills the adjacency matrix of the graph
function fillAdjacencyMatrix() {
    for (let i = 0; i < tableSize * tableSize; ++i) {
        const row = [];
        for (let j = 0; j < tableSize * tableSize; ++j) {
            row.push(0);
        }
        adjacencyMatrix.push(row);
    }

    for (let i = 0; i < tableSize; ++i) {
        for (let j = 0; j < tableSize; ++j) {
            let curvertex = parseInt(gameTable.querySelector(`canvas.cell[row='${i}'][col='${j}']`).getAttribute('vertex'));

            if (validCell(i - 1, j) && openPaths[i][j].top && openPaths[i - 1][j].bottom) {
                let topvertex = parseInt(gameTable.querySelector(`canvas.cell[row='${i - 1}'][col='${j}']`).getAttribute('vertex'));
                adjacencyMatrix[curvertex][topvertex] = 1;
            }
            if (validCell(i + 1, j) && openPaths[i][j].bottom && openPaths[i + 1][j].top) {
                let botvertex = parseInt(gameTable.querySelector(`canvas.cell[row='${i + 1}'][col='${j}']`).getAttribute('vertex'));
                adjacencyMatrix[curvertex][botvertex] = 1;
            }
            if (validCell(i, j - 1) && openPaths[i][j].left && openPaths[i][j - 1].right) {
                let leftvertex = parseInt(gameTable.querySelector(`canvas.cell[row='${i}'][col='${j - 1}']`).getAttribute('vertex'));
                adjacencyMatrix[curvertex][leftvertex] = 1;
            }
            if (validCell(i, j + 1) && openPaths[i][j].right && openPaths[i][j + 1].left) {
                let rightvertex = parseInt(gameTable.querySelector(`canvas.cell[row='${i}'][col='${j + 1}']`).getAttribute('vertex'));
                adjacencyMatrix[curvertex][rightvertex] = 1;
            }
        }
    }
}

// Graph breadth-first-search
function BFS(adjacencyMatrix, d, pi, s) {
    const n = tableSize * tableSize;

    for (let i = 0; i < n; ++i) {
        d[i] = undefined;
        pi[i] = 0;
    }

    let queue = [];
    d[s] = 0;

    queue.push(s);

    while (queue.length !== 0) {
        let u = queue.shift();

        for (let v = 0; v < n; ++v) {
            if (adjacencyMatrix[u][v] === 1) {
                if (d[v] === undefined) {
                    d[v] = d[u] + 1;
                    pi[v] = u;
                    queue.push(v);
                }
            }
        }
    }
}
