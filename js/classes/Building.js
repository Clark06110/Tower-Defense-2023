class Building {
    constructor({ position = { x: 0, y: 0} }) {
        this.position = position
        this.width = 16
        this.height = 16
        this.radius = 100
        this.target
        this.frames = 0
        this.center = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
        this.projectiles = []
    }

    draw() {
        canvasContext.fillStyle = 'blue'
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)

        canvasContext.fillStyle = 'rgba(0, 255, 0, 0.2)'
        canvasContext.beginPath()
        canvasContext.arc(this.position.x+(this.width/2), this.position.y+(this.height/2), this.radius, 0, Math.PI*2)
        canvasContext.fill()
    }

    update() {
        this.frames++
        this.draw()
        if (this.frames % 10 === 0 && this.target) {
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.center.x,
                        y: this.center.y
                    }, 
                    enemy: this.target
                })
            )
        }
    }
}