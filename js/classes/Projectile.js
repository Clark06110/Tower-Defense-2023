class Projectile {
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
    }

    draw() {
        canvasContext.beginPath()
        canvasContext.arc(this.position.x, this.position.y, 4, 0, 2*Math.PI)
        canvasContext.fillStyle = 'orange'
        canvasContext.fill()
    }

    update() {
        this.draw()

        const angle = Math.atan2(
            enemiesWave1[0].position.y + (enemiesWave1[0].height/2) - this.position.y,
            enemiesWave1[0].position.x + (enemiesWave1[0].width/2)  - this.position.x,
        )

        this.velocity.x = Math.cos(angle)
        this.velocity.y = Math.sin(angle)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}