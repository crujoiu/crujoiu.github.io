// Set canvas width and height
  var canvas = document.getElementById("canvas");
  this.ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 380;
  var interval = 0;
  var score = 0;
  var canJump = false;
  var running = true;
  var sprite = new Sprite(100, 304, 45, -56, "assets/player.png");
  var myscore = new Score(670, 35);
  var frame = 0;
  var gameObstacles = [];
  //https://opengameart.org/content/bevouliin-free-game-background-for-game-developers
  //https://opengameart.org/content/bevouliin-free-game-obstacle-spikes
  var obstacles = [
    new Sprite(815, 330, 15, -30, "assets/spikeone.png"),
    new Sprite(815, 323, 35, -37, "assets/spikesthree.png"),
    new Sprite(815, 336, 25, -24, "assets/spikesgroup.png"),
    new Sprite(815, 265, 30, -15, "assets/arrow.png")
  ];

  function clearCanvas() {
    "use strict";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function detectCollision() {
    for (i = 0; i < gameObstacles.length; i += 1) {
      if (!sprite.crashed(gameObstacles[i])) {
        stop();
      }
    }
  }

  function disableJump() {
    canJump = false;
  }

  function enableJump() {
    canJump = true;
  }

  function jump(e) {
    if (32 === e.keyCode && canJump) {
      e.preventDefault();
      //here add the code to jump
      disableJump();
      var jumpInt = setInterval(function () {
        sprite.y -= 10;
        if (sprite.y <= 200) {
          clearInterval(jumpInt);
          window.removeEventListener("keydown", jump, false);
          land(e);
          return;
        }
      }, 16);
    }
  }

  function land(e) {
    if (32 === e.keyCode) {
      //here add the code to land
      enableJump();
      var landInt = setInterval(function () {
        sprite.y += 10;
        if (sprite.y >= 304) {
          clearInterval(landInt);
          window.addEventListener("keydown", jump, false);
          window.removeEventListener("keyup", enableJump, false);
          return;
        }
      }, 16);
    }
  }

  function getRandomDist() {
    var min = 300;
    var max = 450;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function pushRandomObstacle() {
    var obstacleIndex = Math.floor(Math.random() * obstacles.length);
    //copy objects from obstacles to gameObstacles with jQuery
    var clonedObstacle = $.extend(false, {}, obstacles[obstacleIndex]);
    gameObstacles.push(clonedObstacle);
  }

  function removeFirstObstacle() {
    if (gameObstacles[0].x < -100) {
      gameObstacles.splice(0, 1);
    }
  }

  function manageGameObstaclesArray() {
    var dist = getRandomDist();
    if (gameObstacles[gameObstacles.length - 1].x < dist) {
      pushRandomObstacle();
    }
    removeFirstObstacle();
  }

  function updateObstacles() {
    for (var i = 0; i < gameObstacles.length; i += 1) {
      gameObstacles[i].drawImg();
      gameObstacles[i].moveObject();
    }
  }

  function stop() {
    running = false;
    if (interval) {
      window.cancelAnimationFrame(interval);
      interval = 0;
    }
    document.getElementById("cover").style.display = "block";
    document.getElementById("over").style.display = "block";
    document.getElementById("restart").style.display = "block";
    window.removeEventListener("keydown", jump, false);
    window.removeEventListener("keyup", disableJump, false);
    enableJump();
  }

  function updateFrame() {
    interval = window.requestAnimationFrame(updateFrame);
    if (running) {
      clearCanvas();
      frame += 1;
      myscore.drawScore();
      myscore.updateScore();
      sprite.drawImg();
      manageGameObstaclesArray();
      updateObstacles();
      if (frame > 0 && frame < 100) {
        document.getElementById("warning").style.display = "block";
      } else {
        document.getElementById("warning").style.display = "none";
      }
      detectCollision();
    }
  }

  function start() {
    running = true;
    pushRandomObstacle();
    window.addEventListener("keydown", jump, false);
    window.addEventListener("keyup", enableJump, false);
    document.getElementById("over").style.display = "none";
    canJump = true;
    updateFrame();
  }

  $("#restart").click(function () {
    "use strict";
    window.addEventListener("keydown", jump, false);
    clearCanvas();
    document.getElementById("cover").style.display = "none";
    gameObstacles = [];
    myscore.resetScore();
    canJump = true;
    $("#restart").hide();
    $("#start").hide();
    start();
  });

  $("#start").click(function () {
    $("#title").hide();
    $("#over").hide();
    $("#start").hide();
    $("#restart").hide();
    start();
  });