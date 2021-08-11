
class Game {
  constructor(height, width) {
    this.width = width;
    this.height = height;
    this.currPlayer = 0;
    this.makeBoard();
    this.makeHtmlBoard();
    this.playersRay = [];
    this.gameWon = false;
  }

  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');


    // This is because it is going into the interface and OUTSIDE of the object.
    // ==========================================================================
    this.handleGameClick = this.handleClick.bind(this);
    // ==========================================================================


    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');

    // This is handleGameClick it is NOT handleClick, handleGameClick has been bound to the interface
    // ==================================================
    top.addEventListener('click', this.handleGameClick);
    // ==================================================

    for (let x = 0; x < this.width; x++) {
      let headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.style.backgroundColor = playersRay[this.currPlayer];
    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    this.gameWon = true;
    alert(msg);
  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    if (this.gameWon === false) {
      let x = +evt.target.id;

      let y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      this.board[y][x] = playersRay[this.currPlayer];
      this.placeInTable(y, x);


      if (this.checkForWin()) {
        return this.endGame(`${playersRay[this.currPlayer]} won!`);
      }


      if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }

      // Player
      if (playersRay[this.currPlayer + 1] !== undefined) {
        this.currPlayer += 1
        console.log(this.currPlayer)
      }
      else {
        this.currPlayer = 0
        console.log(this.currPlayer)
      };
    };
  }
  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&

        // Player
        this.board[y][x] === playersRay[this.currPlayer]
    );
  }

  checkForWin() {

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        this._win([[y, x], [y, x + 1], [y, x + 2], [y, x + 3]])
        if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
          return true;
        }
      }
    }
  }

}

class Player {
  constructor(color) {
    this.color = color
  }
}

function newGame() {
  // Clear out old
  currentGame = undefined;
  gameDOM.innerHTML = "";
  playersRay = []
  // Create a new game
  currentGame = new Game(6, 7);
  let p1 = new Player(document.getElementById("player1").value)
  playersRay.push(p1.color)
  let p2 = new Player(document.getElementById("player2").value)
  playersRay.push(p2.color)
}


let currentGame = undefined;
let playersRay = []
const newGameBttn = document.getElementById("newStart");
const gameDOM = document.getElementById("board");
newGameBttn.addEventListener("click", newGame);