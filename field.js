const searchPlayingField = document.querySelector('.playing__field')

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
                rowsItem.style.backgroundColor='green'
                rowsField.append(rowsItem)
                continue;
            }
            if(field[i][j] === 2) {
                rowsItem.style.backgroundColor='red'
                rowsField.append(rowsItem)
                continue;
            }
            rowsItem.style.backgroundColor='yellow'
            rowsField.append(rowsItem)
            
        }

        searchPlayingField.append(rowsField)
    }
}
drowUi()

const Snake = [
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
console.log(Snake[0].x)

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
    Snake.forEach((item, index)=>{
        item.oldX = item.x
        item.oldY = item.y
        if (index === 0){
            Snake[0].x = Snake[0].x - 1
        } else{
            field[Snake[Snake.length-1].x][Snake[Snake.length-1].y] = 0
            Snake[index].y = Snake[index-1].oldY
            Snake[index].x = Snake[index-1].oldX
        }
        field[item.x][item.y]=1
    })
        rerender()
}

function walkRight(){
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