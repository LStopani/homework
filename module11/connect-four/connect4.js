// (Done)Initial set up
const rayOfRays = [["ray0", []], ["ray1", []], ["ray2", []], ["ray3", []], ["ray4", []], ["ray5", []], ["ray6", []]];
const rayMap = new Map(rayOfRays);
let winCheck = 0
const resetButton = document.getElementById('newGame')
resetButton.addEventListener("click", reset)
let tieGameCount = 0

// populating the game board
function setDOM() {
  for (let c = 0; c <= 6; c++) {
    let newColumn = document.createElement("div")
    newColumn.id = `${c}`
    newColumn.className = "column"
    newColumn.addEventListener("click", placePiece)
    for (let i = 5; i >= 0; i--) {
      let newCell = document.createElement("div")
      newCell.id = `ray${c}_i${i}`
      newCell.className = "cell"
      newColumn.appendChild(newCell);
    }
    game.appendChild(newColumn);
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


//  set turn
const playerTurn = document.getElementById('whosTurn')
playerTurn.innerHTML = "It's Red's Turn";
let color = "red";


//  Switches the player after click
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

// Resets the game
function reset() {
  winCheck = false;

  for (let i = 0; i <= 6; i++) {
    rayMap.set(`ray${i}`, []);
  }

  let gameDiv = document.getElementById("game")
  gameDiv.innerHTML = ''
  color = "red";
  tieGameCount = 0;
  setDOM();
  localStorage.setItem("savedGame", null);
}

// What happens when someone wins
function win() {
  alert(`${color} looses!!! Can't you do anything right?!`);
}


// checks how many pieces are connected
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

  };
  let countTotal = matchCount + invMatchCount + 1
  if (countTotal >= 4) { return 1 };
  return 0;
};

// checkes if a player won
function checkWin(pickedColumn, indxOrigin) {
  let horizontal = checkConnect(pickedColumn, indxOrigin, 1, 0);
  let inclining = checkConnect(pickedColumn, indxOrigin, 1, 1);
  let vertical = checkConnect(pickedColumn, indxOrigin, 0, 1);
  let declining = checkConnect(pickedColumn, indxOrigin, 1, -1)
  winCheck = horizontal + inclining + vertical + declining

  if (winCheck >= 1) {
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

// placing a piece
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

// going live on the session
setDOM();
checkLocal();
