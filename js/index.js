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

//Coucou les filles
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
// test jaineko

const buildings = []
let activeTile = undefined


function animate() {
    requestAnimationFrame(animate)

    canvasContext.drawImage(mapImage, 0, 0)
    enemiesWave1.forEach(enemy => {
        enemy.update()
    })

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })

    buildings.forEach(building => {
        building.update()
        building.target = null
        const validEnemies = enemiesWave1.filter((enemy) => {
            const xDifference = enemy.position.x + enemy.width/2 - building.position.x - building.width/2
            const yDifference = enemy.position.y + enemy.height/2 - building.position.y - building.height/2
            const distance = Math.hypot(xDifference, yDifference)
            return distance < enemy.radius/2 + building.radius
        })
        // console.log("ennemies", validEnemies)
        building.target = validEnemies[0]
    
        for (let i = building.projectiles.length - 1; i >= 0; i--) {
            const projectile = building.projectiles[i]
        
            projectile.update()
        
            const xDifference = projectile.enemy.position.x + projectile.enemy.width/2 - projectile.position.x
            const yDifference = projectile.enemy.position.y + projectile.enemy.height/2 - projectile.position.y
            const distance = Math.hypot(xDifference, yDifference)

            // When projectile hit
            if (distance < projectile.enemy.radius) {
                projectile.enemy.health -= 5

                // kill enemy
                if (projectile.enemy.health <= 0) {
                    const enemyIndex = enemiesWave1.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    console.log("enemyIndex", enemyIndex)
                    enemiesWave1.splice(enemyIndex, 1)
                }
                building.projectiles.splice(i, 1)
            }
        }

        //console.log(distance)
        //console.log(xDifference)
        //console.log(yDifference)
    })

    
}
// test

const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click', (event) => {
    if (activeTile && !activeTile.isOccupied /*&& coins - 50 >= 0*/) {
        //coins -= 50
        //document.querySelector('#coins').innerHTML = coins
        buildings.push(
        new Building({
            position: {
            x: activeTile.position.x,
            y: activeTile.position.y
            }
        })
        )
        activeTile.isOccupied = true
        /*
        buildings.sort((a, b) => {
        return a.position.y - b.position.y
        })
        */
       console.log("building")
    }
})

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
