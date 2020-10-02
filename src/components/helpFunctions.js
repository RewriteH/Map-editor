export const squaresToCoords = (coords, axis) => {
    if (axis === 'X') {
        let square = Math.round(coords / getXPixelRatio)
        return square
    }
    if (axis === 'Y') {
        let square = Math.round(coords / getYPixelRatio)
        return square
    }

}

export const conditionColor = element => {
    if (element.x + element.w > canvasWidthInSquares / 2) {
        element.color = 'rgba(65, 212, 225, 0.3)'
    }
    if (element.y + element.h > canvasHeightInSquares / 2) {
        element.color = 'rgba(225, 79, 65, 0.3)'
    }
}