const playing = document.querySelector(".playing");
const searchplayingField = document.querySelector(".playing__field");
const count = document.querySelector(".count");
const recordAcountCount = document.querySelector(".record__account-count");
const endGame = document.querySelector(".button_reset_game");
const gameEndBlock = document.getElementById("gameEndBlock");
const level1 = document.querySelector(".level1");
const level2 = document.querySelector(".level2");
const level3 = document.querySelector(".level3");
const gameMode1 = document.querySelector(".game_mode_1");
const gameMode2 = document.querySelector(".game_mode_2");
const playingFieldLength = 14
const playingFieldWidth = 14
const field = new Array(playingFieldLength)
let randomСoordinates = getRandomInt(4, 10);
let directionMovementSnake = "up";
let intervalId;
let buttonResetGame;
let checker = false;
let game_mode = 0;
let t = () => setInterval;
const Snake = [
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
            rowsItem.style.backgroundImage = "url('./img/r.avif')";
        
          break;
        case 1:
            rowsItem.style.backgroundImage = "url('./img/w.webp')";
            rowsItem.style.backgroundSize = '100px';
            rowsItem.style.backgroundRepeat = 'no-repeat';
            rowsItem.style.backgroundPosition = 'center';
        break;
        case 2:
            rowsItem.style.backgroundImage = "url('./img/apple.avif')";
            rowsItem.style.backgroundSize = '70px';
            rowsItem.style.backgroundRepeat = 'no-repeat';
            rowsItem.style.backgroundPosition = 'center';
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

function drawApple(x, y) {
  field[x][y] = 2;
}
drawApple(apple.x, apple.y);

function drawingSnake(x, y) {
  field[x][y] = 1;
}
Snake.forEach((item) => {
  drawingSnake(item.x, item.y);
});

Snake.forEach((item) => {
    if(item.x === apple.x && item.y === apple.y){
        drawApple(getRandomInt(0, 13), getRandomInt(0, 13));
    }
});
  

rerender();


function unfurlSnakeDownAndUp(t){
    Snake.forEach((item, index) => {
        item.oldX = item.x;
        item.oldY = item.y;
        try {
          if (index === 0) {
            Snake[0].x = t;
          } else {
            field[Snake[Snake.length - 1].x][Snake[Snake.length - 1].y] = 0;
            Snake[index].y = Snake[index - 1].oldY;
            Snake[index].x = Snake[index - 1].oldX;
          }
          field[item.x][item.y] = 1;
        } catch (err) {
          loseGame();
        }
      });
      rerender();
}
function unfurlSnakeLeftAndRight(t, w){
    Snake.forEach((item, index) => {
        item.oldX = item.x;
        item.oldY = item.y;
        if (index === 0) {
          if (t === w) {
            if (game_mode === 4)
            loseGame();
            return;
          }
          Snake[0].y = t
        } else {
          field[Snake[Snake.length - 1].x][Snake[Snake.length - 1].y] = 0;
          Snake[index].y = Snake[index - 1].oldY;
          Snake[index].x = Snake[index - 1].oldX;
        }
        field[item.x][item.y] = 1;
      });
      rerender();
}
function walkRight() {
    unfurlSnakeLeftAndRight(Snake[0].y + 1, 14)
}

function walkLeft() {
    unfurlSnakeLeftAndRight(Snake[0].y - 1, -1)
}

function walkDown() {
    unfurlSnakeDownAndUp(Snake[0].x + 1)
}

function walkUp() {
    unfurlSnakeDownAndUp(Snake[0].x - 1)
}

document.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "ArrowDown","KeyS":
    if(directionMovementSnake === 'up'  || checker === false)  { 
            return;
    }
      directionMovementSnake = "down";
      break;
    case "ArrowUp","KeyW":
        if(directionMovementSnake === 'down' || checker === false) { 
            return;
        }
        directionMovementSnake = "up";
      break;
    case "ArrowRight","KeyD":
        if(directionMovementSnake === 'left' || checker === false) { 
            return;
        }
        directionMovementSnake = "right";
      break;
    case "ArrowLeft","KeyA":
        if(directionMovementSnake === 'right' || checker === false) { 
            return;
        }
        directionMovementSnake = "left";
      break;
  }
});


function increaseLengthSnake(coordinateX, coordinateY, motionFunction){
    if (field[coordinateX][coordinateY] == 2) {
        Snake.push({
          x: Snake[Snake.length - 1].x,
          y: Snake[Snake.length - 1].y,
          oldX: Snake[Snake.length - 1].x,
          oldY: Snake[Snake.length - 1].y,
        });
        field[coordinateX][coordinateY] = 0;
        field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2;
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

        try {
            switch (directionMovementSnake) {
              case "down":
                  increaseLengthSnake(Snake[0].x + 1, Snake[0].y, walkDown)
                break;
              case "up":
                  increaseLengthSnake(Snake[0].x - 1, Snake[0].y, walkUp)
                break;
              case "right":
                  increaseLengthSnake(Snake[0].x, Snake[0].y+1, walkRight)
                break;
              case "left":
                  increaseLengthSnake(Snake[0].x, Snake[0].y-1, walkLeft)
                break;
            }  
        } catch (err) {
            game_mode === 4 ? loseGame() :  console.log("Режим 2");
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
    level1.addEventListener("click", speed1);
    level2.addEventListener("click", speed2);
    level3.addEventListener("click", speed3);
    gameMode1.addEventListener('click', chooseGameMode1)
    gameMode2.addEventListener('click', chooseGameMode2)
}
addEventListenerSpeed()

function removeEventListenerSpeed(){
    level1.removeEventListener("click", speed1);
    level2.removeEventListener("click", speed2);
    level3.removeEventListener("click", speed3);
    gameMode1.removeEventListener('click', chooseGameMode1)
    gameMode2.removeEventListener('click', chooseGameMode2)
}
endGame.addEventListener('click', startGameOver)


function loseGame() {
    gameEndBlock.style.visibility = "visible";
    clearInterval(intervalId);
    removeEventListenerSpeed()
}

function crossFieldBoundary(){

}

function startGameOver() {
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
  drawApple(getRandomInt(0, 13), getRandomInt(0, 13));
  Snake.forEach((item) => {
    item.x = 0;
    item.y = 0;
    Snake.length = 2;
  });
  Snake[0].x = randomСoordinates;
  Snake[0].y = randomСoordinates;
  Snake[1].x = Snake[0].x + 1;
  Snake[1].y = Snake[0].y;
  Snake.forEach((item) => {
    drawingSnake(item.x, item.y);
  });
  rerender()
  directionMovementSnake = "up";
  addEventListenerSpeed()
}

