function init() {
  //------------------------- DOM elements -----------------------//
  // All tracks
  const introTrack = document.querySelector('#intro-track')
  const emperorLaugh = document.querySelector('#emperor-laugh')
  const emperorGood = document.querySelector('#emperor-good')
  const laserSound = document.querySelector('#laser-sound')
  const explosionSound = document.querySelector('#explosion-sound')
  const chewySound = document.querySelector('#chewy-sound')
  const gameOverSound = document.querySelector('#gameOver-sound')
  const victorySound = document.querySelector('#victory-sound')

  //--------------------------------------------------------------
  const docBody = document.querySelector('body')
  const intro = document.querySelector('#intro')
  const orignalOption = document.querySelector('#original-btn')
  const gameTimer = document.querySelector('#timer-text')
  const grid = document.querySelector('.grid')
  const gameOver = document.querySelector('.game-over')
  const scoreBoard = document.querySelector('.inGame-info')
  const score = document.querySelector('#score-display')
  const timeLeft = document.querySelector('#time-display')
  const liveShip1 = document.querySelector('#live-1')
  const liveShip2 = document.querySelector('#live-2')
  const liveShip3 = document.querySelector('#live-3')
  const restartOption = document.querySelector('.level')
  const restartWinBtn = document.querySelector('#restart-win')
  const winText = document.querySelector('#congrats')
  const win = document.querySelector('.win')
  console.log(win)
  
  //----------------------- Game Variables ---------------------//
  // Grid
  const width = 18
  const gridCount = width * width
  const cells = []
  //------------------------------
  // Player & enemy grid set up
  // Selecting enemies index pos. in grid arr
  let enemiesPositionIndex = [
    5, 6, 7, 8, 9, 10, 11, 12,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 65, 66, 130,
    39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 67,
    56, 57, 58, 59, 60, 61, 62, 77, 78, 79, 63, 64, 68,
    82, 83, 84, 85, 76, 75, 80, 81, 69, 86, 74, 87, 92,
    92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
    105, 93, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138,
    139, 149, 150, 151, 152, 153, 154, 155, 156
  ]
  // Momevement arr pattern
  const EnemyDirectionsPattern = [
    -1, -1, 
    width, 
    1, 1, 1, 1,
    width,
    -1, -1
  ]
  let movementCount = 0
  let playerPosition = 314
  let timerCount = 5
  let scoreCount = 0
  let inGametimer = 95
  let livesCount = 3
  let enemyShotLoop
  let enemiesActions
  let inGameCountDown
  //-------------------------- Functions ------------------------//
  // inGame Sounds 
  function playSound() {
    introTrack.play()
  }
  //---------------------------------------------------------
  // gameStart timer
  function gameStartTimer() {
    gameTimer.classList.remove('hidden')
    // interval to set timer conditions
    gameTimer.innerHTML = timerCount
    const countDown = setInterval(() => {
      timerCount--
      gameTimer.innerHTML = timerCount
      if (timerCount <= 0) {
        clearInterval(countDown)
        gameTimer.classList.add('hidden')
        // console.log('Game should start')
      }
    }, 1000)
  }

  //----------------------------------------------------------
  // gameGrid creation & player position
  // Create div in HTML & Push|Assign to empty arr
  function gameGrid(startingPosition) {
    for (let i = 0; i < gridCount; i++) {
      const cell = document.createElement('div')
      // cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
      console.log(cells)
    }
    cells[startingPosition].classList.add('playerShip')
  }
  gameGrid(playerPosition)
  
  // enemyGrid position
  /* 
  1. forEach to iterate though enemy arr
  2. Add CSS & Enemy pic
  */
  function enemyGridPosition() {
    enemiesPositionIndex.forEach(enemy => {
      cells[enemy].classList.add('enemyShip')
      // console.log(enemy)
    })
  }
  enemyGridPosition()

  //-----------------------------------------------------------
  // Initialise enemyMovements
  function enemyMoveActions() {
    clearInterval(enemiesActions)
    // Interval to init the movement
    enemiesActions = setInterval(() => {
      // Iterate each enemy to remove them from grid
      enemiesPositionIndex.forEach(enemy => {
        cells[enemy].classList.remove('enemyShip')
      })
      // map method to implement movement pattern
      enemiesPositionIndex = enemiesPositionIndex.map(enemy => {
        return enemy + EnemyDirectionsPattern[movementCount]
      })
      // Iterate each enemy to add them back in new position
      enemiesPositionIndex.forEach(enemy => {
        cells[enemy].classList.add('enemyShip')
      })
      movementCount++

      // if all movement pattern steps have been done | reset
      if (movementCount === EnemyDirectionsPattern.length) {
        movementCount = 0
      }

      if (livesCount === 0) {
        gameOverInit()
        clearInterval(enemiesActions)
      }

      // If any collide = gameOver
      enemiesPositionIndex.some(enemy => {
        if (cells[enemy].classList.contains('playerShip')) {
          chewySound.play()
          cells[playerPosition].classList.remove('playerShip')
          cells[enemy].classList.remove('enemyShip')
          clearInterval(enemiesActions)
          cells[playerPosition].classList.add('explosion')
          setTimeout(() => {
            cells[playerPosition].classList.remove('explosion')
            // console.log('enemy should disappear')
            // console.log('Game Should end')
          }, 200)
          clearInterval(enemiesActions)
          gameOverInit()
        }
      })
      // If any reach the surface = gameOver
      enemiesPositionIndex.some(enemy => {
        if (enemy >= 306 && enemy <= 323) {
          clearInterval(enemiesActions)
          setTimeout(() => {
            gameOverInit()
            // console.log('enemy should disappear')
            // console.log('Game Should end')
          }, 200)
        }
      })
    }, 900)
  }

  //----------------------------------------------------------
  // spaceShip Player movement
  function playerMovement(e) {
    cells[playerPosition].classList.remove('playerShip')
    // Define x & y axis limit + conditions
    const x = playerPosition % width
    const y = ~~(playerPosition / width)
    // console.log(e.keyCode)
    switch (e.keyCode) {
      case 68:
        if (x < width - 1) {
          playerPosition++
          console.log('Move right')
        }
        break
      case 65:
        if (x > 0) {
          playerPosition--
          console.log('Move Left')
        }
        break
      case 83:
        if (y < width - 1) {
          playerPosition += width
          console.log('Move Down')
        }
        break
      case 87:
        if (y > 13) {
          playerPosition -= width
          console.log('Move Up')
        }
        break
    }
    cells[playerPosition].classList.add('playerShip')
  }

  //-----------------------------------------------------------
  function playerLaser(e) {
    let laserIndex
    console.log(e.keyCode)
    if (e.keyCode === 32) {
      laserIndex = playerPosition
      console.log('Shooting')
      laserSound.play()
      e.preventDefault()
    }
    // if all enemies (arr) are shot = gameWon
    if (enemiesPositionIndex.length === 0) {
      gameWon()
      // console.log('The game should stop')
      // console.log('Function gameWon')
    }
    // Player laser = Similar logic than movement
    const laserMovement = setInterval(() => {
      if (laserIndex - width >= 0) {
        cells[laserIndex].classList.remove('playerLaser')
        laserIndex -= width
        cells[laserIndex].classList.add('playerLaser')
      } else {
        cells[laserIndex].classList.remove('playerLaser')
      }
      // Case of collision if laser contains|hit enemy div.
      if (cells[laserIndex].classList.contains('enemyShip')) {
        explosionSound.play()
        cells[laserIndex].classList.remove('enemyShip')
        clearInterval(laserMovement)
        cells[laserIndex].classList.remove('playerLaser')
        scoreCount += 1000
        score.innerHTML = scoreCount.toLocaleString('en')
        const updatedArr = enemiesPositionIndex.indexOf(laserIndex)
        // update arr w/. splice method to remove enemy
        enemiesPositionIndex.splice(updatedArr, 1)
        cells[laserIndex].classList.remove('enemyShip')
      }
    }, 200)
  }

  //-----------------------------------------------------------
  function enemyLaser() {

    const randomLaser = []
    // Loop to assign a num of random lasers per enemy
    for (let i = 0; i < 12; i++) {
      randomLaser.push(enemiesPositionIndex[~~(Math.random() * enemiesPositionIndex.length)])
    }
    // console.log('random shot', randomLaser)
    // Initiate laser movements & conditions
    randomLaser.forEach(enemyLaser => {
      const laserMovement = setInterval(() => {
        // Similar logic than player actions
        if (enemyLaser + width <= 324) {
          cells[enemyLaser].classList.remove('enemyLaser')
          enemyLaser += width
          cells[enemyLaser].classList.add('enemyLaser')
        } else {
          cells[enemyLaser].classList.remove('enemyLaser')
          clearInterval(laserMovement)
        }
        // Case of hits player vs enemy lasers
        if (cells[enemyLaser].classList.contains('playerShip')) {
          chewySound.play()
          clearInterval(laserMovement)
          cells[enemyLaser].classList.remove('enemyLaser')
          cells[playerPosition].classList.add('explosion')
          // timeOut to impletement explosion picture
          setTimeout(() => {
            cells[playerPosition].classList.remove('explosion')
          }, 200)
          livesCount--
          lostSoul()
          // console.log(livesCount)
          if (livesCount === 0) {
            gameOverInit()
            clearInterval(laserMovement)
          }
        }
      }, 350)
    })
  }

  // Remove playerShip livesImg when hit
  function lostSoul() {
    if (livesCount === 2) {
      liveShip1.classList.add('hidden')
      console.log(liveShip1)
    } else if (livesCount === 1) {
      liveShip2.classList.add('hidden')
    } else if (livesCount === 0) {
      liveShip3.classList.add('hidden')
    }
  }

  //-----------------------------------------------------------
  // inGame Timer w/. condition
  function gameTimeLeft() {
    timeLeft.innerHTML = inGametimer
    inGameCountDown = setInterval(() => {
      inGametimer--
      timeLeft.innerHTML = inGametimer
      if (inGametimer === 0) {
        clearInterval(inGameCountDown)
        // console.log('Game should end')
        gameOverInit()
      }
    }, 1000)
  }
  // GameOver
  function gameOverInit() {
    clearInterval(enemyShotLoop)
    clearInterval(enemiesActions)
    clearInterval(inGameCountDown)
    
    enemiesPositionIndex.forEach(enemy => {
      cells[enemy].classList.remove('enemyShip')
    })
  
    gameOver.classList.remove('hidden')
    restartOption.classList.remove('hidden')
    gameOverSound.play()
  }
  // Game Won
  function gameWon() {
    clearInterval(enemyShotLoop)
    clearInterval(enemiesActions)
    clearInterval(inGameCountDown)

    introTrack.pause()
    victorySound.play()
    win.classList.remove('hidden')
    restartWinBtn.classList.remove('hidden')
    winText.classList.remove('hidden')
  }
  //-----------------------------------------------------------
  // Game exe function = Start & Replay
  function gameStart() {
    liveShip1.classList.remove('hidden')
    liveShip2.classList.remove('hidden')
    liveShip3.classList.remove('hidden')
    intro.remove()
    emperorLaugh.play()
    gameStartTimer()
    gameTimeLeft()

    scoreBoard.classList.remove('hidden')
    enemyShotLoop = setInterval(() => {
      enemyLaser()
      enemyMoveActions()
    }, 6000)
  }

  function restart() {
    emperorGood.play()
    gameOver.classList.add('hidden')
    winText.classList.add('hidden')
    win.classList.add('hidden')
    restartWinBtn.classList.add('hidden')
    restartOption.classList.add('hidden')
    liveShip1.classList.remove('hidden')
    liveShip2.classList.remove('hidden')
    liveShip3.classList.remove('hidden')

    timerCount = 5
    inGametimer = 95
    scoreCount = 0
    livesCount = 3
    movementCount = 0
    enemiesPositionIndex = [
      5, 6, 7, 8, 9, 10, 11, 12,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 65, 66, 130,
      39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 67,
      56, 57, 58, 59, 60, 61, 62, 77, 78, 79, 63, 64, 68,
      82, 83, 84, 85, 76, 75, 80, 81, 69, 86, 74, 87, 92,
      92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104,
      105, 93, 111, 112, 113, 114, 115, 116, 117, 118, 119,
      120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138,
      139, 149, 150, 151, 152, 153, 154, 155, 156
    ]
    gameStartTimer()
    gameTimeLeft()
    gameGrid(playerPosition)
    enemyGridPosition()
    enemyShotLoop = setInterval(() => {
      enemyLaser()
      enemyMoveActions()
    }, 6000)
  }

  //----------------------- Event Listener ----------------------//

  docBody.addEventListener('click', playSound)
  orignalOption.addEventListener('click', gameStart)
  restartOption.addEventListener('click', restart)
  restartWinBtn.addEventListener('click', restart)
  document.addEventListener('keydown', playerMovement)
  document.addEventListener('keydown', playerLaser)

}
window.addEventListener('DOMContentLoaded', init)