var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel__walls')
var gridCheckbox = document.querySelector('input[name=grid]')
var draggableWall = null
var selectedPanelItem = null

var walls = []

const gridSettings = {
    squareWidth: 25,
    squareHeight: 15,
}

/*HELP FUNCTIONS */
const getSelectedWall = () => walls.find(e => e.active === true)
const getDraggableWall = () => walls.find(e => e.draggable === true)
const getXcoords = e => currArea.x + e.x
const getYcoords = e => currArea.y + e.y
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
/*END OF HELP FUNCTIONS */


const currArea = {
    x: 0,
    y: 0,
    width: 250,
    height: 270,
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
    loadWalls()
}

const addWall = wall => {
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
    </div>`
    )
}

const updatePanel = wall => {
    const panelWall = document.querySelector(`#wall-${wall.id}`)
    for (let prop in wall) {
        if (panelWall.querySelector(`input[name=${prop}]`)) {
            panelWall.querySelector(`input[name=${prop}]`).value = wall[prop]
        }
    }
}

/*REDRAW AREA*/
const toggleGrid = e => { // Сетка
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

const updateArea = wall => { //Рисовка стены
    toggleGrid()
    ctx.beginPath()
    addWall(wall)
    ctx.rect(getXcoords(wall), getYcoords(wall), wall.w, wall.h);
    if (wall.active) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5
        ctx.stroke();
    }
    ctx.fill()
    ctx.closePath()
}

const loadWalls = () => { //Очистка ареи + отрисовка стен
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    walls.map(e => {
        updateArea(e)
        updatePanel(e)
    }
    )
}

updateArea({ x: 0, y: 0, w: 15, h: 50, id: 1, burn: [], permeability: [] })
/*END OF REDRAW AREA*/

/* LISTENERS */
const takeDraggableWall = e => {
    walls.forEach(wall => {
        // (Клик > координат начала wall && клик < координат конца wall
        if (e.layerX > getXcoords(wall) && e.layerX < getXcoords(wall) + wall.w &&
            e.layerY > getYcoords(wall) && e.layerY < getYcoords(wall) + wall.h) {
            wall.active = true
            setSelectedPanelItem(document.querySelector(`#wall-${wall.id}`))
            wall.draggable = true
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
        square = Math.round(square * getXPixelRatio)
        return (square)
    } 
    if (axis === 'Y') {
        let square = Math.round(coords / getYPixelRatio)
        square = Math.round(square * getYPixelRatio)
        return (square)
    }

}


const dragWall = e => {
    const wall = getDraggableWall()
    if (wall) {
        let newX = Math.round(
            e.layerX - currArea.x - (wall.w / 2)
        )
        let newY = Math.round(
            e.layerY - currArea.y - (wall.h / 2)
        )
        newX = squaresToCoords(newX, 'X')
        newY = squaresToCoords(newY, 'Y')
        if (newX < 0) {
            newX = 0
        }
        if (newX >= currArea.width - wall.w) {
            newX = currArea.width - wall.w
        }
        if (newY < 0) {
            newY = 0
        }
        if (newY >= currArea.height - wall.h) {
            newY = currArea.height - wall.h
        }
        wall.x = newX
        wall.y = newY
        loadWalls()
    }
}

const dragWallOnKey = e => {
    let wall = getSelectedWall()
    let wallLength = wall.w > wall.h ? 'w' : 'h'
    if (wall) {
        switch (e.code) {
            case 'KeyD':
            case 'ArrowRight':
                if (currArea.width - wall.w > wall.x) {
                    wall.x += 1
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
                if (currArea.height - wall.h > wall.y) {
                    wall.y += 1
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