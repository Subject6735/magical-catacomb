// Draws a cell
function generateCell(canvas, rotate) {
    canvas.width = cellSize;
    canvas.height = cellSize;

    let ctx = canvas.getContext('2d');

    ctx.moveTo(0, 0);
    ctx.lineTo(cellSize, 0);
    ctx.lineTo(cellSize, cellSize);
    ctx.lineTo(0, cellSize);
    ctx.lineTo(0, 0);
    ctx.fillStyle = cellWallColor;
    ctx.fill();

    ctx.moveTo(0, 0);
    ctx.lineTo(cellSize, 0);
    ctx.lineTo(cellSize, cellSize);
    ctx.lineTo(0, cellSize);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = cellBorderColor;
    ctx.stroke();

    if (canvas.classList.contains('straight')) drawStraight(ctx);
    if (canvas.classList.contains('curve')) drawCurve(ctx);
    if (canvas.classList.contains('intersection')) drawIntersect(ctx);

    if (rotate !== null) {
        canvas.style.transform = `rotate(${rotate}deg)`;
    }
}

// Draws a player
function drawPlayer(canvas, player, posx, posy) {
    if (player !== null && player !== 'null') {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(posx, posy, 10, 0, 2 * Math.PI);

        if (player === 'p1') {
            ctx.fillStyle = 'rgb(32, 155, 255)';
            ctx.strokeStyle = 'white';
        }
        if (player === 'p2') {
            ctx.fillStyle = 'rgb(115, 238, 43)';
            ctx.strokeStyle = 'white';
        }
        if (player === 'p3') {
            ctx.fillStyle = 'rgb(255, 81, 38)';
            ctx.strokeStyle = 'white';
        }
        if (player === 'p4') {
            ctx.fillStyle = 'rgb(255, 38, 244)';
            ctx.strokeStyle = 'white';
        } else {
            ctx.fillStyle = 'none';
            ctx.strokeStyle = 'none';
        }

        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(posx, posy, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath();
    } else {
        return;
    }
}

// Draws an arrow
function drawArrow(ctx) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 3, cellSize / 3);
    ctx.lineTo((cellSize / 3) * 2, cellSize / 2);
    ctx.lineTo(cellSize / 3, (cellSize / 3) * 2);
    ctx.lineTo(cellSize / 3 + cellSize / 12, cellSize / 2);
    ctx.lineTo(cellSize / 3, cellSize / 3);
    ctx.fillStyle = arrowColor;
    ctx.fill();
    ctx.closePath();
}

// Draws a straight path cell
function drawStraight(ctx) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 3, cellSize);
    ctx.lineTo(cellSize / 3, 0);
    ctx.lineTo((cellSize / 3) * 2, 0);
    ctx.lineTo((cellSize / 3) * 2, cellSize);
    ctx.lineTo(cellSize / 3, cellSize);
    ctx.fillStyle = cellPathColor;
    ctx.fill();
    ctx.closePath();
}

// Draws a curved path cell
function drawCurve(ctx) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 3, cellSize);
    ctx.lineTo(cellSize / 3, (cellSize / 3) * 2);
    ctx.bezierCurveTo(cellSize / 3, (cellSize / 3) * 2, cellSize / 3, cellSize / 3, (cellSize / 3) * 2, cellSize / 3);
    ctx.lineTo(cellSize, cellSize / 3);
    ctx.lineTo(cellSize, (cellSize / 3) * 2);
    ctx.lineTo((cellSize / 3) * 2, (cellSize / 3) * 2);
    ctx.lineTo((cellSize / 3) * 2, cellSize);
    ctx.fillStyle = cellPathColor;
    ctx.fill();
    ctx.closePath();
}

// Draws an intersection path cell
function drawIntersect(ctx) {
    ctx.beginPath();
    ctx.moveTo(cellSize / 3, cellSize);
    ctx.lineTo(cellSize / 3, 0);
    ctx.lineTo((cellSize / 3) * 2, 0);
    ctx.lineTo((cellSize / 3) * 2, cellSize / 3);
    ctx.lineTo(cellSize, cellSize / 3);
    ctx.lineTo(cellSize, (cellSize / 3) * 2);
    ctx.lineTo((cellSize / 3) * 2, (cellSize / 3) * 2);
    ctx.lineTo((cellSize / 3) * 2, cellSize);
    ctx.lineTo(cellSize / 3, cellSize);
    ctx.fillStyle = cellPathColor;
    ctx.fill();
    ctx.closePath();
}

// Draws the correct treasure on a cell
function drawTreasure(canvas, treasure) {
    let ctx = canvas.getContext('2d');

    if (treasure === 0 || treasure === 'diamond') {
        drawDiamond(ctx);
        canvas.setAttribute('treasure', 'diamond');
    } else if (treasure === 1 || treasure === 'emerald') {
        drawEmerald(ctx);
        canvas.setAttribute('treasure', 'emerald');
    } else if (treasure === 2 || treasure === 'amethyst') {
        drawAmethyst(ctx);
        canvas.setAttribute('treasure', 'amethyst');
    } else if (treasure === 3 || treasure === 'ruby') {
        drawRuby(ctx);
        canvas.setAttribute('treasure', 'ruby');
    }
}

// Draws a diamond treasure
function drawDiamond(ctx) {
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(20, 25);
    ctx.lineTo(30, 20);
    ctx.lineTo(40, 25);
    ctx.lineTo(30, 40);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgb(54, 197, 216)';
    ctx.fill();
    ctx.closePath();
}

// Draws an emerald treasure
function drawEmerald(ctx) {
    ctx.beginPath();
    ctx.moveTo(25, 40);
    ctx.lineTo(20, 35);
    ctx.lineTo(20, 25);
    ctx.lineTo(25, 20);
    ctx.lineTo(35, 20);
    ctx.lineTo(40, 25);
    ctx.lineTo(40, 35);
    ctx.lineTo(35, 40);
    ctx.lineTo(25, 40);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgb(39, 170, 78)';
    ctx.fill();
    ctx.closePath();
}

// Draws an amethyst treasure
function drawAmethyst(ctx) {
    ctx.beginPath();
    ctx.moveTo(20, 40);
    ctx.lineTo(20, 30);
    ctx.lineTo(25, 25);
    ctx.lineTo(35, 25);
    ctx.lineTo(40, 30);
    ctx.lineTo(40, 40);
    ctx.lineTo(20, 40);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgb(170, 25, 184)';
    ctx.fill();
    ctx.closePath();
}

// Draws a ruby treasure
function drawRuby(ctx) {
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(20, 25);
    ctx.lineTo(40, 25);
    ctx.lineTo(30, 40);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'rgb(161, 12, 19)';
    ctx.fill();
    ctx.closePath();
}
