var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel-walls')
var panelAreas = document.querySelector('.game-panel-areas')
var panelWinds = document.querySelector('.game-panel-winds')
var gridCheckbox = document.querySelector('input[name=grid]')
var newElementButton = document.querySelectorAll('.game-panel-item__newElement')
var hideWallsCheckbox = document.querySelector('input[name=hideWalls]')
var hideAreasCheckbox = document.querySelector('input[name=hideAreas]')
var selectedPanelItem = null
var selectedPanelTab = null
var selectedElements = null
let gameObj = JSON.parse('{"areas":[{"x":25,"y":32,"w":15,"h":15,"id":1,"color":"rgba(50,50,50,0.3)","params":{"coup":true,"x":true,"y":false},"active":false},{"x":30,"y":47,"w":5,"h":21,"id":3,"hide":false,"params":{"x":0,"y":true,"coup":false},"active":false},{"x":9,"y":68,"w":21,"h":11,"id":4,"hide":false,"params":{"x":0,"y":0,"coup":true},"active":false},{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":false,"params":{"x":true,"y":false,"coup":false},"active":false},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":false,"params":{"x":0,"y":0,"coup":true},"active":false},{"x":91,"y":74,"w":9,"h":29,"id":7,"hide":false,"params":{"x":0,"y":true,"coup":false},"active":false},{"x":91,"y":33,"w":9,"h":20,"id":8,"hide":false,"params":{"x":0,"y":0,"coup":true},"active":false},{"x":91,"y":53,"w":9,"h":21,"id":9,"hide":false,"params":{"x":false,"y":true,"coup":true},"active":false},{"x":2,"y":22,"w":5,"h":5,"id":10,"color":"rgba(50,50,50,0.3)","params":{"coup":true,"x":true,"y":0},"hide":false}],"walls":[{"x":0,"y":79,"w":30,"h":1,"id":1,"hide":false,"active":false},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":false,"active":false},{"x":61,"y":103,"w":1,"h":10,"id":3,"hide":false,"active":false},{"x":9,"y":8,"w":1,"h":24,"id":4,"hide":false,"active":false},{"x":35,"y":47,"w":1,"h":21,"id":5,"hide":false,"active":false},{"x":9,"y":39,"w":1,"h":28,"id":6,"hide":false,"active":false},{"x":10,"y":39,"w":15,"h":1,"id":7,"hide":false,"active":false},{"x":40,"y":32,"w":1,"h":15,"id":8,"hide":false,"active":false},{"x":9,"y":67,"w":20,"h":1,"id":9,"hide":false,"active":false},{"x":24,"y":40,"w":1,"h":7,"id":10,"hide":false,"active":false},{"x":95,"y":112,"w":5,"h":1,"id":11,"hide":false,"active":false},{"x":36,"y":47,"w":5,"h":1,"id":12,"hide":false,"active":false},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":false,"active":false},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":false,"active":false},{"x":41,"y":90,"w":1,"h":14,"id":15,"hide":false,"active":false},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":false,"active":false},{"x":9,"y":112,"w":77,"h":1,"id":17,"hide":false,"active":false},{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":false,"active":false},{"x":0,"y":104,"w":52,"h":1,"id":19,"hide":false,"active":false},{"x":85,"y":103,"w":1,"h":9,"id":20,"hide":false,"active":false},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":false,"active":false},{"x":29,"y":80,"w":1,"h":10,"id":22,"hide":false,"active":false},{"x":29,"y":90,"w":12,"h":1,"id":23,"hide":false,"active":false},{"x":0,"y":79,"w":30,"h":1,"id":24,"hide":false,"active":false},{"x":29,"y":47,"w":1,"h":21,"id":25,"hide":false,"active":false},{"x":74,"y":90,"w":5,"h":1,"id":26,"hide":false,"active":false},{"x":24,"y":47,"w":5,"h":1,"id":27,"hide":false,"active":false},{"x":90,"y":40,"w":1,"h":63,"id":28,"hide":false,"active":false},{"x":73,"y":90,"w":1,"h":15,"id":29,"hide":false,"active":false},{"x":85,"y":102,"w":5,"h":1,"id":30,"hide":false,"active":false}]}')


var winds = [
    {
        x: 10, y: 30, w: 30, h: 30, id: 1,
        color: 'rgba(0,255,255,0.3)',
        params: { X: 1, Y: 1, forse: 1 }
    }
]

var areas = gameObj.areas
var walls = gameObj.walls

const gridSettings = {
    squareWidth: 100,
    squareHeight: 120,
}

/*HELP FUNCTIONS */
const getSelectedElement = () => !!selectedElements ? selectedElements.find(e => e.active === true) : null
const getDraggableElement = () => !!selectedElements ? selectedElements.find(e => e.draggable === true) : null
const getSelectedWall = () => walls.find(a => a.active === true)
const getSelectedArea = () => areas.find(a => a.active === true)
const getSelectedWind = () => winds.find(w => w.active === true)
const getAreaById = id => areas.find(area => area.id === id)
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
const xCoordsToPixels = coords => coords * getXPixelRatio
const yCoordsToPixels = coords => coords * getYPixelRatio
const canvasWidthInSquares = gridSettings.squareWidth
const canvasHeightInSquares = gridSettings.squareHeight
const generateElementId = () => selectedElements.length + 1 || 1

/*END OF HELP FUNCTIONS */

const showAllHideElements = e => {
    if (!e.checked) return
    if (!hideWallsCheckbox.checked) {
        panelWalls.querySelectorAll('.game-panel-item__hide').forEach(e => e.classList.remove('active'))
        walls.forEach(e => e.hide = false)
    }
    if (!hideAreasCheckbox.checked) {
        panelAreas.querySelectorAll('.game-panel-item__hide').forEach(e => e.classList.remove('active'))
        areas.forEach(e => e.hide = false)
    }
    renderAll()
}


const hideElement = (e, elementId) => {
    e.classList.toggle('active')
    const element = selectedElements.find(element => element.id === elementId)
    element.hide = !element.hide
    renderAll()
}

const copyElement = elementId => {

    const copiedElement = selectedElements.filter(element => element.id === elementId)
    let element;
    if (selectedElements === walls) {
        element = {
            ...copiedElement[0],
            active: false,
            draggable: false,
            id: generateElementId()
        }
    }
    if (selectedElements === winds || selectedElements === areas) {
        element = {
            ...copiedElement[0],
            params: { ...copiedElement[0].params },
            active: false,
            draggable: false,
            id: generateElementId()
        }
    }
    selectedElements.push(element)
    renderAll()
}

const deleteElement = elementId => {
    const index = selectedElements.findIndex(element => element.id === elementId)
    selectedElements.splice(index, 1)
    document.querySelector(`#${selectedPanelTab}-${elementId}`).remove()
    renderAll()
}

const toggleAreaParams = (areaId, el) => {
    el.classList.toggle('active')
    const area = getAreaById(areaId)
    area.params[el.id] = !area.params[el.id]
    renderAll()
}

const setSelectedTab = e => {
    if (e.id === 'settings') {
        selectedElements = null
        selectedPanelTab = null
        return
    }
    else if (e.id === 'walls') {
        selectedElements = walls
        selectedPanelTab = 'wall'
    }
    else if (e.id === 'areas') {
        selectedElements = areas
        selectedPanelTab = 'area'
    }
    else if (e.id === 'wind') {
        selectedElements = winds
        selectedPanelTab = 'wind'
    }
}

const updateElementPanel = element => {
    if (!selectedElements) return
    const panelElement = document.querySelector(`#${selectedPanelTab}-${element.id}`)
    panelElement.querySelector(`input[name=x]`).value = element.x
    console.log(panelElement.querySelector(`input[name=x]`))

}

const setSelectedPanelItem = e => {
    if (e === null) {
        selectedPanelItem.classList.remove('active')
        selectedPanelItem = null
        return
    }
    if (selectedPanelItem) {
        selectedPanelItem.classList.remove('active')
    }
    selectedPanelItem = e
    selectedPanelItem.classList.add('active')
}

const removeSelectedItem = () => {
    const wall = getSelectedWall()
    const area = getSelectedArea()
    const wind = getSelectedWind()
    if (wall) wall.active = false
    if (area) area.active = false
    if (wind) wind.active = false
}


const setSelectedElement = e => {
    removeSelectedItem()
    setSelectedPanelItem(e)
    selectedElements.forEach(element => {
        if (e.id === `${selectedPanelTab}-${element.id}`) {
            element.active = true
        } else { element.active = false }
    })
    renderAll()
}

const addWallToPanel = wall => {
    if (document.querySelector(`#wall-${wall.id}`)) return
    panelWalls.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel-walls__item game-panel-item"
        id="wall-${wall.id}"
        onmousedown="setSelectedElement(this)"
    >
        <div class="game-panel-item__coords">
            <span>x:</span>
            <input name="x" oninput="elementChange(this)" value="${wall.x}">
            <span>y:</span>
            <input name="y" oninput="elementChange(this)" value="${wall.y}">
        </div>
        <div class="game-panel-item__size">
            <span>width:</span>
            <input oninput="elementChange(this)" name="w" value="${wall.w}">
            <span>height:</span>
            <input oninput="elementChange(this)" name="h" value="${wall.h}">
        </div>
        <button class="game-panel-item__copy" onClick="copyElement(${wall.id})">Copy</button>
        <button class="game-panel-item__hide" onClick="hideElement(this, ${wall.id})">
            Toggle hide
        </button>
        <button class="game-panel-item__delete" onClick="deleteElement(${wall.id})">
            Delete
        </button>
    </div>`
    )
}

const addAreaToPanel = area => {
    if (document.querySelector(`#area-${area.id}`)) return
    panelAreas.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel-areas__item game-panel-item"
        id="area-${area.id}"
        onmousedown="setSelectedElement(this)"
    >
        <div class="game-panel-item__coords">
            <span>x:</span>
            <input name="x" oninput="elementChange(this)" value="${area.x}">
            <span>y:</span>
            <input name="y" oninput="elementChange(this)" value="${area.y}">
        </div>
        <div class="game-panel-item__size">
            <span>width:</span>
            <input oninput="elementChange(this)" name="w" value="${area.w}">
            <span>height:</span>
            <input oninput="elementChange(this)" name="h" value="${area.h}">
        </div>
        <div class="game-panel-item__params">
            <button id="x" class="${area.params.x ? 'active' : ''}" onClick="toggleAreaParams(${area.id}, this)">
                X
            </button>
            <button id="y" class="${area.params.y ? 'active' : ''}" onClick="toggleAreaParams(${area.id}, this)">
                Y
            </button>
            <button class="${area.params.y ? 'active' : ''}"
                onClick="coupArea(this, ${area.id})
             ">
                Coup
            </button>
        </div>
        <button class="game-panel-item__copy" onClick="copyElement(${area.id})">Copy</button>
        <button class="game-panel-item__hide" onClick="hideElement(this, ${area.id})">
            Toggle hide
        </button>
        <button class="game-panel-item__delete" onClick="deleteElement(${area.id})">
            Delete
        </button>
    </div>`
    )
}

const addWindToPanel = wind => {
    if (document.querySelector(`#wind-${wind.id}`)) return
    panelWinds.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel-wind__item game-panel-item"
        id="wind-${wind.id}"
        onmousedown="setSelectedElement(this)"
    >
        <div class="game-panel-item__coords">
            <span>x:</span>
            <input name="x" oninput="elementChange(this)" value="${wind.x}">
            <span>y:</span>
            <input name="y" oninput="elementChange(this)" value="${wind.y}">
        </div>
        <div class="game-panel-item__size">
            <span>width:</span>
            <input oninput="elementChange(this)" name="w" value="${wind.w}">
            <span>height:</span>
            <input oninput="elementChange(this)" name="h" value="${wind.h}">
        </div>
        <div class="game-panel-item__params">
            <span>X:</span>
            <input oninput="elementChange(this)" name="X" value="${wind.params.X}">
            <span>Y:</span>
            <input oninput="elementChange(this)" name="Y" value="${wind.params.Y}">
            <span>Forse:</span>
            <input oninput="elementChange(this)" name="forse" value="${wind.params.forse}">
        </div>
        <button class="game-panel-item__copy" onClick="copyElement(${wind.id})">Copy</button>
        <button class="game-panel-item__hide" onClick="hideElement(this, ${wind.id})">
            Toggle hide
        </button>
        <button class="game-panel-item__delete" onClick="deleteElement(${wind.id})">
            Delete
        </button>
    </div>`
    )
}

const coupArea = (e, areaId) => {
    e.classList.toggle('active')
    const area = getAreaById(areaId)
    area.params.coup = !area.params.coup
    renderAll()
}

const changeAreaColor = area => {

    let r = 220, g = 220, b = 220

    if (area.params) {
        !area.params.x || (r -= 120)
        !area.params.y || (b -= 120)
        !area.params.coup || (g -= 150)
    }
    area.color = `rgba(${r},${g},${b}, 0.3)`
}

/*REDRAW AREA*/
const renderGrid = e => {
    ctx.beginPath()
    const w = canvas.width - 2
    const h = canvas.height - 2
    const squareWidth = w / gridSettings.squareWidth
    const squareHeight = h / gridSettings.squareHeight
    ctx.strokeStyle = '#bdbdbd'
    ctx.lineWidth = 0.1
    for (var x = squareWidth; x < w; x += squareWidth) ctx.strokeRect(x, 0, 0.1, h)
    for (var y = squareHeight; y < h; y += squareHeight) ctx.strokeRect(0, y, w, 0.1)
    ctx.fill()
    ctx.closePath()
}

//Отрисовка элемента
const drawElement = element => {
    if (element.hide) return
    ctx.beginPath()
    ctx.rect(
        xCoordsToPixels(element.x),
        yCoordsToPixels(element.y),
        xCoordsToPixels(element.w),
        yCoordsToPixels(element.h)
    )
    if (element.active) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3
        ctx.stroke();
    }
    ctx.fillStyle = element.color || 'black'
    ctx.fill()
    ctx.closePath()
}

const drawWindDirection = wind => {
    ctx.beginPath()
    ctx.font = '18px serif';
    ctx.fillStyle = 'red'
    ctx.fillText(
        'Left <',
        xCoordsToPixels(wind.x + wind.w / 2),
        yCoordsToPixels(wind.y + wind.h / 2)
    );
    ctx.closePath()
}

const blowWall = wind => {
    const maxX = wind.x + wind.w
    const maxY = wind.y + wind.h
    currWalls = []
    walls.forEach(wall => {
        if (wall.x + wall.w > wind.x &&
            wall.x < maxX &&
            wall.y + wall.h > wind.y &&
            wall.y < maxY
        ) {
            currWalls.push(wall)
        }
    }
    )
    setTimeout(() => {
        currWalls.forEach(wall => {
            if (wind.params.X) {
                wall.x += wind.params.forse
            }
            if (wind.params.Y) {
                wall.y += wind.params.forse
            }
        })
        renderAll()
    }, 1000);
}


//Очистка + загрузка ареи 
const renderAll = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (gridCheckbox.checked)
        renderGrid()

    if (!hideAreasCheckbox.checked) {
        areas.forEach(e => {
            changeAreaColor(e)
            addAreaToPanel(e)
            drawElement(e)
        })
    }
    winds.forEach(e => {
        addWindToPanel(e)
        drawElement(e)
    })

    if (!hideWallsCheckbox.checked) {
        walls.forEach(e => {
            addWallToPanel(e)
            drawElement(e)
        }
        )
    }
}

renderAll()
/*END OF REDRAW AREA*/

/* LISTENERS */

const elementChange = e => {
    const element = getSelectedElement()
    element[e.name] = +e.value
    renderAll()
}


const addElement = () => {

    const element = {
        x: canvasHeightInSquares / 2,
        y: canvasWidthInSquares / 2,
        w: 15,
        h: 15,
        id: generateElementId(),
        hide: false,
        draggable: false,
        active: false,
    }

    if (selectedElements === areas) {
        element.params = { x: 0, y: 0, coup: false }
    }
    if (selectedElements === winds) {
        element.params = { X: 10, Y: 10, forse: 1 }
        element.color = 'rgba(0,255,255,0.3)'
    }

    selectedElements.push(element)
    renderAll()
}

const takeDraggableElement = e => {
    xStartFoDrug = e.clientX - canvas.offsetTop;
    yStartFoDrug = e.clientY - canvas.offsetLeft;
    removeSelectedItem()
    const elements = selectedElements
    if (!elements) return
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].hide)
            continue

        const elXStart = xCoordsToPixels(elements[i].x)
        const elXEnd = elXStart + xCoordsToPixels(elements[i].w)
        const elYStart = xCoordsToPixels(elements[i].y)
        const elYEnd = elYStart + xCoordsToPixels(elements[i].h)

        if (xStartFoDrug > elXStart &&
            xStartFoDrug < elXEnd &&
            yStartFoDrug > elYStart &&
            yStartFoDrug < elYEnd) {
            elements[i].active = true
            setSelectedPanelItem(document.querySelector(`#${selectedPanelTab}-${elements[i].id}`))
            elements[i].draggable = true
            elements[i].xStatr = elements[i].x
            elements[i].yStatr = elements[i].y
            break
        }
    }

    if (!getSelectedElement() && selectedPanelItem) setSelectedPanelItem(null)

    renderAll()
}

function xPixelsToCoords(xPx) { return Math.round(xPx / getXPixelRatio) }
function yPixelsToCoords(yPx) { return Math.round(yPx / getYPixelRatio) }

const dragElement = e => {

    const xActualDrug = e.clientX - canvas.offsetTop;
    const yActualDrug = e.clientY - canvas.offsetLeft;
    const element = getDraggableElement()

    if (element) {
        let newX = xPixelsToCoords(xActualDrug - xStartFoDrug)
        let newY = xPixelsToCoords(yActualDrug - yStartFoDrug)

        const xMax = canvasWidthInSquares - element.w
        const YMax = canvasHeightInSquares - element.h
        const xMin = 0
        const YMin = 0

        element.x = Math.min(element.xStatr + newX, xMax)
        element.y = Math.min(element.yStatr + newY, YMax)

        element.x = Math.max(element.x, xMin)
        element.y = Math.max(element.y, YMin)

        renderAll()
    }
}

const dragElementOnKey = e => {
    let element = getSelectedElement()
    if (element) {
        let elementLength = element.w > element.h ? 'w' : 'h'
        switch (e.code) {
            case 'KeyD':
            case 'ArrowRight':
                if (element.x + element.w < canvasWidthInSquares) {
                    element.x += 1
                } else {
                    element.x = canvasWidthInSquares - element.w
                }
                break
            case 'KeyA':
            case 'ArrowLeft':
                if (0 < element.x) {
                    element.x -= 1
                }
                break
            case 'KeyS':
            case 'ArrowDown':
                if (element.y + 1 + element.h < canvasHeightInSquares) {
                    element.y += 1
                } else {
                    element.y = canvasHeightInSquares - element.h
                }
                break
            case 'KeyW':
            case 'ArrowUp':
                if (0 < element.y) {
                    element.y -= 1
                }
                break
            case 'KeyQ':
                if (element[elementLength] > 10) {
                    element[elementLength] -= 1
                }
                break
            case 'KeyE':
                element[elementLength] += 1
        }
    }
    renderAll()
}

const dropDraggableElement = e => {
    const element = getDraggableElement()
    if (element) {
        element.draggable = null
        delete element.xStatr
        delete element.yStatr
    }
}

newElementButton.forEach(e => e.addEventListener('click', addElement))

canvas.addEventListener('mousedown', takeDraggableElement)

canvas.addEventListener('mousemove', dragElement)

document.addEventListener('keydown', dragElementOnKey)

document.addEventListener('mouseup', dropDraggableElement)
/* END OF LISTENERS */