import {squaresToCoords} from './helpFunctions'

class Wall {
    constructor(){}

    addWallToPanel = wall => {
        if (document.querySelector(`#wall-${wall.id}`)) return
        panelWalls.insertAdjacentHTML('beforeend',
            `<div 
            class="game-panel-walls__item game-panel-item"
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

    setSelectedWall = e => {
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

    addWall = () => {
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

    wallChange = e => {
        const wall = getSelectedWall()
        wall[e.name] = +e.value
        loadWalls()
    }
    
    takeDraggableWall = e => {
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
    
    dragWall = e => {
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
    
    dragWallOnKey = e => {
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
    
    dropDraggableWall = e => {
        const wall = getDraggableWall()
        if (wall) wall.draggable = null
    }

    deleteWall = wallId => {
        const index = walls.findIndex(wall => wall.id === wallId)
        walls.splice(index, 1)
        document.querySelector(`#wall-${wallId}`).remove()
        loadWalls()
    }

    copyWall = wallId => {
        const copiedWall = walls.filter(wall => wall.id === wallId)
        const wall = { ...copiedWall[0], hide: false, id: generateWallId() }
        walls.push(wall)
        addWallToPanel(wall)
        loadWalls()
    }

    hideWall = (e, wallId) => {
        e.classList.toggle('active')
        const wall = walls.find(wall => wall.id === wallId)
        wall.hide = !wall.hide
        loadWalls()
    }

}