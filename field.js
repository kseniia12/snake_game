const searchPlayingField = document.querySelector('.playing__field')

const field = [
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];

// console.log(field[3][4])

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
        x: 3,
        y: 5,
    },
    {
        x: 4,
        y: 5,
    },
    {
        x: 5,
        y: 5,
    },
    {
        x: 6,
        y: 5,
    },
    

];


function drawingSnake(x, y){
    field[x][y] = 1
    rerender()
}

// drawingSnake(Snake[0].header.x, Snake[0].header.y)
// drawingSnake(Snake[1].positionBody.x, Snake[1].positionBody.y)



// for (let i=0; i < Snake.length; i++){
//     for(let j in Snake[i]){
//         for(let k in Snake[i][j]){
//             console.log(Snake[i][j][k])
//         }
//     }
// }


Snake.forEach((item)=>{
    drawingSnake(item.x, item.y)
})




function rerender(){
    searchPlayingField.innerHTML='';
    drowUi()
}






    document.addEventListener('keydown', function(event) {
        switch (event.code) {
            case 'KeyS':
                Snake.forEach((item, index)=>{
                    if(index === 0){
                        field[item.x][item.y] = 0
                    }
                    item.x = item.x + 1
                    field[item.x][item.y] = 1
                  
                })
       
              
                // field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 0
                // Snake[1].positionBody.x =  Snake[0].header.x
                // Snake[1].positionBody.y =  Snake[0].header.y
                // Snake[0].header.x = Snake[0].header.x + 1
                // field[Snake[0].header.x][Snake[0].header.y] = 1
                // field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 1
    
                rerender()
                break;
    
    
            case 'KeyW':

            Snake.forEach((item, index)=>{
                if(index === Snake.length-1){
                    field[item.x][item.y] = 0
                }
                item.x = item.x - 1
                field[item.x][item.y] = 1
              
            })

                // field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 0
                // Snake[1].positionBody.x =  Snake[0].header.x
                // Snake[1].positionBody.y =  Snake[0].header.y
                // Snake[0].header.x = Snake[0].header.x - 1
                // field[Snake[0].header.x][Snake[0].header.y] = 1
                // field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 1
                // console.log("голова", [Snake[0].header.x],":",[Snake[0].header.y])
                // console.log("хвост", [Snake[1].positionBody.x],":",[Snake[1].positionBody.y])
    
                rerender()
                break;
            
            
            case 'KeyD':
                Snake.forEach((item, index)=>{
                    if(index === Snake.length-1){
                        field[item.x][item.y] = 0
                    }
                    if(index === 0){
                        field[item.x][item.y] = 0
                        item.y = item.y + 1
                    }
                    else{
                        item.x = item.x - 1
                    }
                    
                    field[item.x][item.y] = 1
                  
                })
                // item.x = item.x - 1
                // field[item.x][item.y] = 1
                // field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 0
                // Snake[1].positionBody.y =  Snake[0].header.y
                // Snake[1].positionBody.x =  Snake[0].header.x
                // Snake[0].header.y = Snake[0].header.y + 1
                // field[Snake[0].header.x][Snake[0].header.y] = 1
                // field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 1
                rerender()
                break;
            // case 'KeyA':
    
    
            //     field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 0
            //     Snake[1].positionBody.y =  Snake[0].header.y
            //     Snake[1].positionBody.x =  Snake[0].header.x
            //     Snake[0].header.y = Snake[0].header.y - 1
            //     field[Snake[0].header.x][Snake[0].header.y] = 1
            //     field[Snake[1].positionBody.x][Snake[1].positionBody.y] = 1
    
    
            //     console.log("голова", [Snake[0].header.x],":",[Snake[0].header.y])
            //     console.log("хвост", [Snake[1].positionBody.x],":",[Snake[1].positionBody.y])
            // rerender()
            // break;
          }
    
        console.log([Snake.finally_X], Snake.finally_Y)
      });
















// const snake = (x, y) => {
//     field[x][y] = 1
//     rerender()
// }


    // if (event.code == 'KeyS') {
    //   Snake.finally_X = Snake.initial_X + 1
    //   field[Snake.initial_X][Snake.initial_Y] = 0
    //   field[Snake.finally_X][Snake.initial_Y] = 1
    //   Snake.initial_X = Snake.finally_X
    //   rerender()
    // }


            // field[Snake[1].header.x][Snake[1].header.y] = 0
            // Snake[0].positionBody.x = Snake[0].positionBody.x + 1
            // field[Snake[0].positionBody.x][Snake[0].positionBody.y] = 1



    // console.log("Это х", Snake[0].header.x)
// console.log("Это у", Snake[0].header.y)
// console.log("Это след коор",field[(Snake[0].header.x)+1][Snake[0].header.y])

// if(field[(Snake[0].positionBody.x)+1][Snake[0].positionBody.y] === 2){
//     field[(Snake[0].positionBody.x)+1][Snake[0].positionBody.y] = 1
// }