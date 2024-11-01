const playing = document.querySelector(".playing");
const searchplayingField = document.querySelector(".playing__field");
const count = document.querySelector(".count");
const recordAcountCount = document.querySelector(".record__account-count");
const endGame = document.querySelector(".button_reset_game");

const gameMode1 = document.querySelector(".game_mode_1");
const gameMode2 = document.querySelector(".game_mode_2");
const gameEndBlock = document.querySelector(".endGame__section");
const speedSelectionElementFirstLevel = document.querySelector(".level1");
const speedSelectionElementSecondLevel = document.querySelector(".level2");
const speedSelectionElementThirdLevel = document.querySelector(".level3");
const playingFieldLength = 14
const playingFieldWidth = 14
const field = new Array(playingFieldLength)
let randomСoordinates = getRandomInt(4, 10);
let directionMovementSnake = "up";
let intervalId;
let buttonResetGame;
let checker = false;
let game_mode = 0;

const snake = [
    {
      x: randomСoordinates,
      y: randomСoordinates,
      oldX: 0,
      oldY: 0,
    },
    {
      x: randomСoordinates + 1,
      y: randomСoordinates,
      oldX: 0,
      oldY: 0,
    },
  ];
  const block = [
    {
      x: 3,
      y: 3,
    },
    {
      x: 4,
      y: 3,
    },
    {
      x: 5,
      y: 3,
    },
    {
      x: 3,
      y: 4,
    },
    {
      x: 3,
      y: 5,
    },
    {
      x: 3,
      y: 6,
    },
  ];
  const lengthSnake = snake.length
  const apple = {
    x: getRandomInt(0, 13),
    y: getRandomInt(0, 13),
  };
  let currentGameScore = 0;
  let recordGameScore = 0;

for (let i = 0; i < field.length; i++) {
    field[i] = new Array(playingFieldWidth)
}

for (let rows = 0; rows < field.length; rows++) {
    for (let columns = 0; columns < field[rows].length; columns++) {
    field[rows][columns] = 0
  }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function createCell(){
    return document.createElement("div");
}

function drowUi() {
  for (let i = 0; i < field.length; i++) {
    const rowsField = createCell() 
    rowsField.className = "rows-field";
    for (let j = 0; j < field[i].length; j++) {
      let rowsItem = createCell();
      rowsItem.className = `rows-item`;
      switch (field[i][j]) {
        case 0:
          rowsItem.classList.add('rows-item-field');
          break;
        case 1:
          (i == snake[0].x && j == snake[0].y) ? rowsItem.classList.add(`rows-item-snake-header-${directionMovementSnake}`) : rowsItem.classList.add(`rows-item-snake-${directionMovementSnake}`); 
        break;
        case 2:
          rowsItem.classList.add('rows-item-apple');
        break;
        case 3:
          rowsItem.style.backgroundColor="#895263"
        break;
      }
      rowsField.append(rowsItem);
    }
    searchplayingField.append(rowsField);
  }
}
drowUi();

function rerender() {
    searchplayingField.innerHTML = "";
    drowUi();
  }

function calculateScoreGame() {
  currentGameScore = currentGameScore + 1;
  if (recordGameScore < currentGameScore){
    recordGameScore = currentGameScore
  } else {
    recordGameScore = recordGameScore
  }
}

function showScore(currentGameScore, recordGameScore){
    count.textContent = currentGameScore;
    recordAcountCount.textContent = recordGameScore;
}

function sendAppleCoordinates(coordinatesAppleX, coordinatesAppleY) {
  snake.forEach((item) => {
    if(item.x === coordinatesAppleX && item.y === coordinatesAppleY){
        sendAppleCoordinates(getRandomInt(0, 13), getRandomInt(0, 13));
    } else {
      field[coordinatesAppleX][coordinatesAppleY] = 2;
    }
});
}
sendAppleCoordinates(apple.x, apple.y);

function drawingSnake(x, y) {
  field[x][y] = 1;
}
snake.forEach((item) => {
  drawingSnake(item.x, item.y);
});

function drawingBlock(x, y) {
  field[x][y] = 3;
}
block.forEach((item) => {
  drawingBlock(item.x, item.y);
});

rerender();

function turnSnake(coordinatesSnake, restrictionExitFromField, coordinateAxis){
    snake.forEach((item, index) => {
      console.log(coordinatesSnake)
        item.oldX = item.x;
        item.oldY = item.y;
        if (coordinatesSnake === restrictionExitFromField || 
          (block.forEach((item) => {(coordinatesSnake == block[item.y] && coordinatesSnake == block[item.x])}))) {
            loseGame();
            return;
          }
        if (index === 0) {
          
          (coordinateAxis == 'x') ? snake[0].x = coordinatesSnake : snake[0].y = coordinatesSnake
         
        } else {
          field[snake[snake.length - 1].x][snake[snake.length - 1].y] = 0;
          snake[index].y = snake[index - 1].oldY;
          snake[index].x = snake[index - 1].oldX;
        }
        field[item.x][item.y] = 1;
      });
      rerender();
}
function walkRight() {
    turnSnake(snake[0].y + 1, field.length, 'y')
}

function walkLeft() {
    turnSnake(snake[0].y - 1, -1, 'y')
}

function walkDown() {
  turnSnake(snake[0].x + 1, field.length, 'x')
}

function walkUp() {
  turnSnake(snake[0].x - 1, -1, 'x')
}

document.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "ArrowDown":
    case "KeyS":
    if(directionMovementSnake === 'up'  || checker === false)  { 
            return;
    }
      directionMovementSnake = "down";
      break;
    case "ArrowUp":
      case "KeyW":
        if(directionMovementSnake === 'down' || checker === false) { 
            return;
        }
        directionMovementSnake = "up";
      break;
    case "ArrowRight":
      case "KeyD":
        if(directionMovementSnake === 'left' || checker === false) { 
            return;
        }
        directionMovementSnake = "right";
      break;
    case "ArrowLeft":
      case "KeyA":
        if(directionMovementSnake === 'right' || checker === false) { 
            return;
        }
        directionMovementSnake = "left";
      break;
  }
});


function increaseLengthSnake(coordinateX, coordinateY, motionFunction){
    if(field[coordinateX] === undefined) return loseGame();
    if (field[coordinateX][coordinateY] == 2) {
        snake.push({
          x: snake[snake.length - 1].x,
          y: snake[snake.length - 1].y,
          oldX: snake[snake.length - 1].x,
          oldY: snake[snake.length - 1].y,
        });
        field[coordinateX][coordinateY] = 0;
        sendAppleCoordinates(getRandomInt(0, 13), getRandomInt(0, 13));
        calculateScoreGame();
        showScore(currentGameScore, recordGameScore)
      }
      if (field[coordinateX][coordinateY] === 1) {
        motionFunction();
        loseGame();
      }
      motionFunction();
}



function moveSnakeConstantly() {
            switch (directionMovementSnake) {
              case "down":
                  increaseLengthSnake(snake[0].x + 1, snake[0].y, walkDown)
                break;
              case "up":
                  increaseLengthSnake(snake[0].x - 1, snake[0].y, walkUp)
                break;
              case "right":
                  increaseLengthSnake(snake[0].x, snake[0].y+1, walkRight)
                break;
              case "left":
                  increaseLengthSnake(snake[0].x, snake[0].y-1, walkLeft)
                break;
            }  
     
    }


  


const createInterval = (time) => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(moveSnakeConstantly, time);
};

function speed1() {
  checker = true
  createInterval(200);
}
function speed2() {
  checker = true
  createInterval(400);
}
function speed3() {
  checker = true
  createInterval(600);
}
function chooseGameMode1() {
    game_mode = 4
    console.log(game_mode)
}
function chooseGameMode2() {
    game_mode = 5
    console.log(game_mode)
  }

function addEventListenerSpeed(){
    gameMode1.addEventListener('click', chooseGameMode1)
    gameMode2.addEventListener('click', chooseGameMode2)
    speedSelectionElementFirstLevel.addEventListener("click", speed1);
    speedSelectionElementSecondLevel.addEventListener("click", speed2);
    speedSelectionElementThirdLevel.addEventListener("click", speed3);
}
addEventListenerSpeed()

function removeEventListenerSpeed(){
  speedSelectionElementFirstLevel.removeEventListener("click", speed1);
  speedSelectionElementSecondLevel.removeEventListener("click", speed2);
  speedSelectionElementThirdLevel.removeEventListener("click", speed3);
    gameMode1.removeEventListener('click', chooseGameMode1)
    gameMode2.removeEventListener('click', chooseGameMode2)

 
}

endGame.addEventListener('click', startGame)


function loseGame() {
  console.log(snake)
  clearInterval(intervalId);
    gameEndBlock.style.visibility = "visible";
    removeEventListenerSpeed()
}

function crossFieldBoundary(){

}

function startGame() {
  gameEndBlock.style.visibility = "hidden";
  currentGameScore = 0;
  game_mode = 0;
  randomСoordinates = getRandomInt(4, 10);
  checker = false
  showScore(currentGameScore, recordGameScore)
  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field[i].length; j++) {
      field[i][j] = 0;
    }
  }
  sendAppleCoordinates(getRandomInt(0, 13), getRandomInt(0, 13));
  snake.forEach((item) => {
    item.x = 0;
    item.y = 0;
    snake.length = lengthSnake
  });
  snake[0].x = randomСoordinates;
  snake[0].y = randomСoordinates;
  for ( let i=1; i<snake.length; i++){
    console.log(snake.length-1)
    snake[i].x = snake[0].x + i
    snake[i].y = snake[0].y
  }
  snake.forEach((item) => {
    drawingSnake(item.x, item.y);
  });

  rerender()
  directionMovementSnake = "up";
  addEventListenerSpeed()
}

