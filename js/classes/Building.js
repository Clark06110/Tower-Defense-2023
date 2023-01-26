class Building {
    constructor({ position = { x: 0, y: 0} }) {
        this.position = position
        this.width = 16
        this.height = 16
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
        this.projectiles = [
            new Projectile({
                position: {
                    x: this.center.x,
                    y: this.center.y
                }
            })
        ]
    }

    draw() {
        canvasContext.fillStyle = 'blue'
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}