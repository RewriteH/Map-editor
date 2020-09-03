var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel-walls')
var panelAreas = document.querySelector('.game-panel-areas')
var gridCheckbox = document.querySelector('input[name=grid]')
var newElementButton = document.querySelectorAll('.game-panel-item__newElement')
var hideWallsCheckbox = document.querySelector('input[name=hideWalls]')
var hideAreasCheckbox = document.querySelector('input[name=hideAreas]')
var selectedPanelItem = null
var selectedPanelTab = null
var selectedElements = null

var areas = [
    { x: 36, y: 5, w: 30, h: 30, id: 1, color: 'rgba(50,50,50,0.3)', extra: { coup: false, x: 0, y: 0, } },
    { x: 15, y: 65, w: 30, h: 30, id: 2, color: 'rgba(50,50,50,0.3)', extra: { coup: false, x: 0, y: 0, } }
]
var walls = [
    { x: 0, y: 0, w: 30, h: 15, id: 1, hide: false },
    { x: 0, y: 0, w: 15, h: 15, id: 2, hide: false }
]

const gridSettings = {
    squareWidth: 100,
    squareHeight: 120,
}

/*HELP FUNCTIONS */
const getSelectedElement = () => !!selectedElements ? selectedElements.find(e => e.active === true) : null
const getDraggableElement = () => !!selectedElements ? selectedElements.find(e => e.draggable === true) : null
const getSelectedWall = () => walls.find(a => a.active === true)
const getAreaById = id => areas.find(area => area.id === id)
const getSelectedArea = () => areas.find(a => a.active === true)
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
const getXcoords = e => e.x * getXPixelRatio
const getYcoords = e => e.y * getYPixelRatio
const canvasWidthInSquares = gridSettings.squareWidth
const canvasHeightInSquares = gridSettings.squareHeight
const generateElementId = () => selectedElements.length + 1 || 1

/*END OF HELP FUNCTIONS */

const showAllHideElements = (e) => {
    if (!e.checked) return
    if (!hideWallsCheckbox.checked) {
        panelWalls.querySelectorAll('.game-panel-item__hide').forEach(e => e.classList.remove('active'))
        walls.forEach(e => e.hide = false)
    }
    if (!hideAreasCheckbox.checked) {
        panelAreas.querySelectorAll('.game-panel-item__hide').forEach(e => e.classList.remove('active'))
        areas.forEach(e => e.hide = false)
    }
    loadWalls()
}


const hideElement = (e, elementId) => {
    e.classList.toggle('active')
    const element = selectedElements.find(element => element.id === elementId)
    element.hide = !element.hide
    loadWalls()
}

const copyElement = elementId => {
    console.log(elementId)
    const copiedElement = selectedElements.filter(element => element.id === elementId)
    const element = { ...copiedElement[0], hide: false, id: generateElementId() }
    selectedElements.push(element)
    loadWalls()
}

const deleteElement = elementId => {
    const index = selectedElements.findIndex(element => element.id === elementId)
    selectedElements.splice(index, 1)
    document.querySelector(`#${selectedPanelTab}-${elementId}`).remove()
    loadWalls()
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
        selectedElements = wind
        selectedPanelTab = 'wind'
    }
}

const updateWallPanel = wall => {
    const panelWall = document.querySelector(`#wall-${wall.id}`)
    for (let prop in wall) {
        if (panelWall.querySelector(`input[name=${prop}]`)) {
            panelWall.querySelector(`input[name=${prop}]`).value = wall[prop]
        }
    }
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
    if (wall) wall.active = false
    const area = getSelectedArea()
    if (area) area.active = false
}


const setSelectedElement = e => {
    removeSelectedItem()
    setSelectedPanelItem(e)
    selectedElements.forEach(element => {
        if (e.id === `${selectedPanelTab}-${element.id}`) {
            element.active = true
        } else { element.active = false }
    })
    loadWalls()
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
            <div>
                <label for="x">x</label>
                <input id="x" type="checkbox" checked="${area.extra.x}">
            </div>
            <div>
                <label for="y">y</label>
                <input id="y" type="checkbox" checked="${area.extra.y}">
            </div>
            
            <button class="game-panel-item__hide" onClick="coupArea(${area.id})">
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

const coupArea = areaId => {
    const area = getAreaById(areaId)
    area.color = 'rgba(0, 0, 0, 0.3)'
    loadWalls()
}

const changeAreaColor = area => {
    const color = {
        1: 50,
        2: 50,
        3: 50
    }
    if (area.w > canvasWidthInSquares / 2) {
        color[1] = 90
    } 
    
    if (area.h > canvasHeightInSquares / 2) {
        color[2] = 90
    }
    if (area.x + area.w > canvasWidthInSquares / 2) {
        color[3] = 90
    }

    console.log(`rgba(${color[1]}, ${color[2]}, ${color[3]}, 0.3)`)

    area.color = `rgba(${color[1]}, ${color[2]}, ${color[3]}, 0.3)`
}

/*REDRAW AREA*/
const toggleGrid = e => {
    if (gridCheckbox.checked) {
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
}

//Отрисовка элемента
const drawElement = element => {
    if (element.hide) return
    ctx.beginPath()
    ctx.rect(
        getXcoords(element),
        getYcoords(element),
        element.w * getXPixelRatio,
        element.h * getYPixelRatio
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

//Очистка + загрузка ареи 
const loadWalls = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    toggleGrid()
    areas.map(e => {
        changeAreaColor(e)
        addAreaToPanel(e)
        drawElement(e)
    })

    if (!hideWallsCheckbox.checked) {
        walls.map(e => {
            addWallToPanel(e)
            updateWallPanel(e)
            drawElement(e)
        }
        )
    }
}

loadWalls()
/*END OF REDRAW AREA*/

/* LISTENERS */

const elementChange = e => {
    const element = getSelectedElement()
    element[e.name] = +e.value
    loadWalls()
}


const addElement = () => {

    const element = {
        x: 0,
        y: 0,
        w: 15,
        h: 15,
        id: generateElementId(),
        hide: false
    }

    if (selectedElements === areas) {
        element.extra = { x: 0, y: 0, coup: false }
        element.color = 'rgba(65, 212, 225, 0.3)'
    }

    selectedElements.push(element)
    loadWalls()
}

const takeDraggableElement = e => {
    removeSelectedItem()
    const elements = selectedElements
    if (!elements) return
    for (let i = 0; i < elements.length; i++) {
        if (e.layerX > getXcoords(elements[i]) && e.layerX < getXcoords(elements[i]) + elements[i].w * getXPixelRatio &&
            e.layerY > getYcoords(elements[i]) && e.layerY < getYcoords(elements[i]) + elements[i].h * getYPixelRatio) {
            if (!elements[i].hide) {
                elements[i].active = true
                setSelectedPanelItem(document.querySelector(`#${selectedPanelTab}-${elements[i].id}`))
                elements[i].draggable = true
                break
            }
        }
    }

    if (!getSelectedElement() && selectedPanelItem) setSelectedPanelItem(null)

    loadWalls()
}

const dragElement = e => {

    const element = getDraggableElement()

    if (element) {
        let newX = Math.round((e.layerX - element.x) / getXPixelRatio)
        let newY = Math.round((e.layerY - element.y) / getYPixelRatio)
        if (newX < 0) {
            newX = 0
        }
        if (newY < 0) {
            newY = 0
        }
        if (newX + element.w > canvasWidthInSquares) {
            newX = canvasWidthInSquares - element.w
        }
        if (newY + element.h > canvasHeightInSquares) {
            newY = canvasHeightInSquares - element.h
        }
        element.x = newX
        element.y = newY
        loadWalls()
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
    loadWalls()
}

const dropDraggableElement = e => {
    const element = getDraggableElement()
    if (element) element.draggable = null
}

newElementButton.forEach(e => e.addEventListener('click', addElement))

canvas.addEventListener('mousedown', takeDraggableElement)

canvas.addEventListener('mousemove', dragElement)

document.addEventListener('keydown', dragElementOnKey)

document.addEventListener('mouseup', dropDraggableElement)
/* END OF LISTENERS */