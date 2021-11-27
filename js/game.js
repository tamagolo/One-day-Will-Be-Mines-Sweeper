'use strict'
console.log('Mines Sweeper - good luck!')

const MINE = '💣';
const BLOWN = '💥'
const FLAG = '🚩';
const EMPTY = '';
const LOST = '😣'
const WIN = '😎'
const START = '🙂'
const CLICK = '😮'


var gBoard = [];
var isclicked = false;
var gTimer = 0;

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    minesLeft: 0
}

function initGame() {
    gGame.isOn = true;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gGame.minesLeft = gLevel.MINES;
    gBoard = buildBoard(gLevel.SIZE);
    setMinesNegsCount(gBoard)
    if (gTimer != 0) clearInterval(gTimer);

    renderBoard(gBoard);
    gTimer = setInterval(setTimer, 1000);
    document.querySelector('.button').innerHTML = START;
    document.querySelector('.mines').innerHTML = gGame.minesLeft;
}

function buildBoard(size) {

    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {

            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
            cell['idxI'] = i;
            cell['idxJ'] = j;
            board[i][j] = cell
        }
    }

    for (var k = 0; k < gLevel.MINES; k++) {
        locatetMine(board);
    }

    return board;
}


function locatetMine(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var mine = board[getRandomInt(0, board.length)][getRandomInt(0, board[0].length)];
            if (mine.isMine) continue;
            else {
                mine.isMine = true
                return mine
            }
        }
    }
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (!cell.isMine) continue
            else cell.minesAroundCount = countkNegs(gBoard, i, j)
        }
    }
}

function countkNegs(mat, idxI, idxJ) {

    for (var i = idxI - 1; i <= idxI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = idxJ - 1; j <= idxJ + 1; j++) {
            if (i === idxI && j === idxJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            mat[i][j].minesAroundCount++
        }
    }
}


function renderBoard(board) {
    var strHtml = ``;
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += `<tr>`;
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // var className = (cell.isShown) ? `shown` : `hidden`;
            var strCell = (cell.isMine) ? MINE : EMPTY
            if (cell.minesAroundCount > 0) strCell = cell.minesAroundCount
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id=${tdId} class="cell"
            onclick="cellClicked(this, ${i}, ${j})"
            oncontextmenu="cellMarked(this, ${i}, ${j})"> ` + `${strCell} </td>`;
        }

        strHtml += `</tr>`;
    }
    var elMat = document.querySelector('.board-container');
    elMat.innerHTML = strHtml;
}


function renderCell(elCell) {
    elCell.style['content-visibility'] = 'visible';
    elCell.style['background-color'] = 'lightgrey';
}

function cellMarked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (cell.isShown) return;
    elCell.innerHTML = (cell.isMarked) ? ' ' : FLAG;
    cell.isMarked = !cell.isMarked;
    gGame.minesLeft += (cell.isMarked) ? -1 : 1;

    document.querySelector('.mines').innerHTML = gGame.minesLeft;
    elCell.style['content-visibility'] = 'visible';
}

function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    if (!gGame.isOn || cell.isShown || cell.isMarked) return;
    cell.isShown = true;
    if (cell.isMine) {
        gameOver(false)
        elCell.innerHTML = BLOWN;
    } else if (cell.minesAroundCount === 0) {
        expandShown(gBoard, i, j)
    } else
        gGame.shownCount++;
    checkGameOver();
    renderCell(elCell);
}

function gameOver(isWin) {
    gGame.isOn = false;
    var button = document.querySelector('.button');
    button.innerHTML = (isWin) ? WIN : LOST;
    clearInterval(gTimer);
    if (!isWin) revealAllMines(gBoard);

}

function checkGameOver() {
    if (gGame.shownCount === gLevel.SIZE ** 2 - gLevel.MINES)
        gameOver(true);
}

function revealAllMines(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) {
                cell.isShown = true
                var tdId = `cell-${i}-${j}`;
                var elCell = document.querySelector('#' + tdId);
                renderCell(elCell);

            }
        }
    }

}

function expandShown(board, i, j) {
    var tdId = `cell-${i}-${j}`;
    var elCell = document.querySelector('#' + tdId);
    board[i][j].isShown = true;
    gGame.shownCount++;
    renderCell(elCell);

    for (var a = i - 1; a <= i + 1; a++) {
        if (a < 0 || a >= board.length) continue;
        for (var b = j - 1; b <= j + 1; b++) {
            if (a === i && b === j) continue;
            if (b < 0 || b >= board[0].length) continue;
            var cell = board[a][b];
            if (cell.isShown || cell.isMine) continue
            cell.isShown = true;
            if (cell.minesAroundCount > 0) {
                var tdId = `cell-${a}-${b}`;
                var elCell = document.querySelector('#' + tdId);
                gGame.shownCount++;
                renderCell(elCell);
            } else { // minesAroundCount === 0
                expandShown(board, a, b);
            }

        }
    }

}

function setTimer() {
    var elGameTime = document.querySelector('.timer');
    elGameTime.innerHTML = gGame.secsPassed++;
}
