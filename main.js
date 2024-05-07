const gameBlock = document.querySelector('#game')

class Nonogram {
    rows;
    cols;
    complexity;
    constructor(complexityNum, name, coordinates) {
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
        this.name = name
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
                    rowHint.push(numOrder)
                    currRow.splice(currRow.indexOf(1), numOrder)
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
            arr.sort((a,b) => {
                return a - b;
            })
            arr = Object.fromEntries(arr)
            return arr
        }
        return sortObj(hints);
    }
}

const pictures = []

let lightVer = new Nonogram(1, 'small-1',[
    [0, 1, 1, 1, 1],
    [0, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 1, 1]
]);
pictures.push(lightVer)
pictures.push(new Nonogram(1, 'small-2', [
    [0, 1, 1, 1, 0],
    [0, 1, 1, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [0, 0, 0, 1, 1]
]), 
new Nonogram(2, 'medium-1', [
    [0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
    [0, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0]
]),
new Nonogram(3, 'hard-1', [
    [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
]))


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
    createTabs(pictures)
    gameContainer.append(nonogramBlock)
    gameBlock.append(gameContainer)
    function createHints(picture) {
        const hints = picture.hintsPlacement()
        for (let el in hints) {
            // console.log(el)
            let hintEl = document.createElement('div')
            hintEl.classList.add('hint', 'hint--' + el.replace(/[^a-z]/g, ''))
            hints[el].forEach((clue) => {
                let clueEl = document.createElement('span')
                clueEl.classList.add('hint__element')
                clueEl.innerHTML = clue
                hintEl.append(clueEl)
            })
            if (el === 'col1') {
                let hintEmpty = document.createElement('div')
                hintEmpty.classList.add('hint', 'hint--' + el.replace(/[^a-z]/g, ''), 'hint--empty')
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
        setTimeout(gameOver, 500)
    }
}

function gameOver() {
    console.log('vic')
    gameBlock.innerHTML = ''
    // gameStart(pic)
}

function createTabs(pictures) {
    const tabsMain = document.createElement('div')
    const tabsHead = document.createElement('div')
    const tabsContainer = document.createElement('div')
    const gameLevels = ['light', 'medium', 'hard']
    tabsMain.classList.add('tabs')
    tabsHead.classList.add('tabs__header')
    tabsContainer.classList.add('tabs__container')
    gameLevels.forEach((el) => {
        const panelHead = document.createElement('div')
        const panelTab = document.createElement('div')
        panelHead.classList.add('tabs__button', 'tabs__button--' + el)
        panelHead.innerHTML = el
        panelHead.addEventListener('click', () => {
            document.querySelectorAll('.tabs__panel').forEach((tab) => {
                tab.classList.remove('tabs__panel--active')
            })
            panelTab.classList.add('tabs__panel--active')
        })
        panelTab.classList.add('tabs__panel', 'tabs__panel--' + el)
        pictures.filter((nonogram) => nonogram.complexity == el).forEach((pic) => {
            const game = document.createElement('div')
            game.classList.add('game')
            game.innerHTML = pic.name
            game.addEventListener('click', () => {
                gameOver()
                gameStart(pic)
            })
            panelTab.append(game)
        })
        tabsHead.append(panelHead)
        tabsContainer.append(panelTab)
    })
    tabsMain.append(tabsHead)
    tabsMain.append(tabsContainer)
    gameBlock.append(tabsMain)
}

gameStart(pictures[3])

