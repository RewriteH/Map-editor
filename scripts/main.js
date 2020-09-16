
var canvas = document.querySelector('.game-area__ctx')
var ctx = canvas.getContext('2d')
var panelWalls = document.querySelector('.game-panel-walls')
var panelAreas = document.querySelector('.game-panel-areas')
var panelWinds = document.querySelector('.game-panel-winds')
var panelLevels = document.querySelector('.game-panel-levels')
var panelGroups = document.querySelector('.game-panel-groups')
var gridCheckbox = document.querySelector('input[id=toggleGrid]')
var hideWallsCheckbox = document.querySelector('input[id=hideWalls]')
var hideAreasCheckbox = document.querySelector('input[id=hideAreas]')
var hideWindsCheckbox = document.querySelector('input[id=hideWinds]')
var showAllElementsCheckbox = document.querySelector('input[id=showAllElements]')
var switchTabCheckbox = document.querySelector('input[id=switchTab]')
var bumpElementCheckbox = document.querySelector('input[id=bumpElement]')
var selectedPanelItem = null
var selectedPanelTab = null
var selectedElements = null
var draggableElement;
var activeElement;
var gameObj;
var areas;
var walls;
var winds;
var groups;

const gridSettings = {
    squareWidth: 100,
    squareHeight: 120,
}

//FIRST LEVEL
localStorage.setItem('level-1', '{"id":1, "name": "start", "groups":[{"id":1, "name": "startGroup", "x":0,"y":0,"w":0,"h":0,"elements":[]}],"areas":[{"x":25,"y":32,"w":15,"h":15,"id":1,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"active":0},{"x":30,"y":47,"w":5,"h":21,"id":3,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":9,"y":68,"w":21,"h":11,"id":4,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":79,"y":113,"w":11,"h":7,"id":5,"hide":0,"params":{"x":1,"y":0,"coup":0},"active":0,"color":"rgba(100,220,220, 0.3)"},{"x":90,"y":113,"w":10,"h":7,"id":6,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":74,"w":9,"h":29,"id":7,"hide":0,"params":{"x":0,"y":1,"coup":0},"active":0,"color":"rgba(220,220,100, 0.3)"},{"x":91,"y":33,"w":9,"h":20,"id":8,"hide":0,"params":{"x":0,"y":0,"coup":1},"active":0,"color":"rgba(220,70,220, 0.3)"},{"x":91,"y":53,"w":9,"h":21,"id":9,"hide":0,"params":{"x":0,"y":1,"coup":1},"active":0,"color":"rgba(220,70,100, 0.3)"},{"x":2,"y":19,"w":5,"h":5,"id":10,"color":"rgba(100,70,220, 0.3)","params":{"coup":1,"x":1,"y":0},"hide":0,"active":0,"draggable":null}],"walls":[{"x":0,"y":79,"w":30,"h":1,"id":1,"hide":0,"active":0,"bern":[0,0,1,0],"thru":[0,0,0,0]},{"x":10,"y":31,"w":31,"h":1,"id":2,"hide":0,"active":0,"bern":[0,1,0,1],"thru":[0,0,0,0]},{"x":61,"y":103,"w":1,"h":10,"id":3,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[1,1,1,0]},{"x":9,"y":8,"w":1,"h":24,"id":4,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":35,"y":47,"w":1,"h":21,"id":5,"hide":0,"active":0,"bern":[0,1,1,0],"thru":[0,1,1,0]},{"x":9,"y":39,"w":1,"h":28,"id":6,"hide":0,"active":0,"bern":[1,0,0,1],"thru":[0,1,1,0]},{"x":10,"y":39,"w":15,"h":1,"id":7,"hide":0,"active":1,"bern":[0,0,1,1],"thru":[1,0,1,0]},{"x":40,"y":32,"w":1,"h":15,"id":8,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":67,"w":20,"h":1,"id":9,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":24,"y":40,"w":1,"h":7,"id":10,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":95,"y":112,"w":5,"h":1,"id":11,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":47,"w":5,"h":1,"id":12,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":48,"y":67,"w":1,"h":15,"id":13,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":61,"y":95,"w":12,"h":1,"id":14,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":41,"y":90,"w":1,"h":14,"id":15,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":60,"y":82,"w":1,"h":14,"id":16,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":9,"y":112,"w":77,"h":1,"id":17,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":36,"y":67,"w":12,"h":1,"id":18,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":104,"w":52,"h":1,"id":19,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":103,"w":1,"h":9,"id":20,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":49,"y":81,"w":12,"h":1,"id":21,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":80,"w":1,"h":10,"id":22,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":90,"w":12,"h":1,"id":23,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":0,"y":79,"w":30,"h":1,"id":24,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":29,"y":47,"w":1,"h":21,"id":25,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":74,"y":90,"w":9,"h":1,"id":26,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":24,"y":47,"w":5,"h":1,"id":27,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":90,"y":33,"w":1,"h":70,"id":28,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0],"draggable":null},{"x":73,"y":90,"w":1,"h":15,"id":29,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]},{"x":85,"y":102,"w":5,"h":1,"id":30,"hide":0,"active":0,"bern":[0,0,0,0],"thru":[0,0,0,0]}],"winds":[{"x":91,"y":33,"w":9,"h":70,"id":1,"color":"rgba(0,255,255,0.3)","params":{"X":1,"Y":1,"forse":1},"active":0,"draggable":null,"X":0,"Y":-1,"forse":2},{"x":74,"y":91,"w":16,"h":11,"id":2,"params":{"X":0,"Y":0,"forse":0},"color":"rgba(0,255,255,0.3)","active":0,"draggable":null}]}')
var selectedLevel = JSON.parse(localStorage.getItem('level-1'))
//END OF FIRST LEVEL

/*HELP FUNCTIONS */
const getElementById = id => selectedElements.find(el => el.id === id)
const getAreaById = id => areas.find(el => el.id === id)
const getWallById = id => walls.find(el => el.id === id)
const getXPixelRatio = canvas.width / gridSettings.squareWidth
const getYPixelRatio = canvas.height / gridSettings.squareHeight
const xCoordsToPixels = coords => coords * getXPixelRatio
const yCoordsToPixels = coords => coords * getYPixelRatio
const canvasWidthInSquares = gridSettings.squareWidth
const canvasHeightInSquares = gridSettings.squareHeight
const clearAllPanels = () => {
    [...document.querySelectorAll(`.game-panel-item`)].forEach(e => e.remove());
}
const generateElementId = () => {
    let id = 1
    while (selectedElements.find(e => e.id === id))
        id += 1
    return id
}
const generateLevelId = () => {
    let level = 1
    while (localStorage.getItem('level-' + level)) {
        level += 1
    }
    return level
}
const getAllLevels = () => Object.keys(localStorage).map(lvl => JSON.parse(localStorage.getItem(lvl)))
/*END OF HELP FUNCTIONS */

const deleteElementOnGroups = elementId => {
    const element = getElementById(elementId)
    groups.forEach(g => {
        const index = g.elements.indexOf(element)
        if (index >= 0) {
            g.elements.splice(index, 1)
        }
    })
}

const toggleImportPop = () => {
    document.querySelector('.game-panel-item-import__rewrite').classList.remove('active')
    document.querySelector('.game-panel-item-import__area').classList.toggle('active')
}

const rewriteStorage = () => {
    let level = document.querySelector('.game-panel-item-import__text-area').value
    localStorage.setItem('level-' + JSON.parse(level).id, level)
    document.querySelector('.game-panel-item-import__rewrite').classList.remove('active')
}

const importLevel = () => {
    let level = document.querySelector('.game-panel-item-import__text-area').value

    if (typeof level === 'object') {
        level = JSON.stringify(level)
    }

    let status = JSON.parse(level)

    if (localStorage.getItem('level-' + status.id)) {
        document.querySelector('.game-panel-item-import__rewrite').classList.add('active')
        return
    }
    localStorage.setItem('level-' + status.id, level)
    addLevelToPanel(JSON.parse(level))
}

const exportLevels = () => {
    const levels = JSON.stringify(getAllLevels())
    const a = document.createElement('a');
    const file = new Blob([levels], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'levels.txt';
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove()
}

const exportLevel = levelId => {
    const level = localStorage.getItem('level-' + levelId)
    const a = document.createElement('a');
    const file = new Blob([level], {type: 'text/plain'});
    a.href = URL.createObjectURL(file);
    a.download = 'level-' + levelId + '.txt';
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove()
}

const toggleElementOnGroup = (select, elementId) => {
    const element = getElementById(elementId)
    deleteElementOnGroups(elementId)
    if (select.value !== '') {
        const selectedGroup = groups.find(g => g.id === +select.value)
        selectedGroup.elements.push(element)
    }
    clearAllPanels()
    renderAll()
}

const calcGroupPosition = group => {
    newX = gridSettings.squareWidth
    newW = 0
    newY = gridSettings.squareHeight
    newH = 0

    group.elements.forEach(e => {
        newX = Math.min(newX, e.x)
        newY = Math.min(newY, e.y)
        newW = Math.max(newW, e.x + e.w)
        newH = Math.max(newH, e.y + e.h)
    })

    group.x = newX
    group.y = newY
    group.w = newW - newX
    group.h = newH - newY

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

    element = {
        ...copiedElement[0],
        id: generateElementId()
    }

    if (selectedElements === winds || selectedElements === areas) {
        element = {
            ...copiedElement[0],
            params: { ...copiedElement[0].params },
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

const copyLevel = levelId => {
    const copiedLevel = JSON.parse(localStorage.getItem('level-' + levelId))
    const level = { ...copiedLevel, id: generateLevelId() }
    localStorage.setItem('level-' + level.id, JSON.stringify(level))
    addLevelToPanel(level)
}

const deleteLevel = levelId => {
    console.log(selectedLevel.id === levelId)
    if (selectedLevel.id === levelId) return
    localStorage.removeItem('level-' + levelId)
    panelLevels.querySelector('#level-' + levelId).remove()
    loadLevels()
}

const checkLevelChanges = () => {
    // const status = JSON.stringify(gameObj) === JSON.stringify(localStorage.getItem('level-' + selectedLevel.id))
    // const levelOnPanel = panelLevels.querySelector('#level-' + selectedLevel.id)
    // const saveButton = levelOnPanel.querySelector('.game-panel-item__save')

    // panelLevels.querySelector('.game-panel-item__save').classList.remove('active')

    // if (!status) {
    //     saveButton.classList.add('active')
    // }
}

const saveLevelChanges = levelId => {
    if (selectedLevel.id !== levelId) return
    localStorage.setItem('level-' + levelId, JSON.stringify(gameObj))
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
    }
    else if (e.id === 'walls') {
        selectedElements = walls
        selectedPanelTab = 'wall'
    }
    else if (e.id === 'areas') {
        selectedElements = areas
        selectedPanelTab = 'area'
    }
    else if (e.id === 'winds') {
        selectedElements = winds
        selectedPanelTab = 'wind'
    }
    else if (e.id === 'levels') {
        selectedPanelTab = 'level'
    }
    else if (e.id === 'groups') {
        selectedElements = groups
        selectedPanelTab = 'group'
    }
}

const switchPanelTab = () => {
    if (areas.includes(activeElement)) {
        document.querySelector('#areas').checked = true
        setSelectedTab({ id: 'areas' })
    }
    if (walls.includes(activeElement)) {
        document.querySelector('#walls').checked = true
        setSelectedTab({ id: 'walls' })
    }
    if (winds.includes(activeElement)) {
        document.querySelector('#winds').checked = true
        setSelectedTab({ id: 'winds' })
    }
}

const bumpPanelElement = () => {
    if (activeElement) {
        [...document.querySelectorAll(`.game-panel-${selectedPanelTab}s__item`)].forEach(e => e.remove())
        const elementToSwap = selectedElements[0]
        const indexToSwap = selectedElements.indexOf(activeElement)
        selectedElements[0] = activeElement
        selectedElements[indexToSwap] = elementToSwap
        renderAll()
    }
}

const updateWindPanel = element => {
    if (!selectedElements) return
    const panelElement = document.querySelector(`#wind-${element.id}`)
    for (let prop in element) {
        if (panelElement.querySelector(`input[name=${prop}]`)) {
            panelElement.querySelector(`input[name=${prop}]`).value = element[prop]
        }
    }
}

const updateAreaPanel = element => {
    if (!selectedElements) return
    const panelElement = document.querySelector(`#area-${element.id}`)
    for (let prop in element) {
        if (panelElement.querySelector(`input[name=${prop}]`)) {
            panelElement.querySelector(`input[name=${prop}]`).value = element[prop]
        }
    }
}

const updateWallPanel = element => {
    if (!selectedElements) return
    const panelElement = document.querySelector(`#wall-${element.id}`)
    for (let prop in element) {
        if (panelElement.querySelector(`input[name=${prop}]`)) {
            panelElement.querySelector(`input[name=${prop}]`).value = element[prop]
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
    if (activeElement) {
        selectedPanelItem = document.querySelector(`#${selectedPanelTab}-${activeElement.id}`)
        selectedPanelItem.classList.add('active')
    }
}

const setSelectedPanelLevel = levelId => {
    const selectedPanelLevel = panelLevels.querySelector('.game-panel-item.active')

    if (selectedPanelLevel) {
        selectedPanelLevel.classList.remove('active')
    }

    document.querySelector(`#level-${levelId}`).classList.add('active')

}

const setSelectedLevel = levelId => {
    setSelectedPanelLevel(levelId);
    clearAllPanels()
    selectedLevel = getAllLevels().find(lvl => lvl.id === levelId);
    loadLevels()
}

const removeSelectedItem = () => {
    activeElement = null
    renderAll()
}

const setSelectedElement = e => {
    activeElement = selectedElements.find(element =>
        e.id === `${selectedPanelTab}-${element.id}`
    )
    setSelectedPanelItem(e)
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
        <div class="game-item-panel__params">
            <span>Group:</span>
            <select name="group-select" onChange="toggleElementOnGroup(this, ${wall.id})">
            <option></option>
                ${groups.map(g =>
            `<option ${g.elements.includes(wall) ? 'selected' : ''}>${g.id}</option>`)
        }
            </select>
        </div>
        <button class="game-panel-item__copy" onClick="copyElement(${wall.id})">Copy</button>
        <button class="game-panel-item__bern">
            bern
            <div class="game-panel-item__bern-settings">
                <span class="${wall.bern[0] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 0)">↑</span>
                <div>
                    <span class="${wall.bern[1] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 1)">←</span>
                    <span class="${wall.bern[2] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 2)">→</span>
                </div>
                <span class="${wall.bern[3] ? 'active' : ''}" id="bern" onClick="toggleWallSettings(this, ${wall.id}, 3)">↓</span>
            </div>
        </button>
        <button class="game-panel-item__thru">
            thru
            <div class="game-panel-item__thru-settings">
                <span class="${wall.thru[0] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 0)">↑</span>
                <div>
                    <span class="${wall.thru[1] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 1)">←</span>
                    <span class="${wall.thru[2] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 2)">→</span>
                </div>
                <span class="${wall.thru[3] ? 'active' : ''}" id="thru" onClick="toggleWallSettings(this, ${wall.id}, 3)">↓</span>
            </div>
        </button>
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
            <span>Group:</span>
            <select name="group-select" onChange="toggleElementOnGroup(this, ${area.id})">
            <option></option>
                ${groups.map(g =>
            `<option ${g.elements.includes(area) ? 'selected' : ''}>${g.id}</option>`)
        }
            </select>
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
        class="game-panel-winds__item game-panel-item"
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
            <span>Group:</span>
            <select name="group-select" onChange="toggleElementOnGroup(this, ${wind.id})">
            <option></option>
                ${groups.map(g =>
            `<option ${g.elements.includes(wind) ? 'selected' : ''}>${g.id}</option>`)
        }
            </select>
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

const addLevelToPanel = level => {
    if (document.querySelector(`#level-${level.id}`)) return
    panelLevels.insertAdjacentHTML('beforeend',
        `<div 
            class="game-panel-levels__item game-panel-item ${selectedLevel.id === level.id ? 'active' : ''}"
            id="level-${level.id}"
        >
            <input name="name" value=${selectedLevel.id === level.id ? level.name : 'readonly'} oninput="levelChange(this)"}>
            <button class="game-panel-item__save" onClick="saveLevelChanges(${level.id})">
                Save
            </button>
            <button onmousedown="setSelectedLevel(${level.id})" class="game-panel-item__save">
                Load
            </button>
            <button class="game-panel-item__copy" onClick="copyLevel(${level.id})">
                Copy
            </button>
            <button class="game-panel-item__delete" onClick="deleteLevel(${level.id})">
                Delete
            </button>
            <button class="game-panel-item__export" onClick="exportLevel(${level.id})">
                Export 
            </button>
        </div>`
    )
}

const addGroupToPanel = group => {
    if (document.querySelector(`#group-${group.id}`)) return
    panelGroups.insertAdjacentHTML('beforeend',
        `<div 
            class="game-panel-groups__item game-panel-item"
            id="group-${group.id}"
            onmousedown="setSelectedElement(this)"
        >
            <input name="name" oninput="elementChange(this)" value="${group.name}">
            <button class="game-panel-item__group ${group.toggle ? 'active' : ''}">
                Toggle group
            </button>
            <button class="game-panel-item__copy" onClick="copyElement(${group.id})">
                Copy
            </button>
            <button class="game-panel-item__delete" onClick="deleteElement(${group.id})">
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

    !area.params.x || (r -= 120)
    !area.params.y || (b -= 120)
    !area.params.coup || (g -= 150)

    area.color = `rgba(${r},${g},${b}, 0.3)`
}

const toggleWallSettings = (el, wallId, paramIndex) => {
    el.classList.toggle('active')
    const wall = getWallById(wallId)
    wall[el.id][paramIndex] = Number(!wall[el.id][paramIndex])
    renderAll()
}

const drawWallSides = wall => {
    let x = xCoordsToPixels(wall.x),
        y = yCoordsToPixels(wall.y),
        w = xCoordsToPixels(wall.w),
        h = yCoordsToPixels(wall.h),
        bernWidth = 4
    thruWidth = 2

    ctx.beginPath()
    if (wall.bern[0]) {
        ctx.rect(x, y - bernWidth / 2, w, bernWidth);
    }

    if (wall.bern[1]) {
        ctx.rect(x - bernWidth / 2, y, bernWidth, h);
    }

    if (wall.bern[2]) {
        ctx.rect(x + w - bernWidth / 2, y, bernWidth, h);
    }

    if (wall.bern[3]) {
        ctx.rect(x, y + h - bernWidth / 2, w, bernWidth);
    }

    ctx.fillStyle = '#ffc012';
    ctx.fill()
    ctx.closePath()

    ctx.beginPath()

    if (wall.thru[0]) {
        ctx.rect(x, y - 1, w, thruWidth)
    }

    if (wall.thru[1]) {
        ctx.rect(x - 1, y, thruWidth, h);
    }

    if (wall.thru[2]) {
        ctx.rect(x + w - 1, y, thruWidth, h);
    }

    if (wall.thru[3]) {
        ctx.rect(x, y + h - 1, w, thruWidth);
    }

    ctx.fillStyle = "#a6aaad"
    ctx.fill()
    ctx.closePath()

}

/*RENDER*/
const renderGrid = () => {
    ctx.beginPath()
    const w = canvas.width
    const h = canvas.height
    const squareWidth = w / gridSettings.squareWidth
    const squareHeight = h / gridSettings.squareHeight
    ctx.strokeStyle = '#bdbdbd'
    ctx.lineWidth = 0.1
    for (var x = squareWidth; x < w; x += squareWidth) ctx.strokeRect(x, 0, 0.1, h)
    for (var y = squareHeight; y < h; y += squareHeight) ctx.strokeRect(0, y, w, 0.1)
    ctx.fill()
    ctx.closePath()
}

const loadLevels = () => {
    gameObj = JSON.parse(localStorage.getItem(`level-${selectedLevel.id}`))
    if (!gameObj) return
    walls = gameObj.walls
    areas = gameObj.areas
    winds = gameObj.winds
    groups = gameObj.groups

    const levels = getAllLevels().sort((a, b) => a.id - b.id)

    levels.forEach(lvl =>
        addLevelToPanel(lvl)
    )

    renderAll()
}

const drawElement = element => {
    let fillColor = '#2c8fdb'
    if (!showAllElementsCheckbox.checked) {
        if (element.hide) return
    }
    ctx.beginPath()
    ctx.rect(
        xCoordsToPixels(element.x),
        yCoordsToPixels(element.y),
        xCoordsToPixels(element.w),
        yCoordsToPixels(element.h)
    )
    //не стена
    if (element === activeElement && element.color) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3
        ctx.stroke();
    }
    ctx.fillStyle = element.color || 'black'
    //стена
    if (element === activeElement && !element.color) {
        ctx.fillStyle = fillColor
    }
    ctx.fill()
    ctx.closePath()
}

//Очистка + загрузка ареи 

const renderAll = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    //сохранение каждого изменения
    if (gridCheckbox.checked)
        renderGrid()

    if (!hideAreasCheckbox.checked) {
        areas.forEach(e => {
            changeAreaColor(e)
            addAreaToPanel(e)
            updateAreaPanel(e)
            drawElement(e)
        })
    }
    if (!hideWindsCheckbox.checked) {
        winds.forEach(e => {
            addWindToPanel(e)
            updateWindPanel(e)
            drawElement(e)
        })
    }
    if (!hideWallsCheckbox.checked) {
        walls.forEach(e => {
            addWallToPanel(e)
            updateWallPanel(e)
            drawElement(e)
            drawWallSides(e)
        }
        )
    }

    groups.forEach(g => {
        addGroupToPanel(g)
        calcGroupPosition(g)
        if (g === activeElement) {
            ctx.rect(
                xCoordsToPixels(g.x),
                yCoordsToPixels(g.y),
                xCoordsToPixels(g.w),
                yCoordsToPixels(g.h)
            )
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3
            ctx.stroke();
        }
    })

    checkLevelChanges()
}

loadLevels()
renderAll()
/*END OF RENDER*/

/* LISTENERS */

const elementChange = e => {
    activeElement[e.name] = e.value
    renderAll()
}

const levelChange = e => {
    gameObj[e.name] = e.value
}

const createWall = () => {
    const element = {
        x: canvasHeightInSquares / 2,
        y: canvasWidthInSquares / 2,
        w: 1,
        h: 15,
        id: generateElementId(),
        bern: [0, 0, 0, 0],
        thru: [0, 0, 0, 0]
    }
    selectedElements.push(element)
    renderAll()
}

const createArea = () => {
    const element = {
        x: canvasHeightInSquares / 2,
        y: canvasWidthInSquares / 2,
        w: 15,
        h: 15,
        id: generateElementId(),
        params: {},
    }

    selectedElements.push(element)
    renderAll()
}

const createWind = () => {
    const element = {
        x: canvasHeightInSquares / 2,
        y: canvasWidthInSquares / 2,
        w: 15,
        h: 15,
        id: generateElementId(),
        params: { X: 0, Y: 0, forse: 0 },
        color: 'rgba(0,255,255,0.3)'
    }
    selectedElements.push(element)
    renderAll()
}

const createGroup = () => {
    const group = {
        id: generateElementId(),
        elements: []
    };
    clearAllPanels()
    selectedElements.push(group)
    renderAll()
}

const createLevel = () => {
    newLevel = { id: generateLevelId(), name: 'level' + generateLevelId(), walls: [], areas: [], winds: [], groups: [] }
    localStorage.setItem(`level-${newLevel.id}`, JSON.stringify(newLevel))
    addLevelToPanel(newLevel)
}

const takeDraggableElement = e => {
    xStartFoDrug = e.clientX - canvas.offsetTop;
    yStartFoDrug = e.clientY - canvas.offsetLeft;

    removeSelectedItem()

    let elements = selectedElements

    if (switchTabCheckbox.checked)
        elements = [...walls, ...areas, ...winds]

    if (!elements) return

    for (let i = 0; i < elements.length; i++) {
        if (elements[i].hide)
            continue
        const elXStart = xCoordsToPixels(elements[i].x) - window.pageXOffset
        const elXEnd = elXStart + xCoordsToPixels(elements[i].w)
        const elYStart = yCoordsToPixels(elements[i].y) - window.pageYOffset
        const elYEnd = elYStart + yCoordsToPixels(elements[i].h)
        if (xStartFoDrug > elXStart &&
            xStartFoDrug < elXEnd &&
            yStartFoDrug > elYStart &&
            yStartFoDrug < elYEnd) {
            if (elements[i].elements) {
                console.log(elements[i])
                draggableElement = elements[i].elements
                activeElement = elements[i]
                elements[i].elements.forEach(e => {
                    e.xStatr = e.x
                    e.yStatr = e.y
                })
            break
            }
            activeElement = elements[i]
            draggableElement = [elements[i]]
            elements[i].xStatr = elements[i].x
            elements[i].yStatr = elements[i].y
            break
        }
    }

    if (switchTabCheckbox.checked)
        switchPanelTab()

    if (bumpElementCheckbox.checked)
        bumpPanelElement()

    setSelectedPanelItem()

    if (!activeElement && selectedPanelItem) setSelectedPanelItem(null)

    renderAll()
}

function xPixelsToCoords(xPx) { return Math.round(xPx / getXPixelRatio) }
function yPixelsToCoords(yPx) { return Math.round(yPx / getYPixelRatio) }

const dragElement = e => {

    const xActualDrug = e.clientX - canvas.offsetTop;
    const yActualDrug = e.clientY - canvas.offsetLeft;

    if (draggableElement) {
        draggableElement.forEach(element => {
            let newX = xPixelsToCoords(xActualDrug - xStartFoDrug)
            let newY = yPixelsToCoords(yActualDrug - yStartFoDrug)

            const xMax = canvasWidthInSquares - element.w
            const YMax = canvasHeightInSquares - element.h
            const xMin = 0
            const YMin = 0

            element.x = Math.min(element.xStatr + newX, xMax)
            element.y = Math.min(element.yStatr + newY, YMax)

            element.x = Math.max(element.x, xMin)
            element.y = Math.max(element.y, YMin)
        })
        renderAll()
    }

}

const dragElementOnKey = e => {
    let element = activeElement
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

const dropDraggableElement = () => {
    if (draggableElement) {
        delete draggableElement.xStatr
        delete draggableElement.yStatr
        draggableElement = null
    }
}

canvas.addEventListener('mousedown', takeDraggableElement)

canvas.addEventListener('mousemove', dragElement)

document.addEventListener('keydown', dragElementOnKey)

document.addEventListener('mouseup', dropDraggableElement)
/* END OF LISTENERS */