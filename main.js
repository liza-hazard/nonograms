const gameBlock = document.querySelector('#game')

const testPicture = {
    "complexity": "light",
    "rows": 5,
    "cols": 5,
    // "calcSize": function() {return this.rows * this.cols},
    "size": function() {return this.rows * this.cols},
    "coordinates": [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ]
}

function gameStart(picture) {
    let nonogramBlock = document.createElement('div')
    nonogramBlock.classList.add('nonogram')
    nonogramBlock.setAttribute('data-size', picture.size())
    for (let i = 0; i < picture.size(); i++) {
        let box = document.createElement('div')
        box.classList.add('box')
        
        nonogramBlock.append(box)
    }
    gameBlock.append(nonogramBlock)
}


gameStart(testPicture)