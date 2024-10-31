const playing = document.querySelector(".playing");
const searchplayingField = document.querySelector(".playing__field");
const count = document.querySelector(".count");
const recordAcountCount = document.querySelector(".record__account-count");
const endGame = document.querySelector(".button_reset_game");
const gameEndBlock = document.getElementById("gameEndBlock");
const level1 = document.querySelector(".level1");
const level2 = document.querySelector(".level2");
const level3 = document.querySelector(".level3");
const playingFieldLength = 14
const playingFieldWidth = 14
const field = new Array(playingFieldLength)
let randomСoordinates = getRandomInt(4, 10);
let directionMovementSnake = "up";
let intervalId;
let buttonResetGame;
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
            rowsItem.style.backgroundColor = "#546545";
          break;
        case 1:
            rowsItem.style.backgroundColor = "#563212";
        break;
        case 2:
            rowsItem.style.backgroundColor = "#782514";
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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

rerender();

function walkDown() {
  Snake.forEach((item, index) => {
    item.oldX = item.x;
    item.oldY = item.y;
    try {
      if (index === 0) {
        Snake[0].x = Snake[0].x + 1;
      } else {
        field[Snake[Snake.length - 1].x][Snake[Snake.length - 1].y] = 0;
        Snake[index].y = Snake[index - 1].oldY;
        Snake[index].x = Snake[index - 1].oldX;
      }
      field[item.x][item.y] = 1;
    } catch (err) {
      endGameOver();
    }
  });
  rerender();
}

function walkUp() {
  Snake.forEach((item, index) => {
    item.oldX = item.x;
    item.oldY = item.y;
    try {
      if (index === 0) {
        Snake[index].x = Snake[index].x - 1;
      } else {
        field[Snake[Snake.length - 1].x][Snake[Snake.length - 1].y] = 0;
        Snake[index].y = Snake[index - 1].oldY;
        Snake[index].x = Snake[index - 1].oldX;
      }
      field[item.x][item.y] = 1;
    } catch (err) {
      endGameOver();
    }
  });
  rerender();
}

function walkRight() {
  Snake.forEach((item, index) => {
    item.oldX = item.x;
    item.oldY = item.y;
    if (index === 0) {
      if (Snake[0].y + 1 === 14) {
        endGameOver();
        return;
      }
      Snake[0].y = Snake[0].y + 1;
    } else {
      field[Snake[Snake.length - 1].x][Snake[Snake.length - 1].y] = 0;
      Snake[index].y = Snake[index - 1].oldY;
      Snake[index].x = Snake[index - 1].oldX;
    }
    field[item.x][item.y] = 1;
  });
  rerender();
}

function walkLeft() {
  Snake.forEach((item, index) => {
    item.oldX = item.x;
    item.oldY = item.y;
    if (index === 0) {
      if (Snake[0].y - 1 == -1) {
        endGameOver();
      }
      Snake[0].y = Snake[0].y - 1;
    } else {
      field[Snake[Snake.length - 1].x][Snake[Snake.length - 1].y] = 0;
      Snake[index].y = Snake[index - 1].oldY;
      Snake[index].x = Snake[index - 1].oldX;
    }
    field[item.x][item.y] = 1;
  });
  rerender();
}


document.addEventListener("keyup", function (event) {
  switch (event.code) {
    case "KeyS":
      directionMovementSnake = "down";
      break;
    case "KeyW":
        directionMovementSnake = "up";
      break;
    case "KeyD":
        directionMovementSnake = "right";
      break;
    case "KeyA":
        directionMovementSnake = "left";
      break;
  }
});


function moveSnakeCrossField(coordinateX, coordinateY, motionFunction){
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
        endGameOver();
      }
      motionFunction();
}


function moveSnakeConstantly() {
    try {
  switch (directionMovementSnake) {
    case "down":
        moveSnakeCrossField(Snake[0].x + 1, Snake[0].y, walkDown)
      break;
    case "up":
        moveSnakeCrossField(Snake[0].x - 1, Snake[0].y, walkUp)
        // if (field[Snake[0].x - 1][Snake[0].y] == 2) {
        //   Snake.push({
        //     x: Snake[Snake.length - 1].x,
        //     y: Snake[Snake.length - 1].y,
        //     oldX: Snake[Snake.length - 1].x,
        //     oldY: Snake[Snake.length - 1].y,
        //   });
        //   field[Snake[0].x - 1][Snake[0].y] = 0;
        //   field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2;
        //   calculateScoreGame();
        //   showScore(currentGameScore, recordGameScore)
        // }
        // if (field[Snake[0].x - 1][Snake[0].y] === 1) {
        //   walkUp();
        //   endGameOver();
        // }
        // walkUp();
     

      break;
    case "right":
        moveSnakeCrossField(Snake[0].x, Snake[0].y+1, walkRight)
    //   if (field[Snake[0].x][Snake[0].y + 1] == 2) {
    //     Snake.push({
    //       x: Snake[Snake.length - 1].x,
    //       y: Snake[Snake.length - 1].y,
    //       oldX: Snake[Snake.length - 1].x,
    //       oldY: Snake[Snake.length - 1].y,
    //     });
    //     field[Snake[0].x][Snake[0].y + 1] = 0;
    //     field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2;
    //     calculateScoreGame();
    //     showScore(currentGameScore, recordGameScore)
    //     rerender();
    //   }
    //   if (field[Snake[0].x][Snake[0].y + 1] === 1) {
    //     walkRight();
    //     endGameOver();
    //   }
    //   walkRight();
      break;
    case "left":
        moveSnakeCrossField(Snake[0].x, Snake[0].y-1, walkLeft)
    //   if (field[Snake[0].x][Snake[0].y - 1] == 2) {
    //     Snake.push({
    //       x: Snake[Snake.length - 1].x,
    //       y: Snake[Snake.length - 1].y,
    //       oldX: Snake[Snake.length - 1].x,
    //       oldY: Snake[Snake.length - 1].y,
    //     });
    //     field[Snake[0].x][Snake[0].y - 1] = 0;
    //     field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2;
    //     calculateScoreGame();
    //     showScore(currentGameScore, recordGameScore)
    //     rerender();
    //   }
    //   if (field[Snake[0].x][Snake[0].y - 1] === field[Snake[0].x][Snake[0].y]) {
    //     walkLeft();
    //     endGameOver();
    //   }
    //   walkLeft();

      break;
  }  } catch (err) {
    endGameOver();
  }
}


        // if (field[Snake[0].x + 1][Snake[0].y] == 2) {
        //   Snake.push({
        //     x: Snake[Snake.length - 1].x,
        //     y: Snake[Snake.length - 1].y,
        //     oldX: Snake[Snake.length - 1].x,
        //     oldY: Snake[Snake.length - 1].y,
        //   });
        //   field[Snake[0].x + 1][Snake[0].y] = 0;
        //   field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2;
        //   calculateScoreGame();
        //   showScore(currentGameScore, recordGameScore)
        // }
        // if (field[Snake[0].x + 1][Snake[0].y] === 1) {
        //   walkDown();
        //   endGameOver();
        // }
        // walkDown();



let t = () => setInterval;

const createInterval = (time) => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(moveSnakeConstantly, time);
};

function speed1() {
  createInterval(200);
}
function speed2() {
  createInterval(400);
}
function speed3() {
  createInterval(600);
}

level1.addEventListener("click", speed1);
level2.addEventListener("click", speed2);
level3.addEventListener("click", speed3);



endGame.addEventListener('click', startGameOver)





function endGameOver() {
    gameEndBlock.style.visibility = "visible";
    clearInterval(intervalId);
    level1.removeEventListener("click", speed1);
    level2.removeEventListener("click", speed2);
    level3.removeEventListener("click", speed3);
}

function startGameOver() {
  gameEndBlock.style.visibility = "hidden";
  currentGameScore = 0;
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
  console.log(Snake[0].x, Snake[0].y, Snake[1].x, Snake[1].y);
  Snake.forEach((item) => {
    drawingSnake(item.x, item.y);
    console.log(Snake);
  });
  // Snake.forEach((item)=>{
  //     item[0].x = rx
  //     item[0].y = ry
  //     item[1].x = item[0].x + 1
  //     item[1].y = item[0].y
  //     console.log(Snake)

  // })
  rerender()
  directionMovementSnake = "left";
  level1.addEventListener("click", speed1);
  level2.addEventListener("click", speed2);
  level3.addEventListener("click", speed3);
  console.log("Это поле", field);
}
// buttonResetGame.addEventListener("click", startGameOver);
