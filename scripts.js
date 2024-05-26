/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 763:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    --columsCount: 5;
    --boxWidth: 27px;
    --boxHeight: 27px;
}

.game__container {
    display: grid;
    grid-template-rows: repeat(calc(var(--columsCount) + 2), calc(var(--boxWidth)));
    grid-template-columns: repeat(calc(var(--columsCount) + 2), calc(var(--boxHeight)));
    /* overflow: hidden; */
}
.hint {
    display: grid;
    place-items: center;
}
.nonogram {
    grid-template-columns: repeat(var(--columsCount), calc(var(--boxWidth)));
    grid-template-rows: repeat(var(--columsCount), calc(var(--boxHeight)));
    width: calc(var(--columsCount) * var(--boxWidth));
    height: calc(var(--columsCount) * var(--boxWidth));
    grid-column: 3/ span var(--columsCount);
    grid-row: 3/span var(--columsCount);
}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 601:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 72:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 659:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 540:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 825:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 113:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 803:
/***/ (() => {

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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/width.css
var width = __webpack_require__(763);
;// CONCATENATED MODULE: ./src/width.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(width/* default */.A, options);




       /* harmony default export */ const src_width = (width/* default */.A && width/* default */.A.locals ? width/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./src/main.js
var main = __webpack_require__(803);
;// CONCATENATED MODULE: ./src/index.js




})();

/******/ })()
;