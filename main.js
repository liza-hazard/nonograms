const gameBlock = document.querySelector('#game')

class Nonogram {
    rows;
    cols;
    complexity;
    constructor(complexityNum, coordinates) {
        switch (complexityNum) {
            case 1:
                this.complexity = 'light'
                this.rows = 5;
                this.cols = 5;
                break;
            case 2:
                this.complexity = 'medium'
                this.rows = 10;
                this.cols = 10;
                break;
            case 3:
                this.complexity = 'hard'
                this.rows = 15;
                this.cols = 15;
                break;
        }
        this.coordinates = coordinates;
    }
    get size() {
        return this.rows * this.cols;
    }
    victoryBoxes() {
        const victoryArr = []
        for (let arr = 0; arr < this.coordinates.length; arr++) {
            console.log()
            this.coordinates[arr].forEach((el, index) => {
                if (el) {
                    victoryArr.push(index + (arr * this.cols))
                }
            })
        }
        return victoryArr.sort((a,b) => {return a-b;});
    }
    setBoxCount() {
        document.documentElement.style.setProperty('--columsCount', this.cols)
    }
    hintsPlacement() {
        const hints = {}
        this.coordinates.forEach((row, arrIndex) => {
            let col = []
            for (let j = 0; j < this.coordinates.length; j++) {
                col.push(this.coordinates[j][arrIndex])
            }
            hintSearch(col, arrIndex, 'col') 
            hintSearch(row, arrIndex, 'row')    
        })
        function hintSearch(row, arrIndex, oriental) {
            if (row.reduce((acc, elem) => acc + elem) > 1) {
                // console.log('recurse', rowCount(row, row.indexOf(1)))
                const rowHint = []
                let currRow = [...row]
                while (currRow.indexOf(1) >= 0) {
                    let numOrder = rowCount(currRow, currRow.indexOf(1))
                    // console.log('numOrder ', numOrder)
                    rowHint.push(numOrder)
                    currRow.splice(currRow.indexOf(1), numOrder)
                    // console.log('currRow ', currRow)
                }
                
                hints[oriental + (arrIndex + 1)] = rowHint
            } 
            else if (row.reduce((acc, elem) => acc + elem) === 1) {
                hints[oriental + (arrIndex + 1)] = [1]
            }
            else {
                hints[oriental + (arrIndex + 1)] = []
            }
        }
        function rowCount(row, boxIndex) {
            if (row[boxIndex + 1] == 0 || !row[boxIndex + 1]) return 1;
            return 1 + rowCount(row, boxIndex + 1);
        }
        function sortObj(obj) {
            let arr = []
            for (let elem in obj) {
                arr.push([elem, obj[elem]])
            }
            arr.sort()
            arr = Object.fromEntries(arr)
            return arr
        }
        return sortObj(hints);
    }
}

let pic = new Nonogram(1, [
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1]
]);

function gameStart(picture) {
    picture.setBoxCount()
    const nonogramBlock = document.createElement('div')
    const gameContainer = document.createElement('div')
    nonogramBlock.classList.add('nonogram')
    gameContainer.classList.add('game__container')
    nonogramBlock.setAttribute('data-size', picture.size)
    for (let i = 0; i < picture.size; i++) {
        let box = document.createElement('div')
        box.classList.add('box')
        box.addEventListener('click', () => {
            if (!box.classList.contains('nofill')) {
                box.classList.toggle('filled')
            }
            checkBox(picture)
        })
        box.addEventListener('contextmenu', (e) => {
            e.preventDefault()
            box.classList.toggle('nofill')
            if (box.classList.contains('filled')) {
                box.classList.remove('filled')
            }
        })
        nonogramBlock.append(box)
    }
    createHints(picture)
    gameContainer.append(nonogramBlock)
    gameBlock.append(gameContainer)
    function createHints(picture) {
        const hints = picture.hintsPlacement()
        for (let el in hints) {
            // console.log(el)
            let hintEl = document.createElement('div')
            hintEl.classList.add('hint', 'hint--' + el.slice(0, -1))
            hints[el].forEach((clue) => {
                let clueEl = document.createElement('span')
                clueEl.classList.add('hint__element')
                clueEl.innerHTML = clue
                hintEl.append(clueEl)
            })
            if (el === 'col1') {
                let hintEmpty = document.createElement('div')
                hintEmpty.classList.add('hint', 'hint--' + el.slice(0, -1), 'hint--empty')
                gameContainer.append(hintEmpty)
            }
            gameContainer.append(hintEl)
            
        }
        
        
    }
}

function checkBox(picture) {
    const boxesList = document.querySelectorAll('.filled')
    const resBox = [...document.querySelectorAll('.box')].map((el, i) => {
        if (el.classList.contains('filled')) return i
    }).filter(item => null != item).sort((a,b) => {return a-b;})
    if ( boxesList.length == picture.victoryBoxes().length && resBox.join('') == picture.victoryBoxes().join('')) {
        setTimeout(gameOver, 300)
    }
}

function gameOver() {
    console.log('vic')
    gameBlock.innerHTML = ''
    gameStart(pic)
}

gameStart(pic)

