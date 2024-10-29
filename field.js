const Playing = document.querySelector('.playing')
const searchPlayingField = document.querySelector('.playing__field')
const currentAccount = document.querySelector('.current__account')
const ccount = document.querySelector('.ccount')
const count = document.querySelector('.count')
const recordAcountCount = document.querySelector('.record__account-count')
const endGame = document.createElement("div")
let buttonResetGame;
endGame.className = 'endGame__section'
endGame.insertAdjacentHTML('afterbegin', 
    `<div class="gameEndBlock">
    <p>Конец игры</p>
    <button class="button_reset_game">Начать сначала</button>
    </div>
    `
)
const level1 = document.querySelector('.level1')
const level2 = document.querySelector('.level2')
const level3 = document.querySelector('.level3')
let directionMovement = "up";
let intervalId
let recordScore



const field = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function drowUi(){
    for (let i=0; i<field.length; i++){
        const rowsField = document.createElement("div")
        rowsField.className="rows-field"
        for (let j=0; j<field[i].length; j++){
            let rowsItem = document.createElement("div")
            rowsItem.className = `rows-item` 
            if(field[i][j] === 0) {
                rowsItem.style.backgroundColor='#546545'; 
                rowsField.append(rowsItem)
                continue;
            }
            if(field[i][j] === 2) {
                rowsItem.style.backgroundColor='#782514'
                rowsField.append(rowsItem)
                continue;
            }
            rowsItem.style.backgroundColor='#563212'
            rowsField.append(rowsItem)
            
        }

        searchPlayingField.append(rowsField)
    }
}
drowUi()

const Snake = [
    {
        x: 3,
        y: 5,
        oldX: 9,
        oldY: 5,
    },
    {
        x: 4,
        y: 5,
        oldX: 10,
        oldY: 5,
    },
    {
        x: 5,
        y: 5,
        oldX: 11,
        oldY: 5,
    },
    {
        x: 6,
        y: 5,
        oldX: 9,
        oldY: 5,
    },
    {
        x: 7,
        y: 5,
        oldX: 10,
        oldY: 5,
    },
    {
        x: 8,
        y: 5,
        oldX: 11,
        oldY: 5,
    },
    {
        x: 9,
        y: 5,
        oldX: 9,
        oldY: 5,
    },
    {
        x: 10,
        y: 5,
        oldX: 10,
        oldY: 5,
    },
    {
        x: 11,
        y: 5,
        oldX: 11,
        oldY: 5,
    },
    {
        x: 12,
        y: 5,
        oldX: 12,
        oldY: 5,
    },
    
    
    

];


let lengthSnake = 0;
function increaseLengthSnake(){
    lengthSnake = lengthSnake + 1
    recordScore = lengthSnake
    count.textContent = lengthSnake
    recordAcountCount.textContent = recordScore
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random(x, y){
    apple.x = getRandomInt(0, 13),
    apple.y = getRandomInt(0, 13)
}


const apple = {
    x: getRandomInt(0, 13),
    y: getRandomInt(0, 13),
}


function designApple(x, y){
    field[x][y] = 2
    rerender()
}

designApple(apple.x, apple.y)


function drawingSnake(x, y){
    field[x][y] = 1
    rerender()
}


Snake.forEach((item)=>{
    drawingSnake(item.x, item.y)
})




function rerender(){
    searchPlayingField.innerHTML='';
    drowUi()
}


function walkDown(){
    directionMovement = 'down'
    Snake.forEach((item, index)=>{
        item.oldX = item.x
        item.oldY = item.y
        if (index === 0){
            Snake[0].x = Snake[0].x + 1
        } else{
            field[Snake[Snake.length-1].x][Snake[Snake.length-1].y] = 0
            Snake[index].y = Snake[index-1].oldY
            Snake[index].x = Snake[index-1].oldX
        }
        field[item.x][item.y]=1
    })
    rerender()
}


function walkUp(){
    directionMovement = 'up'
    Snake.forEach((item, index)=>{
        item.oldX = item.x
        item.oldY = item.y
        // console.log(Snake)
        if (index === 0){
            Snake[index].x = Snake[index].x - 1
            // console.log("Это голова", Snake[index].x)
            // console.log("Это след блок", Snake[index].x - 1)
            // console.log(Snake[0].y)
        } 

        else{
            field[Snake[Snake.length-1].x][Snake[Snake.length-1].y] = 0
            Snake[index].y = Snake[index-1].oldY
            Snake[index].x = Snake[index-1].oldX
        }
        
        field[item.x][item.y]=1
    })
    // console.log(Snake)
        rerender()
}

function walkRight(){
    directionMovement = 'right'
    Snake.forEach((item, index)=>{
        item.oldX = item.x
        item.oldY = item.y
        if (index === 0){
            Snake[0].y = Snake[0].y + 1
        } else{
            field[Snake[Snake.length-1].x][Snake[Snake.length-1].y] = 0
            Snake[index].y = Snake[index-1].oldY
            Snake[index].x = Snake[index-1].oldX
        }
        field[item.x][item.y]=1
    })
    rerender()
}
function walkLeft(){
    directionMovement = 'left'
    Snake.forEach((item, index)=>{
        item.oldX = item.x
        item.oldY = item.y
        if (index === 0){
            Snake[0].y = Snake[0].y - 1
        } else{
            field[Snake[Snake.length-1].x][Snake[Snake.length-1].y] = 0
            Snake[index].y = Snake[index-1].oldY
            Snake[index].x = Snake[index-1].oldX
        }
        field[item.x][item.y]=1
    })
    rerender()
}
    document.addEventListener('keydown', function(event) {
        switch (event.code) {
            case 'KeyS':
                walkDown()
                break;
            case 'KeyW':
                walkUp()
                break;
            case 'KeyD':
                walkRight()
                break;
            case 'KeyA':
                walkLeft()
            break;
          }
      });


function moveSnace(){
    Snake.forEach((item, index)=>{
        item.oldX = item.x
        item.oldY = item.y
        if (index === 0){
            Snake[0].y = Snake[0].y + 1
        } else{
            field[Snake[Snake.length-1].x][Snake[Snake.length-1].y] = 0
            Snake[index].y = Snake[index-1].oldY
            Snake[index].x = Snake[index-1].oldX
        }
        field[item.x][item.y]=1
    })
    rerender()
}





function moveSnakeConstantly(){
    switch (directionMovement) {
        case 'down':
            if(field[Snake[0].x + 1][Snake[0].y] == 2){  
                Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                field[Snake[0].x + 1][Snake[0].y] = 0
                field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                increaseLengthSnake()
            }
            if (field[Snake[0].x + 1][Snake[0].y] === 1){
                walkDown()
                endGameOver()
            }
            walkDown()
            break;
        case 'up':
                if(field[Snake[0].x - 1][Snake[0].y] == 2){
                    Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                    field[Snake[0].x - 1][Snake[0].y] = 0
                    field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                    increaseLengthSnake()
                }
                if(field[Snake[0].x - 1][Snake[0].y] === 1){
                    walkUp()
                    endGameOver()
                }
            walkUp()
            break;
        case 'right':
            if(field[Snake[0].x][Snake[0].y+1] == 2){
                Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                field[Snake[0].x][Snake[0].y+1] = 0
                field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                increaseLengthSnake()
                rerender()
            }
            if(field[Snake[0].x][Snake[0].y+1] === 1){
                walkRight()
                endGameOver()
            }
            walkRight()
            break;
        case 'left':
            if(field[Snake[0].x][Snake[0].y-1] == 2){
                Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                field[Snake[0].x][Snake[0].y-1] = 0
                field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                increaseLengthSnake()
                rerender()
            }
            if(field[Snake[0].x][Snake[0].y-1] === field[Snake[0].x][Snake[0].y]){
                walkLeft()
                endGameOver()
            }
            walkLeft()
           

        break;
      }
}
let t = (()=>setInterval)

const createInterval = (time) => {
    if (intervalId) {
        clearInterval(intervalId)
    }
   intervalId = setInterval(moveSnakeConstantly, time)
}



function speed1(){
    createInterval(200)
}
function speed2(){
    createInterval(400)
}
function speed3(){
    createInterval(600)
}

level1.addEventListener("click", speed1);
level2.addEventListener("click", speed2);
level3.addEventListener("click", speed3);



function endGameOver(){
    searchPlayingField.before(endGame)
    buttonResetGame = endGame.querySelector('.button_reset_game')
    buttonResetGame.addEventListener('click' ,startGameOver)
    level1.removeEventListener("click", speed1);
    level2.removeEventListener("click", speed2);
    level3.removeEventListener("click", speed3);
    clearInterval(intervalId);
    console.log(buttonResetGame)

   

}

function startGameOver(){
    alert("h")
}
// buttonResetGame.addEventListener("click", startGameOver);