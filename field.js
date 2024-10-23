const Snake = {
    initial_X: 0,
    initial_Y: 2,
    finally_X: 0,
    finally_Y: 0,
}

const searchPlayingField = document.querySelector('.playing__field')

const field = [
    [0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
];
console.log(field[3][4])
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
            rowsItem.style.backgroundColor='yellow'
            rowsField.append(rowsItem)
            
        }

        searchPlayingField.append(rowsField)
    }
}
drowUi()


function rerender(){
    searchPlayingField.innerHTML='';
    drowUi()
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyS') {
      Snake.finally_X = Snake.initial_X + 1
      field[Snake.initial_X][Snake.initial_Y] = 0
      field[Snake.finally_X][Snake.initial_Y] = 1
      Snake.initial_X = Snake.finally_X
      rerender()
    }
    console.log(Snake.initial_X)
  });

// const snake = (x, y) => {
//     field[x][y] = 1
//     rerender()
// }
