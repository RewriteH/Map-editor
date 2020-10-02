class Area {
    constructor(){}

    areaChange = e => {
        const area = getSelectedArea()
        area[e.name] = +e.value
        loadWalls()
    }
    
}