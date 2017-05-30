function Obstacle(path, x, y, w, h, scaleFactor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.scaleFactor = scaleFactor;
    this.scaledW = w / scaleFactor;
    this.scaledH = h / scaleFactor;
    this.newYPoz = y - this.scaledH; 
    var image = new Image();
    image.src = path;
    this.drawObstacle = function () {
        ctx.drawImage(image, 0, 0, this.w, this.h, this.x, this.newYPoz, this.scaledW, this.scaledH);
    };
    this.moveObstacle = function () {
        this.x -= 5;
    };
    this.drawGround = function () {
        ctx.drawImage(image, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    };
}