const searchPlayingField = document.querySelector('.playing__field')
const field = [
    [1,0,0,0,0,0,1,0],
    [0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,0],
    [1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,1,0],
];

function checkField(field){
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

checkField(field)
