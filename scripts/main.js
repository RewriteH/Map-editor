var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel__walls')
var draggableWall = null
let selectedPanelItem = null

let walls = []

/*HELP FUNCTIONS */
const getSelectedWall = () => walls.find(e => e.active === true)
const getDraggableWall = () => walls.find(e => e.draggable === true)
const getXcoords = e => currArea.x + e.x
const getYcoords = e => currArea.y + e.y

/*END OF HELP FUNCTIONS */

const currArea = {
    x: 0,
    y: 0,
    width: 150,
    height: 170,
}

const setSelectedPanelItem = e => {
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
            panelWall.querySelector(`input[name=${prop}]`).value = wall[prop]
        }
    }
}

const toggleGrid = (e) => {
    if (e.checked) {
        ctx.beginPath()
        const w = canvas.width - 1;
        const h = canvas.height - 1;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0.1
        for (var x = -0.5; x < w; x += 30) ctx.strokeRect(x, 0, 0.1, h);
        for (var y = -0.5; y < h; y += 30) ctx.strokeRect(0, y, w, 0.1);
        ctx.fill()
        ctx.closePath()
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
}

const updateArea = wall => {
    grid()
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
    walls.map(e => {
        updateArea(e)
        updatePanel(e)
    }
    )
}

updateArea({ x: 0, y: 0, w: 15, h: 50, id: 1, burn: [], permeability: [] })

updateArea({ x: 50, y: 50, w: 15, h: 50, id: 2 })

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
    loadWalls()
}

const dragWall = e => {
    const wall = getDraggableWall()
    if (wall) {
        let newX = Math.round(e.layerX - currArea.x - (wall.w / 2))
        let newY = Math.round(e.layerY - currArea.y - (wall.h / 2))
        if (newX < 0) {
            newX = 0
        }
        if (newX >= currArea.width) {
            newX = currArea.width
        }
        if (newY < 0) {
            newY = 0
        }
        if (newY >= currArea.height) {
            newY = currArea.height
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
                if (currArea.width > wall.x) {
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
                if (currArea.height > wall.y) {
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
    updatePanel(wall)
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