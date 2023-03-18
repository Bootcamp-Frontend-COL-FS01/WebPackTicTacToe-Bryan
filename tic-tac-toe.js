import "./styles.css";

//Global Variables
const form = document.querySelector("#players-form");
const gameBoard = document.querySelector("#board-container");
const statusMessage = document.querySelector(".statusMessage");
const cells = document.querySelectorAll(".cell");
const restart_button = document.querySelector("#restart");
const playAgain_button = document.querySelector("#playAgain");
let gameActive = true;
let currentPlayer = ["O", ""];
let gameState = ["", "", "", "", "", "", "", "", ""];
let players = {
  player1: "Jean",
  player2: "Doe",
};

//Functions
const handleFormClick = (e) => {
  e.preventDefault();
  players = {
    player1: form.elements[0].value,
    player2: form.elements[1].value,
  };
  form.style.display = "none";
  gameBoard.style.display = "grid";
  updateCurrentPlayer();
};

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.getAttribute("data-cell");

  if (gameState[index] !== "" || !gameActive) {
    return;
  }

  gameState[index] = currentPlayer[0];
  cell.textContent = currentPlayer[0];
  checkWin();
};

const checkWin = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let roundWon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    const valA = gameState[a];
    const valB = gameState[b];
    const valC = gameState[c];
    if (valA === "" || valB === "" || valC === "") {
      continue;
    }
    if (valA === valB && valB === valC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusMessage.textContent = `${currentPlayer[1]} WIN ¡¡¡`;
    gameActive = false;
    restart();
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusMessage.textContent = "Draw :S Play Again¡¡¡";
    gameActive = false;
    restart();
    return;
  }

  updateCurrentPlayer();
};

const handleRestartClick = (e) => {
  location.reload();
};

const handlePlayAgainClick = (e) => {
  statusMessage.textContent = `Es el turno de ${currentPlayer[1]} => ${currentPlayer[0]}`;
  gameState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => {
    cell.textContent = "";
  });
  gameActive = false;
  restart_button.hidden = true;
  playAgain_button.hidden = true;
};

const restart = () => {
  restart_button.hidden = false;
  playAgain_button.hidden = false;
};

const updateCurrentPlayer = () => {
  if (currentPlayer[0] === "X") {
    currentPlayer[0] = "O";
    currentPlayer[1] = players.player2;
  } else {
    currentPlayer[0] = "X";
    currentPlayer[1] = players.player1;
  }
  statusMessage.textContent = `Es el turno de ${currentPlayer[1]} => ${currentPlayer[0]}`;
};

//Events
form.addEventListener("submit", handleFormClick);
restart_button.addEventListener("click", handleRestartClick);
playAgain_button.addEventListener("click", handlePlayAgainClick);

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});
