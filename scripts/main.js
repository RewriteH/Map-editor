var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel__walls')
var draggableWall = null

const getSelectedWall = () => walls.find(e => e.active === true)
const getDraggableWall = () => walls.find(e => e.draggable === true)

const currArea = {
    x: 50,
    y: 50,
    width: 150,
    height: 150,
    x1: this.x + this.width,
    x2: this.y + this.height
}

let walls = []

const getXcoords = e => currArea.x + e.x
const getYcoords = e => currArea.y + e.y

canvas.onmousedown = e => {
    walls.forEach(wall => {
        // (Клик > координат начала wall && клик < координат конца wall
        if (e.layerX > getXcoords(wall) && e.layerX < getXcoords(wall) + wall.w) {
            wall.active = true
            wall.draggable = true
        } else { wall.active = false }
    }
    )
    loadWalls()
}

canvas.onmousemove = e => {
    const wall = getDraggableWall()
    if (wall) {
        let newX = e.layerX - currArea.x - (wall.w / 2)
        let newY = e.layerY - currArea.y - (wall.h / 2)
        if (newX < 0) {
            newX = 0
        }
        if (newX >= currArea.x + currArea.width) {
            newX = currArea.x + currArea.width
        }
        if (newY < 0) {
            newY = 0
        }
        if (newY >= currArea.y + currArea.height) {
            newY = currArea.y + currArea.height
        }
        wall.x = newX
        wall.y = newY
        loadWalls()
    }
}

document.onmouseup = e => {
    const wall = getDraggableWall()
    if (wall) wall.draggable = null
}

const setSelectedWall = e => {
    walls.forEach(wall => {
        if (+e.id === wall.id) {
            wall.active = true
        } else { wall.active = false }
    }
    )
    loadWalls()
}

const wallChange = e => {
    console.log(e)
    const r = walls.find(wall => wall.active === true)
    r[e.name] = +e.value
    loadWalls()
}

const addWall = wall => {
    if (walls.find(e => e.id === wall.id)) return
    walls.push(wall)
    panelWalls.insertAdjacentHTML('beforeend',
        `<div 
        class="game-panel__wall game-panel-wall"
        id="wall-${wall.id}"r
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
            console.log(1)
            panelWall.querySelector(`input[name=${prop}]`).innerHTML = wall[prop]
        }
    }
}

const updateArea = wall => {
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

const loadWalls = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    walls.map(e => updateArea(e))
}

updateArea({ x: 0, y: 0, w: 15, h: 50, id: 1 })

updateArea({ x: 50, y: 50, w: 15, h: 50, id: 2 })


const moveWallKey = e => {
    let wall = getSelectedWall()
    if (wall) {
        switch (e.code) {
            case 'KeyD':
            case 'ArrowRight':
                wall.x += 1
                break
            case 'KeyA':
            case 'ArrowLeft':
                wall.x -= 1
                break
            case 'KeyS':
            case 'ArrowDown':
                wall.y += 1
                break
            case 'KeyW':
            case 'ArrowUp':
                wall.y -= 1
                break
        }
    }
    updatePanel(wall)
    loadWalls()
}

document.addEventListener('keydown', moveWallKey)
