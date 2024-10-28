const Playing = document.querySelector('.playing')
const searchPlayingField = document.querySelector('.playing__field')
const currentAccount = document.querySelector('.current__account')
const endGame = document.createElement("div")
let directionMovement = "up"
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





function moveSnakeConstantly(directionMovement){
    switch (directionMovement) {
        case 'down':
            if(field[Snake[0].x + 1][Snake[0].y] == 2){  
                Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                field[Snake[0].x + 1][Snake[0].y] = 0
                field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                
            }
            walkDown()
            Snake.forEach((item, index)=>{
                if(field[Snake[0].x + 1][Snake[0].y] === 1){
                    alert('dsd')
                    
                }
            })
            break;
        case 'up':
                if(field[Snake[0].x - 1][Snake[0].y] == 2){
                    Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                    field[Snake[0].x - 1][Snake[0].y] = 0
                    field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                }
            walkUp()
            Snake.forEach((item, index)=>{
                if(field[Snake[0].x - 1][Snake[0].y] === 1){
                    alert('dsd')
                }
            })
            break;
        case 'right':
            if(field[Snake[0].x][Snake[0].y+1] == 2){
                Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                field[Snake[0].x][Snake[0].y+1] = 0
                field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
            }
            walkRight()
            Snake.forEach((item, index)=>{
                if(field[Snake[0].x][Snake[0].y+1] === 1){
                    alert('dsd')
                }
            })
            break;
        case 'left':
            if(field[Snake[0].x][Snake[0].y-1] == 2){
                Snake.push({x: Snake[Snake.length-1].x, y:Snake[Snake.length-1].y, oldX: Snake[Snake.length-1].x, oldY: Snake[Snake.length-1].y})
                field[Snake[0].x][Snake[0].y-1] = 0
                field[getRandomInt(0, 13)][getRandomInt(0, 13)] = 2
                
            }
            walkLeft()
            Snake.forEach((item, index)=>{
                if(field[Snake[0].x][Snake[0].y-1] === field[Snake[0].x][Snake[0].y]){
                    
                }
            })

        break;
      }
}


Playing.before(endGame)


let time = setInterval(()=>{
    moveSnakeConstantly(directionMovement)
}, 300)


setTimeout(() => { clearInterval(time); alert('stop'); }, 100000);