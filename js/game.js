'use strict'
console.log('Mines Sweeper - good luck!')

const MINE = '💣';
const BLOWN = '💥'
const FLAG = '🚩';
const EMPTY = '';

var gBoard = [];
var isclicked = false;

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}


function initGame() {
    buildBoard(gLevel.SIZE);
    setMinesNegsCount(gBoard)
    console.log('gBoard', gBoard)
    renderBoard(gBoard);
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
                isMarked: true,
            }
            cell['idxI'] = i;
            cell['idxJ'] = j;
            board[i][j] = cell
        }
    }

    for (var k = 0; k < gLevel.MINES; k++) {
        locatetMine(board);
    }



    return gBoard = board;
}

function cellClicked(elCell, i, j) {
    gGame.isOn = true;
    elCell.isShown = true;
    var cell = gBoard[i][j];
    if (cell.isMine) {
        elCell.innerHTML = BLOWN;
        h(cell.style['content-visibility'] = 'visible');
        checkGameOver();
        console.log('boooom!')
    } else if (cell.minesAroundCount === 0) {

    }

    elCell.style['content-visibility'] = 'visible';
    console.log(elCell);
}


function setMines(board) {
    for (var k = 0; k < gLevel.MINES; k++) {
        locatetMine(board);
    }

}


function renderBoard(board) {
    var strHtml = ``;
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += `<tr>`;
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            var className = (cell.isMine) ? `mine` : `empty`;
            var strCell = (cell.isMine) ? MINE : EMPTY
            if (cell.minesAroundCount > 0) strCell = cell.minesAroundCount
            var tdId = `cell-${i}-${j}`;
            strHtml += `<td id=${tdId} class="${className}" 
                            onclick="cellClicked(this, ${i}, ${j})"> ` + `${strCell} </td>`;
        }

        strHtml += `</tr>`;
    }
    var elMat = document.querySelector('.board-container');
    elMat.innerHTML = strHtml;
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


function checkNegs(mat, i, j) {
    
    for (var a = i - 1; a <= i + 1; a++) {
        if (a < 0 || i >= mat.length) continue;
        for (var b = j - 1; b <= j + 1; j++) {
            if (a === i && b === j) continue;
            if (b < 0 || b >= mat[a].length) continue;
            var cell = mat[a][b];
            if (cell.isShown) continue
            if (cell.isMine) return
            if (!cell.isMine) cell.isShown = true;
        }
    }

}



function cellMarked(elCell) {


}

function checkGameOver() {



}

function expandShown(board, elCell, i, j) {

}
