var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel__walls')
var gridCheckbox = document.querySelector('input[name=grid]')
var newWallForm = document.querySelector('.game-panel-wall__newWall')
var draggableWall = null
var selectedPanelItem = null

var walls = []

const gridSettings = {
    squareWidth: 100,
    squareHeight: 120,
}

/*HELP FUNCTIONS */
const getSelectedWall = () => walls.find(e => e.active === true)
const getDraggableWall = () => walls.find(e => e.draggable === true)
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
const getXcoords = e => currArea.x + e.x * getXPixelRatio
const getYcoords = e => currArea.y + e.y * getYPixelRatio
var canvasWidthInSquares = canvas.width / getXPixelRatio
var canvasHeightInSquares = canvas.height / getYPixelRatio
const generateId = () => walls.length ? walls[walls.length - 1].id + 1 : 1
/*END OF HELP FUNCTIONS */


const currArea = {
    x: 0,
    y: 0,
    width: 500,
    height: 600,
}

const addWall = () => {
    const wall = {
        x: 0,
        y: 0,
        w: 15,
        h: 15,
        id: generateId(),
        hide: false
    }
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
    const wall = { ...copiedWall[0], hide: false, id: generateId() }
    addWallToPanel(wall)
    loadWalls()
}


const deleteWall = wallId => {
    const index = walls.findIndex(wall => wall.id === wallId)
    walls.splice(index, 1)
    document.querySelector(`#wall-${wallId}`).remove()
    loadWalls()
}

const updatePanel = wall => {
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

const setSelectedWall = e => {
    setSelectedPanelItem(e)
    walls.forEach(wall => {
        if (e.id === `wall-${wall.id}`) {
            wall.active = true
        } else { wall.active = false }
    }
    )
    loadWalls()
}

const wallChange = e => {
    const wall = walls.find(wall => wall.active === true)
    wall[e.name] = +e.value
    console.log(wall)
    loadWalls()
}

const addWallToPanel = wall => {
    if (walls.find(e => e.id === wall.id)) return
    walls.push(wall)
    panelWalls.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel__wall game-panel-wall"
        id="wall-${wall.id}"
        onclick="setSelectedWall(this)"
    >
        <div class="game-panel-wall__coords">
            <span classname="game-panel">x:</span>
            <input name="x" oninput="wallChange(this)" value="${wall.x}">
            <span>y:</span>
            <input name="y" oninput="wallChange(this)" value="${wall.y}">
        </div>
        <div class="game-panel-wall__size">
            <span>width:</span>
            <input  oninput="wallChange(this)" name="w" value="${wall.w}">
            <span>height:</span>
            <input oninput="wallChange(this)" name="h" value="${wall.h}">
        </div>
        <button class="game-panel-wall__copy" onClick="copyWall(${wall.id})">Copy</button>
        <button class="game-panel-wall__hide" onClick="hideWall(this, ${wall.id})">
            Toggle hide
        </button>
        <button class="game-panel-wall__delete" onClick="deleteWall(${wall.id})">
            Delete
        </button>
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

//Отрисовка стены
const updateArea = wall => {
    if (wall.hide) return
    addWallToPanel(wall)
    ctx.beginPath()
    ctx.rect(
        getXcoords(wall),
        getYcoords(wall),
        wall.w * getXPixelRatio,
        wall.h * getYPixelRatio
    )
    if (wall.active) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5
        ctx.stroke();
    }
    ctx.fill()
    ctx.closePath()
}

//Очистка ареи + отрисовка сетки + отрисовка стен
const loadWalls = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    toggleGrid()
    walls.map(e => {
        updateArea(e)
        updatePanel(e)
    }
    )
}

updateArea({ x: 0, y: 0, w: 30, h: 30, id: 1, hide: false })
loadWalls()
/*END OF REDRAW AREA*/

/* LISTENERS */
const takeDraggableWall = e => {
    walls.forEach(wall => {
        // (Клик > координат начала wall && клик < координат конца wall
        if (e.layerX > getXcoords(wall) && e.layerX < getXcoords(wall) + wall.w * getXPixelRatio &&
            e.layerY > getYcoords(wall) && e.layerY < getYcoords(wall) + wall.h * getYPixelRatio) {
            if (!wall.hide) {
                wall.active = true
                setSelectedPanelItem(document.querySelector(`#wall-${wall.id}`))
                wall.draggable = true
            }
        } else { wall.active = false }
    }
    )
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
            e.layerX - currArea.x - (wall.w * getXPixelRatio / 2)
        )
        let newY = Math.round(
            e.layerY - currArea.y - (wall.h * getYPixelRatio / 2)
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