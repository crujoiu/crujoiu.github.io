function Obstacle(path, x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    var image = new Image();
    image.src = path;
    this.drawObstacle = function () {
        ctx.drawImage(image, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
    };
    this.moveObstacle = function () {
        this.x -= 5;
    };
}