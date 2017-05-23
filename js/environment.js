function Background(path, x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    var image = new Image();
    image.src = path;
    this.drawBackground = function () {
        this.x -= this.speed;
        ctx.drawImage(image, this.x, this.y);
        // Draw another image
        ctx.drawImage(image, this.x + canvas.width, this.y);
        if (this.x > canvas.width)
            this.x += canvas.width;
    };
}