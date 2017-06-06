function Score (x, y) {
  'use strict'
  this.x = x
  this.y = y
  this.drawScore = function () {
    ctx.font = 'bold 14px sans-serif'
    ctx.fillStyle = 'black'
    ctx.fillText('SCORE: ' + score, x, y)
  }
  this.updateScore = function () {
    for (var i = 0; i < gameObstacles.length; i += 1) {
      var d = player.posX - Math.floor(gameObstacles[i].x + gameObstacles[i].scaledW)
      if (d > 0 && d < 4) {
        score += 1
      }
    }
  }
  this.resetScore = function () {
    score = 0
  }
}
