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
    gameBlock.innerHTML = ''
    picture.setBoxCount()
    const nonogramBlock = document.createElement('div')
    const gameContainer = document.createElement('div')
    const solutionBtn = document.createElement('div')
    const randomGameBtn = document.createElement('div')
    const resetGameBtn = document.createElement('div')
    const rateBtn = document.createElement('div')
    const rateBlock = document.createElement('div')

    nonogramBlock.classList.add('nonogram')
    gameContainer.classList.add('game__container')
    rateBlock.classList.add('rate')
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
    gameBlock.append(createTimer(nonogramBlock))

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
                hintEmpty.addEventListener('click', stopTimer)
                gameContainer.append(hintEmpty)
            }
            gameContainer.append(hintEl)
            
        }
        
        
    }

    solutionBtn.innerHTML = 'show solution'
    randomGameBtn.innerHTML = 'start new game'
    resetGameBtn.innerHTML = 'reset game'
    rateBtn.innerHTML = 'rate'

    solutionBtn.addEventListener('click', () => {
        clearInterval(time)
        showSolution(picture)
    })
    randomGameBtn.addEventListener('click', () => {
        gameOver()
        gameStart(randomPic(pictures, picture))
    })
    resetGameBtn.addEventListener('click', () => {
        gameOver()
        gameStart(picture)
    })
    rateBtn.addEventListener('click', () => {
        document.querySelector('.rate').innerHTML = ''
        document.querySelector('.rate').append(showResults())
    })
    rateBlock.append(showResults())
    
    gameBlock.append(solutionBtn)
    gameBlock.append(randomGameBtn)
    gameBlock.append(resetGameBtn)
    gameBlock.append(rateBtn)
    gameBlock.append(rateBlock)
}

function checkBox(picture) {
    const boxesList = document.querySelectorAll('.filled')
    const resBox = [...document.querySelectorAll('.box')].map((el, i) => {
        if (el.classList.contains('filled')) return i
    }).filter(item => null != item).sort((a,b) => {return a-b;})
    if ( boxesList.length == picture.victoryBoxes().length && resBox.join('') == picture.victoryBoxes().join('')) {
        setTimeout(() => {gameOver(picture, true)}, 500)
    }
}

function gameOver(picture = 0, victory = false) {
    clearInterval(time)
    if (victory) {
        console.log('vic')
        const victoryObj = {...stopTimer()}
        victoryObj['name'] = picture.name
        victoryObj['complexity'] = picture.complexity
        let resultsArr = localStorage.getItem('results') == null ? [] : JSON.parse(localStorage.getItem('results'));
        resultsArr.push(victoryObj)
        localStorage.setItem('results', JSON.stringify(resultsArr))
    }
    time = 0
    second = 0 
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

function showSolution(picture) {
    const boxes = document.querySelectorAll('.box')
    const solution = picture.victoryBoxes()
    boxes.forEach((box) => {
        box.classList.remove('filled')
    })
    solution.forEach((vic) => {
        boxes[vic].classList.add('filled')
    })
}

function randomPic(array, curr = false) {
    let picture = array[Math.floor(Math.random() * ((array.length) - 0) ) + 0]
    if (curr) {
        while (curr.name == picture.name) {
            picture = array[Math.floor(Math.random() * ((array.length) - 0) ) + 0]
        }
    }
    return picture;
}

let second = 0;
let time;
function createTimer(board) {
    const timerBlock = document.createElement('div')

    timerBlock.classList.add('timer')
    timerBlock.innerHTML = '00:00'

    function startTimer() {
        if(!time) {
            time = setInterval(() => {
                second += 1000;
                let dateTimer = new Date(second);
                timerBlock.innerHTML = 
                ('0' + dateTimer.getUTCMinutes()).slice(-2) + ':' +
                ('0' + dateTimer.getUTCSeconds()).slice(-2)
            }, 1000)
        }
    }
    board.addEventListener('click', startTimer)

    return timerBlock;
}

function stopTimer() {
    const timeObj = {}
    timeObj['time'] = document.querySelector('.timer').innerHTML
    timeObj['seconds'] = second / 1000
    return timeObj;
}

function showResults() {            
    let resultsArr = localStorage.getItem('results') == null ? [] : JSON.parse(localStorage.getItem('results'));
    if (resultsArr.length > 0) {
        resultsArr = resultsArr.sort((a, b) => a.seconds > b.seconds ? 1 : -1);
    }
    const rating = document.createElement('div')
    rating.classList.add('rate__container')
    function tableRows(results) {
        let rows = ''
        for (let i = 0; i < results.length; i++) {
            rows += `
            <tr>
                <td>${i+1}</td>
                <td>${results[i].name}</td>
                <td>${results[i].complexity}</td>
                <td>${results[i].time}</td>
            </tr>`
        }
        return rows;
    }
    rating.innerHTML = `
    <table class="rate__table">
        <thead>
            <tr>
                <th>#</th>
                <th>Template</th>
                <th>Level</th>
                <th>Time</th>
            </tr>
        </thead>
        <tbody>${tableRows(resultsArr)}</tbody>
    </table>`;
    return rating;
}



gameStart(pictures[0])






// ripples

class Drop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.create();
    }
    
    create() {
        let dropEl = document.createElement('div');
        dropEl.classList.add('drop');
        dropEl.style.left = `${this.x}px`;
        dropEl.style.top = `${this.y}px`;
        document.body.appendChild(dropEl);
    }
}

const createDrop = e => {
    let xPos = e.clientX,
        yPos = e.clientY;
    
    let drop = new Drop(xPos, yPos);
    setTimeout(() => {document.querySelector('.drop').remove()}, 3000)
}

document.addEventListener('click', createDrop);