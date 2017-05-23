function Sprite(x, y, w, h, path) {
    "use strict";
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    var img = new Image();
    img.src = path;
    this.drawImg = function () {
      ctx.drawImage(
        img,
        0,0,
        this.w, -this.h,
        this.x, this.y,
        this.w, -this.h);
    };
    this.moveObject = function () {
      this.x -= 5;
    };
    this.crashed = function (obst) {
      var spriteLeft = this.x;
      var spriteRight = this.x + this.w;
      var spriteTop = this.y + this.h;
      var spriteBottom = this.y;
      var obstLeft = obst.x;
      var obstRight = obst.x + obst.w;
      var obstTop = obst.y + obst.h;
      var obstBottom = obst.y;
      var crash = false;
      if ((spriteRight < obstLeft) || (spriteBottom < obstTop) || (spriteLeft > obstRight) || (spriteTop + 35 > obstBottom)) {
        crash = true;
      }
      return crash;
    };
}