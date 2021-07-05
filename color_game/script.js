const gameContainer = document.getElementById("game");
newGame.addEventListener("click", deal)

const colors = [
  "red",
  "darkorange",
  "yellow",
  "green",
  "blue",
  "purple",
  "white",
  "grey",
  "black",
  "lightgrey",
  "burlywood",
  "skyblue",
  "yellowgreen",
  "teal",
  "blueviolet",
  "coral",
  "deeppink",
  "darkred",
  "darkslategray",
  "goldenrod",
  "lightgreen",
  "darkblue",
  "olive",
  "pink",
  "aqua"
];
let domId = []
const gameCards = []
let numOfPairs = 0

function deal() {
  // Clear previous game
  if (domId.length !== 0) {
    matchesMade = 0
    guesses = 0
    for (let i = 0; i < domId.length; i++) {
      let selected = document.getElementById(domId[i]);
      gameContainer.removeChild(selected);
    };
    let cleanUp = domId.length
    for (let i = 0; i < cleanUp; i++) {
      domId.pop();
    };
    let gcClean = gameCards.length
    for (let i = 0; i < gcClean; i++) {
      gameCards.pop();
    };
  };

  // collecting data
  if (localStorage.getItem('memColorHighScore') != undefined) {
    const preGen = JSON.parse(localStorage.getItem('memColorHighScore'));
    bestMatchVar = preGen[0];
    bestGuessVar = preGen[1];
    pairText = document.getElementById("bestPairs");
    pairText.innerText = `${bestMatchVar}`;
    guessText = document.getElementById("bestGuess");
    guessText.innerText = `${bestGuessVar}`;
  };

  for (let i = 0; i < colors.length; i++) {
    gameCards.push(colors[i]);
  }
  let range = document.getElementById("difficulty");
  let difficulty = range.value;
  numOfPairs = difficulty / 2;

  const deck = [];
  const hand = [];

  // building the deck
  for (let i = 0; i < numOfPairs; i++) {
    let randColor = Math.floor(Math.random() * gameCards.length);
    deck.push(gameCards[randColor]);
    deck.push(gameCards[randColor]);
    hand.push(gameCards[randColor]);
    hand.push(gameCards[randColor]);
    gameCards.splice(randColor, 1);
  }

  // randomization
  for (let i of hand) {
    let cardsLeft = deck.length;
    let cardChoice = Math.floor(Math.random() * cardsLeft);

    // constructing the div and it's interactive elements (provided for by Springboard)
    const newDiv = document.createElement("div");
    newDiv.classList.add(deck[cardChoice]);
    newDiv.id = `${cardsLeft} ${deck[cardChoice]}`;
    domId.push(`${newDiv.id}`)
    newDiv.style.backgroundColor = '#692300';
    // newDiv.style.backgroundColor = `${deck[cardChoice]}`;
    newDiv.addEventListener("click", cardClick);

    gameContainer.append(newDiv);

    // Reduicing the deck
    deck.splice(cardChoice, 1);
    cardsLeft--;
  };
};
let firstCard = undefined
let secondCard = undefined
let matchesMade = 0
let guesses = 0

// High Score
const score = []
let bestMatchVar = 0
let bestGuessVar = 100
let preSaveStr = undefined







function cardClick(event) {

  if (firstCard === undefined) {
    let targetId = event.target.id
    firstCard = document.getElementById(`${targetId}`);
    event.target.removeEventListener("click", cardClick);
    event.target.style.backgroundColor = `${event.target.classList.value}`
    console.log(`firstCard ${firstCard.classList}`)
  }

  else {
    targetId = event.target.id
    secondCard = document.getElementById(`${targetId}`);
    event.target.removeEventListener("click", cardClick);
    event.target.style.backgroundColor = `${event.target.classList.value}`
    console.log(`secondCard ${secondCard.classList}`)

    function cleanUp(firstCard, secondCard) {
      firstCard.addEventListener("click", cardClick);
      firstCard.style.backgroundColor = '#692300';
      secondCard.addEventListener("click", cardClick);
      secondCard.style.backgroundColor = '#692300';
    };

    if (`${firstCard.classList}` !== `${secondCard.classList}`) {
      guesses++
      setTimeout(cleanUp, 1000, firstCard, secondCard);
    }

    else {
      matchesMade++
      guesses++
    }
    firstCard = undefined;
    secondCard = undefined;
  };

  // Score
  pairText = document.getElementById("pairs");
  pairText.innerText = `${matchesMade}`;
  guessText = document.getElementById("guesses");
  guessText.innerText = `${guesses}`;

  // you win
  function youWin() {
    alert("You Win!");
  };

  if (matchesMade === numOfPairs) {
    let scoreClean = score.length
    for (let i = 0; i > scoreClean; i++) {
      score.pop;
    }
    score.push(matchesMade)
    score.push(guesses)
    setTimeout(youWin, 500);

    if (matchesMade > bestMatchVar) {
      if (guesses <= bestGuessVar + matchesMade) {
        preSaveStr = JSON.stringify(score)
        localStorage.setItem("memColorHighScore", preSaveStr);
      };
    };
  };
};
