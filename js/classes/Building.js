class Building {
    constructor({ position = { x: 0, y: 0} }) {
        this.position = position
    }

    draw() {
        canvasContext.fillStyle = 'blue'
        canvasContext.fillRect(this.position.x, this.position.y, 16, 16)
    }
}