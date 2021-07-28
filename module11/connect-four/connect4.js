// Fresh Start
// ___________________________________________________________________________________________________________________________
// ---------------------------------------------------------------------------------------------------------------------------
// ___________________________________________________________________________________________________________________________

// (Done)Initial set up
const rayOfRays = [["ray0", []], ["ray1", []], ["ray2", []], ["ray3", []], ["ray4", []], ["ray5", []], ["ray6", []]];
const rayMap = new Map(rayOfRays);
const winCheck = new Set([1, 2, 3]);
const DOMcolumns = [];
const resetButton = document.getElementById('newGame')
resetButton.addEventListener("click", reset)
const cells = document.querySelectorAll('.cell')
let tieGameCount = 0

function setDOM() {
  for (let i = 0; i <= 6; i++) {
    DOMcolumns.push(document.getElementById(`${i}`));
    DOMcolumns[i].addEventListener("click", placePiece);
  };
};

// check localStorage
function checkLocal() {
  if (JSON.parse(localStorage.getItem('savedGame')) !== null) {
    let retrieveSave = JSON.parse(localStorage.getItem('savedGame'));
    for (let c = 0; c <= 6; c++) {
      let curColumn = retrieveSave[c];
      for (let i = 0; i <= 5; i++) {
        if (curColumn[i] !== undefined) {
          document.getElementById(`ray${c}_i${i}`).className = `${curColumn[i]}`;
          let curRay = rayMap.get(`ray${c}`);
          curRay.push(curColumn[i]);
        };
      }
    }
  }
}


// (Done) set turn
const playerTurn = document.getElementById('whosTurn')
playerTurn.innerHTML = "It's Red's Turn";
let color = "red";


// (Done) Switches the player after click
function playerSwitch() {
  if (color === "red") {
    color = "black";
    playerTurn.innerHTML = "It's Black's Turn";
    return;
  }
  else {
    color = "red";
    playerTurn.innerHTML = "It's Red's Turn";
    return;
  }
};

// // FUNCTION -reset game
function reset() {
  for (let i = 4; i <= winCheck.size; i++) {
    winCheck.delete(i);
  }

  for (let i = 0; i <= 6; i++) {
    rayMap.set(`ray${i}`, []);
  }

  for (let i = 0; i < cells.length; i++) {
    cells[i].setAttribute("class", 'cell');
  }
  color = "red";
  tieGameCount = 0;
  setDOM();
  localStorage.setItem("savedGame", null);
}

// // FUNCTION -win
function win() {
  alert(`${color} looses!!! Can't you do anything right?!`);
}


// // FUNCTION (done)check number of connections
function checkConnect(pickedColumn, indxOrigin, cDirection, incline) {
  let origin = rayMap.get(`ray${pickedColumn}`);
  let matchCount = 0
  let invMatchCount = 0

  for (let i = 1; i <= 3; i++) {
    let columnMath = pickedColumn + cDirection * i;
    let invColumnMath = pickedColumn - cDirection * i;
    let indxMath = indxOrigin + incline * i;
    let invIndxMath = indxOrigin - incline * i

    let columnToLeft = rayMap.get(`ray${invColumnMath}`);
    let columnToRight = rayMap.get(`ray${columnMath}`);

    if ((columnMath <= 6) && (origin[indxOrigin] === columnToRight[indxMath]) && (matchCount === i - 1) && (cDirection !== 0)) {
      matchCount++;
    };

    if ((invColumnMath > -1) && (origin[indxOrigin] === columnToLeft[invIndxMath]) && (invMatchCount == i - 1)) {
      invMatchCount++;
    };

  }
  return matchCount + invMatchCount + 1;
}

// // FUNCTION -(Done)Check Win
function checkWin(pickedColumn, indxOrigin) {

  // horizontal
  winCheck.add(checkConnect(pickedColumn, indxOrigin, 1, 0))
    // Inclining
    .add(checkConnect(pickedColumn, indxOrigin, 1, 1))
    // Vertical
    .add(checkConnect(pickedColumn, indxOrigin, 0, 1))
    // Declining
    .add(checkConnect(pickedColumn, indxOrigin, 1, -1))
  let winCheckSize = winCheck.size;
  if (winCheckSize > 3) {
    for (let i = 0; i <= 6; i++) {
      let shutdownColumn = document.getElementById(`${i}`)
      shutdownColumn.removeEventListener("click", placePiece)
    }
    setTimeout(win, 150)
  }
  else {
    let preSaveRay = []
    let preSaveStr = undefined;
    for (let i = 0; i <= 6; i++) {
      preSaveRay.push(rayMap.get(`ray${i}`))
      preSaveStr = JSON.stringify(preSaveRay);
    }
    localStorage.setItem("savedGame", preSaveStr);
  };
}

// FUNCTION - (Done)Place piece
function placePiece(event) {
  let pickedColumn = Number(event.target.parentElement.id)
  let indxOrigin = rayMap.get(`ray${pickedColumn}`).length
  document.getElementById(event.target.id)
  if (indxOrigin <= 5) {
    rayMap.get(`ray${pickedColumn}`).push(color);
    document.getElementById(`ray${pickedColumn}_i${indxOrigin}`).className = `${color}`;
    checkWin(pickedColumn, indxOrigin);
    tieGameCount++
    playerSwitch();
  };
  if (tieGameCount === 42) {
    setTimeout(alert("Tied game"), 250);
  };
}

checkLocal();
setDOM();




// ___________________________________________________________________________________________________________________________
// ---------------------------------------------------------------------------------------------------------------------------
// ___________________________________________________________________________________________________________________________

// /** Connect Four
//  *
//  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
//  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
//  * board fills (tie)
//  */

// var WIDTH = 7;
// var HEIGHT = 6;

// var currPlayer = 1; // active player: 1 or 2
// var board = []; // array of rows, each row is array of cells  (board[y][x])

// /** makeBoard: create in-JS board structure:
//  *    board = array of rows, each row is array of cells  (board[y][x])
//  */

// function makeBoard() {
//   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
// }

// /** makeHtmlBoard: make HTML table and row of column tops. */

// function makeHtmlBoard() {
//   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

//   // TODO: add comment for this code
//   var top = document.createElement("tr");
//   top.setAttribute("id", "column-top");
//   top.addEventListener("click", handleClick);

//   for (var x = 0; x < WIDTH; x++) {
//     var headCell = document.createElement("td");
//     headCell.setAttribute("id", x);
//     top.append(headCell);
//   }
//   htmlBoard.append(top);

//   // TODO: add comment for this code
//   for (var y = 0; y < HEIGHT; y++) {
//     const row = document.createElement("tr");
//     for (var x = 0; x < WIDTH; x++) {
//       const cell = document.createElement("td");
//       cell.setAttribute("id", `${y}-${x}`);
//       row.append(cell);
//     }
//     htmlBoard.append(row);
//   }
// }

// /** findSpotForCol: given column x, return top empty y (null if filled) */

// function findSpotForCol(x) {
//   // TODO: write the real version of this, rather than always returning 0
//   return 0;
// }

// /** placeInTable: update DOM to place piece into HTML table of board */

// function placeInTable(y, x) {
//   // TODO: make a div and insert into correct table cell
// }

// /** endGame: announce game end */

// function endGame(msg) {
//   // TODO: pop up alert message
// }

// /** handleClick: handle click of column top to play piece */

// function handleClick(evt) {
//   // get x from ID of clicked cell
//   var x = +evt.target.id;

//   // get next spot in column (if none, ignore click)
//   var y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // place piece in board and add to HTML table
//   // TODO: add line to update in-memory board
//   placeInTable(y, x);

//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }

//   // check for tie
//   // TODO: check if all cells in board are filled; if so call, call endGame

//   // switch players
//   // TODO: switch currPlayer 1 <-> 2
// }

// /** checkForWin: check board cell-by-cell for "does a win start here?" */

// function checkForWin() {
//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   // TODO: read and understand this code. Add comments to help you.

//   for (var y = 0; y < HEIGHT; y++) {
//     for (var x = 0; x < WIDTH; x++) {
//       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }

// makeBoard();
// makeHtmlBoard();
