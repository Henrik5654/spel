// ping pong spel




const gameCanvas = document.getElementById("gameCanvas");
const c = gameCanvas.getContext("2d");
gameCanvas.width = 800;
gameCanvas.height = 400;

// Konstanter
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 15;
const PADDLE_SPEED = 6;
const BALL_SPEED = 4;

// Spelare 1 (Vänster)
const player1 = {
  x: 20,
  y: gameCanvas.height / 2 - PADDLE_HEIGHT / 2,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dy: 0,
};

// Spelare 2 (Höger)
const player2 = {
  x: gameCanvas.width - 20 - PADDLE_WIDTH,
  y: gameCanvas.height / 2 - PADDLE_HEIGHT / 2,
  width: PADDLE_WIDTH,
  height: PADDLE_HEIGHT,
  dy: 0,
};

// Boll
const ball = {
  x: gameCanvas.width / 2,
  y: gameCanvas.height / 2,
  size: BALL_SIZE,
  dx: -BALL_SPEED,
  dy: BALL_SPEED,
};

// Poäng
let score1 = 0;
let score2 = 0;

// Styr Tangenter
const keys = {
  w: false,
  s: false,
  arrowUp: false,
  arrowDown: false,
};

document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "W") keys.w = true;
  if (e.key === "s" || e.key === "S") keys.s = true;
  if (e.key === "ArrowUp") keys.arrowUp = true;
  if (e.key === "ArrowDown") keys.arrowDown = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "W") keys.w = false;
  if (e.key === "s" || e.key === "S") keys.s = false;
  if (e.key === "ArrowUp") keys.arrowUp = false;
  if (e.key === "ArrowDown") keys.arrowDown = false;
});

// Uppdatera Spelare
function updatePlayers() { 
  // Spelare 1 (W och S)
  if (keys.w && player1.y > 0) {
    player1.y -= PADDLE_SPEED;
  }
  if (keys.s && player1.y < gameCanvas.height - PADDLE_HEIGHT) {
    player1.y += PADDLE_SPEED;
  }

  // Spelare 2 (Pil upp och pil ned)
  if (keys.arrowUp && player2.y > 0) {
    player2.y -= PADDLE_SPEED;
  }
  if (keys.arrowDown && player2.y < gameCanvas.height - PADDLE_HEIGHT) {
    player2.y += PADDLE_SPEED;
  }
}

// Uppdatera Boll
function updateBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Boll studsar på tak och botten
  if (ball.y - BALL_SIZE < 0 || ball.y + BALL_SIZE > gameCanvas.height) {
    ball.dy = -ball.dy;
  }

  // Kontrollera kollision med spelare 1
  if (
    ball.x - BALL_SIZE < player1.x + player1.width &&
    ball.y > player1.y &&
    ball.y < player1.y + player1.height
  ) {
    ball.dx = -ball.dx;
    ball.x = player1.x + player1.width + BALL_SIZE;
    // Öka hastigheten
    ball.dx *= 1.05;
    ball.dy *= 1.05;
  }

  // Kontrollera kollision med spelare 2
  if (
    ball.x + BALL_SIZE > player2.x &&
    ball.y > player2.y &&
    ball.y < player2.y + player2.height
  ) {
    ball.dx = -ball.dx;
    ball.x = player2.x - BALL_SIZE;
    // Öka hastigheten
    ball.dx *= 1.05;
    ball.dy *= 1.05;
  }

  // Boll går förbi spelare 1 (poäng till spelare 2)
  if (ball.x < 0) {
    score2++;
    resetBall();
  }

  // Boll går förbi spelare 2 (poäng till spelare 1)
  if (ball.x > gameCanvas.width) {
    score1++;
    resetBall();
  }
}

// Återställ Boll
function resetBall() {
  ball.x = gameCanvas.width / 2;
  ball.y = gameCanvas.height / 2;
  ball.dx = (Math.random() > 0.5 ? 1 : -1) * BALL_SPEED;
  ball.dy = (Math.random() * 2 - 1) * BALL_SPEED;
}

// Rita Spelare
function drawPaddle(paddle) {
  c.fillStyle = "white";
  c.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Rita Boll
function drawBall() {
  c.fillStyle = "white";
  c.beginPath();
  c.arc(ball.x, ball.y, BALL_SIZE, 0, Math.PI * 2);
  c.fill();
}

// Rita Mitten Linje
function drawCenterLine() {
  c.strokeStyle = "red";
  c.setLineDash([10, 10]);
  c.beginPath();
  c.moveTo(gameCanvas.width / 2, 0);
  c.lineTo(gameCanvas.width / 2, gameCanvas.height);
  c.stroke();
  c.setLineDash([]);
}

// Rita Poäng
function drawScore() {
  c.fillStyle = "white";
  c.font = "36px Arial";
  c.textAlign = "center";
  c.fillText(score1 + " - " + score2, gameCanvas.width / 2, 40);
}

// Rita Instruktioner
function drawInstructions() {
  // Instruktioner borttagna för minimalistisk design
}

// Game Loop
function gameLoop() {
  // Rensa canvas
  c.fillStyle = "black";
  c.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Uppdatera och rita
  updatePlayers();
  updateBall();

  drawCenterLine();
  drawPaddle(player1);
  drawPaddle(player2);
  drawBall();
  drawScore();
  drawInstructions();

  requestAnimationFrame(gameLoop);
}

// Starta spelet
gameLoop();