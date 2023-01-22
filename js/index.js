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


const enemiesWave1 = []
for (let i = 0; i < 10; i++) {
    const xOffset = i * 100
    enemiesWave1.push(
        new Enemy({ position: { x: waypointsMap1[1].x - xOffset, y: waypointsMap1[1].y} })
    )
}

// const enemy1 = new Enemy({ position: { x: 50, y: 46 }})
// const enemy2 = new Enemy({ position: { x: 0, y: 46 }})

function animate() {
    requestAnimationFrame(animate)

    canvasContext.drawImage(mapImage, 0, 0)
    enemiesWave1.forEach(enemy => {
        enemy.update()
    })
}



console.log("canvas", canvasContext)