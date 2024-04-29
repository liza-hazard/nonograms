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
}

let pic = new Nonogram(1, [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1]
]);

function gameStart(picture) {
    picture.setBoxCount()
    let nonogramBlock = document.createElement('div')
    nonogramBlock.classList.add('nonogram')
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
    gameBlock.append(nonogramBlock)
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

