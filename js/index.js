const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 480
canvas.height = 320

canvasContext.fillStyle = 'white'
canvasContext.fillRect(0, 0, canvas.width, canvas.height)

const mapImage = new Image()
mapImage.onload = () => {
    animate()
}
mapImage.src = 'assets/maps/map1.png'

class Enemy {

    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.width = 20
        this.height = 20
        this.waypointIndex = 0
        this.velocity = {
            x: 0,
            y: 0
        }
        /*
        this.center = {
            x: this.position.x + (this.width / 2),
            y: this.position.y + (this.height / 2)
        }
        */
    }

    draw() {
        canvasContext.fillStyle = 'red'
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        var centerX = this.position.x + this.width/2
        var centerY = this.position.y + this.height/2
        var waypoint = waypointsMap1[this.waypointIndex]
        var yDistance = waypoint.y - centerY
        var xDistance = waypoint.x - centerX

        if ( yDistance < 0 ) {
            this.velocity.y = -1
        }
        if ( yDistance > 0 ) {
            this.velocity.y = 1
        }
        if ( xDistance < 0 ) {
            this.velocity.x = -1
        }
        if ( xDistance > 0 ) {
            this.velocity.x = 1
        }


        // const speed = 1
        // this.velocity.x = Math.cos(angle) * speed
        // this.velocity.y = Math.sin(angle) * speed

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // var a = Math.abs(this.center.x - waypoint.x)
        // var b = Math.abs(this.center.y - waypoint.y)

        console.log()
        console.log("waypoint -> ", waypoint)
        console.log("yDistance -> ", yDistance)
        console.log("xDistance -> ", xDistance)
        console.log("this.position -> ", this.position)
        console.log("this.velocity -> ", this.velocity)
        console.log()

        if ( Math.abs(centerX - waypoint.x) < 5 && Math.abs(centerY - waypoint.y) < 5 && this.waypointIndex < waypointsMap1.length-1) {
            this.waypointIndex++
        }
        
        console.log("INDEX", this.waypointIndex) 

    }
}

const enemy1 = new Enemy({ position: { x: 50, y: 46 }})
const enemy2 = new Enemy({ position: { x: 0, y: 46 }})

function animate() {
    requestAnimationFrame(animate)

    canvasContext.drawImage(mapImage, 0, 0)
    enemy1.update()
    enemy2.update()
}



console.log("canvas", canvasContext)