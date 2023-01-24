class PlacementTile {
    constructor({ position = {x: 0, y: 0} }) {
        this.position = position
        this.width = 16
        this.height = 16
        this.color = 'rgba(255, 255, 255, 0.15)'
        this.occupied = false
    }

    draw() {
        canvasContext.fillStyle = this.color
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(mouse) {
        this.draw()
    
        if (
          mouse.x > this.position.x &&
          mouse.x < this.position.x + this.width &&
          mouse.y > this.position.y &&
          mouse.y < this.position.y + this.height
        ) {
          this.color = 'white'
        } else {
          console.log("colliding")
          this.color = 'rgba(255, 255, 255, 0.15)'
        }
      }
}