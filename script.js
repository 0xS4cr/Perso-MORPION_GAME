var playerTurn, moves, isGameOver, span, restartButton, gameMode;
playerTurn = "x";
moves = 0;
isGameOver = false;
span = document.getElementsByTagName("span");
gameMode = null;
restartButton = '<button class="btnChoice" onclick="playAgain()">Rejouer</button>';

function setGameMode(mode) {
  gameMode = mode;
  document.getElementById("gameMode").style.display = "none";
  resetGame();
}

function aiMove() {
    setTimeout(() => {
      let availableMoves = Array.from(span).filter(s => s.dataset.player === 'none');
      let randomIndex = Math.floor(Math.random() * availableMoves.length);
      let aiChoice = availableMoves[randomIndex];
  
      aiChoice.innerHTML = playerTurn;
      aiChoice.dataset.player = playerTurn;
      moves++;
      checkForWinOrDraw();
      playerTurn = "x";
    }, 1000);
  }

function play(y) {
  if (gameMode === null) return;
  if (y.dataset.player === "none" && isGameOver == false) {
    y.innerHTML = playerTurn;
    y.dataset.player = playerTurn;
    moves++;
    checkForWinOrDraw();
    if (playerTurn === "x") {
      playerTurn = "o";
      if (gameMode === 'ai' && !isGameOver) {
        aiMove();
      }
    } else if (playerTurn === "o") {
      playerTurn = "x";
    }
  }
}

function checkForWinOrDraw() {
  checkWinner(1, 2, 3);
  checkWinner(4, 5, 6);
  checkWinner(7, 8, 9);
  checkWinner(1, 4, 7);
  checkWinner(2, 5, 8);
  checkWinner(3, 6, 9);
  checkWinner(1, 5, 9);
  checkWinner(3, 5, 7);
  if (moves === 9 && isGameOver === false) {
    draw();
  }
}

function checkWinner(a, b, c) {
  a--; b--; c--;
  if (
    (span[a].dataset.player === span[b].dataset.player) &&
    (span[b].dataset.player === span[c].dataset.player) &&
    (span[a].dataset.player === "x" || span[a].dataset.player == "o") &&
    isGameOver == false
  ) {
    span[a].parentNode.className += " activeBox";
    span[b].parentNode.className += " activeBox";
    span[c].parentNode.className += " activeBox";
    gameOver(a);
  }
}

function playAgain() {
  document.getElementsByClassName("alert")[0].remove();
  resetGame();
  isGameOver = false;
  for (let k = 0; k < span.length; k++) {
    span[k].parentNode.className = span[k].parentNode.className.replace("activeBox", "");
  }
}

function resetGame() {
  for (let i = 0; i < span.length; i++) {
    span[i].dataset.player = "none";
    span[i].innerHTML = "&nbsp;"
  }
  playerTurn = "x";
  moves = 0;
}

function gameOver(a) {
  const gameOverAlertElement = `<b>GAME OVER</b><br><br> Player ${span[a].dataset.player.toUpperCase()} Win !!! <br><br>${restartButton}`;
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = gameOverAlertElement;
  document.body.appendChild(div);
  isGameOver = true;
  moves = 0;
}

function draw() {
  const drawAlertElement = `<b>Match nul</b><br><br>${restartButton}`;
  const div = document.createElement("div");
  div.className = "alert";
  div.innerHTML = drawAlertElement;
  document.body.appendChild(div);
  isGameOver = true;
  moves = 0;
}
