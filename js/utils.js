
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

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            if (!cell.isMine) continue
            else cell.minesAroundCount = countkNegs(gBoard, i, j)
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function getEmptyCell(board) {
    var emptyCells = [];

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j];
            if (!currCell.isMine) {
                var emptyCellPos = { i, j };
                emptyCells.push(emptyCellPos);
            }
        }
    }
    console.log(emptyCells)
    var randomIdx = getRandomInt(0, emptyCells.length);
    var emptyCell = emptyCells[randomIdx];
    return emptyCell;
}

function chekIsMine(board) {
    var mines = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; i < board[0].length; j++) {
            var mineCell = board[i][j]
            if (isMine) mines.push(mineCell)
        }
    }
    return mines
}


