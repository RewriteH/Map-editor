var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel__walls')
var panelAreas = document.querySelector('.game-panel__areas')
var gridCheckbox = document.querySelector('input[name=grid]')
var newWallForm = document.querySelector('.game-panel-wall__newWall')
var draggableWall = null
var selectedPanelItem = null

var areas = [
    { x: 36, y: 5, w: 30, h: 30, id: 1,  color: 'rgba(0, 0, 0, 0.2)'},
    { x: 15, y: 65, w: 30, h: 30, id: 2, color: 'rgba(0, 0, 0, 0.2)'}
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
const getSelectedWall = () => walls.find(e => e.active === true)
const getDraggableWall = () => walls.find(e => e.draggable === true)
const getSelectedArea = () => areas.find(a => a.active === true)
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
const getXcoords = e => e.x * getXPixelRatio
const getYcoords = e => e.y * getYPixelRatio
var canvasWidthInSquares = gridSettings.squareWidth
var canvasHeightInSquares = gridSettings.squareHeight
const generateWallId = () => walls.length + 1 || 1
const generateAreaId = () => areas.length + 1 || 1
/*END OF HELP FUNCTIONS */

const addWall = () => {
    const wall = {
        x: 0,
        y: 0,
        w: 15,
        h: 15,
        id: generateWallId(),
        hide: false
    }
    walls.push(wall)
    addWallToPanel(wall)
    loadWalls()
}

const hideWall = (e, wallId) => {
    e.classList.toggle('active')
    const wall = walls.find(wall => wall.id === wallId)
    wall.hide = !wall.hide
    loadWalls()
}

const copyWall = wallId => {
    const copiedWall = walls.filter(wall => wall.id === wallId)
    const wall = { ...copiedWall[0], hide: false, id: generateWallId() }
    walls.push(wall)
    addWallToPanel(wall)
    loadWalls()
}


const deleteWall = wallId => {
    const index = walls.findIndex(wall => wall.id === wallId)
    walls.splice(index, 1)
    document.querySelector(`#wall-${wallId}`).remove()
    loadWalls()
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

const setSelectedWall = e => {
    removeSelectedItem()
    setSelectedPanelItem(e)
    walls.forEach(wall => {
        if (e.id === `wall-${wall.id}`) {
            wall.active = true
        } else { wall.active = false }
    }
    )
    loadWalls()
}

const setSelectedArea = e => {
    removeSelectedItem()
    setSelectedPanelItem(e)
    areas.forEach(area => {
        if (e.id === `area-${area.id}`) {
            area.active = true
        } else { area.active = false}
    })
    console.log(getSelectedArea())
    loadWalls()
}

const wallChange = e => {
    const wall = getSelectedWall()
    wall[e.name] = +e.value
    loadWalls()
}

const areaChange = e => {
    const area = getSelectedArea()
    area[e.name] = +e.value
    loadWalls()
}

const addWallToPanel = wall => {
    if (document.querySelector(`#wall-${wall.id}`)) return
    panelWalls.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel__item game-panel-item"
        id="wall-${wall.id}"
        onclick="setSelectedWall(this)"
    >
        <div class="game-panel-item__coords">
            <span>x:</span>
            <input name="x" oninput="wallChange(this)" value="${wall.x}">
            <span>y:</span>
            <input name="y" oninput="wallChange(this)" value="${wall.y}">
        </div>
        <div class="game-panel-item__size">
            <span>width:</span>
            <input  oninput="wallChange(this)" name="w" value="${wall.w}">
            <span>height:</span>
            <input oninput="wallChange(this)" name="h" value="${wall.h}">
        </div>
        <button class="game-panel-item__copy" onClick="copyWall(${wall.id})">Copy</button>
        <button class="game-panel-item__hide" onClick="hideWall(this, ${wall.id})">
            Toggle hide
        </button>
        <button class="game-panel-item__delete" onClick="deleteWall(${wall.id})">
            Delete
        </button>
    </div>`
    )
}

const addAreaToPanel = area => {
    if (document.querySelector(`#area-${area.id}`)) return
    panelAreas.insertAdjacentHTML('beforeend', 
    `<div 
        class="game-panel__item game-panel-item"
        id="area-${area.id}"
        onclick="setSelectedArea(this)"
    >
        <div class="game-panel-item__coords">
            <span>x:</span>
            <input oninput="areaChange(this)" name="x" value="${area.x}">
            <span>y:</span>
            <input oninput="areaChange(this)" name="y" value="${area.y}">
        </div>
        <button>Coup</button>
    </div>`
    )
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

//Очистка ареи 
const loadWalls = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    toggleGrid()
    areas.map(e => {
        conditionColor(e)
        addAreaToPanel(e)
        drawElement(e)
    })
    walls.map(e => {
        addWallToPanel(e)
        drawElement(e)
        updateWallPanel(e)
    }
    )
}

const conditionColor = element => {
    if (element.x + element.w > canvasWidthInSquares / 2) {
        element.color = 'rgba(65, 212, 225, 0.3)'
    }
    if (element.y + element.h > canvasHeightInSquares / 2) {
        element.color = 'rgba(225, 79, 65, 0.3)'
    }
}

loadWalls()
/*END OF REDRAW AREA*/

/* LISTENERS */
const takeDraggableWall = e => {
    removeSelectedItem()
    for (let i = 0; i < walls.length; i++) {
        if (e.layerX > getXcoords(walls[i]) && e.layerX < getXcoords(walls[i]) + walls[i].w * getXPixelRatio &&
            e.layerY > getYcoords(walls[i]) && e.layerY < getYcoords(walls[i]) + walls[i].h * getYPixelRatio) {
            if (!walls[i].hide) {
                walls[i].active = true
                setSelectedPanelItem(document.querySelector(`#wall-${walls[i].id}`))
                walls[i].draggable = true
                break
            }
        }
    }

    // Снятие активной таблички стены
    if (!getSelectedWall() && selectedPanelItem) setSelectedPanelItem(null)

    loadWalls()
}


const squaresToCoords = (coords, axis) => {
    if (axis === 'X') {
        let square = Math.round(coords / getXPixelRatio)
        return square
    }
    if (axis === 'Y') {
        let square = Math.round(coords / getYPixelRatio)
        return square
    }

}

const dragWall = e => {
    const wall = getDraggableWall()
    if (wall) {
        let newX = Math.round(
            e.layerX - (wall.w * getXPixelRatio / 2)
        )
        let newY = Math.round(
            e.layerY - (wall.h * getYPixelRatio / 2)
        )
        newX = squaresToCoords(newX, 'X')
        newY = squaresToCoords(newY, 'Y')
        if (newX < 0) {
            newX = 0
        }
        if (newY < 0) {
            newY = 0
        }
        if (newX + wall.w > canvasWidthInSquares) {
            newX = canvasWidthInSquares - wall.w
        }
        if (newY + wall.h > canvasHeightInSquares) {
            newY = canvasHeightInSquares - wall.h
        }
        wall.x = newX
        wall.y = newY
        loadWalls()
    }
}



const dragWallOnKey = e => {
    let wall = getSelectedWall()
    if (wall) {
        let wallLength = wall.w > wall.h ? 'w' : 'h'
        switch (e.code) {
            case 'KeyD':
            case 'ArrowRight':
                if (wall.x + wall.w < canvasWidthInSquares) {
                    wall.x += 1
                } else {
                    wall.x = canvasWidthInSquares - wall.w
                }
                break
            case 'KeyA':
            case 'ArrowLeft':
                if (0 < wall.x) {
                    wall.x -= 1
                }
                break
            case 'KeyS':
            case 'ArrowDown':
                if (wall.y + 1 + wall.h < canvasHeightInSquares) {
                    wall.y += 1
                } else {
                    wall.y = canvasHeightInSquares - wall.h
                }
                break
            case 'KeyW':
            case 'ArrowUp':
                if (0 < wall.y) {
                    wall.y -= 1
                }
                break
            case 'KeyQ':
                if (wall[wallLength] > 10) {
                    wall[wallLength] -= 1
                }
                break
            case 'KeyE':
                wall[wallLength] += 1
        }
    }
    loadWalls()
}

const dropDraggableWall = e => {
    const wall = getDraggableWall()
    if (wall) wall.draggable = null
}

canvas.addEventListener('mousedown', takeDraggableWall)

canvas.addEventListener('mousemove', dragWall)

document.addEventListener('keydown', dragWallOnKey)

document.addEventListener('mouseup', dropDraggableWall)
/* END OF LISTENERS */