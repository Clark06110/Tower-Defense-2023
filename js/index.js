const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 480
canvas.height = 320

canvasContext.fillStyle = 'white'
canvasContext.fillRect(0, 0, canvas.width, canvas.height)

const placementTowerTilesDataMap1_2D = [] 
for (let i = 0; i < placementTowerTilesDataMap1.length; i += 30) {
    placementTowerTilesDataMap1_2D.push(placementTowerTilesDataMap1.slice(i, i+30))
} 

const placementTiles = []
placementTowerTilesDataMap1_2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 56) {
            placementTiles.push(new PlacementTile({
                position: {
                    x: x * 16,
                    y: y * 16
                }
            }))
        }
    })
})


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

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })
}

const mouse = {
    x: undefined,
    y: undefined
  }

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  
    activeTile = null
    for (let i = 0; i < placementTiles.length; i++) {
      const tile = placementTiles[i]
      if (
        mouse.x > tile.position.x &&
        mouse.x < tile.position.x + tile.width &&
        mouse.y > tile.position.y &&
        mouse.y < tile.position.y + tile.height
      ) {
        activeTile = tile
        break
      }
    }
})
