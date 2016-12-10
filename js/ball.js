/**
 * Created by irmo on 16/12/10.
 */

function Ball(x, y, radius, color) {
    if (radius == undefined) {
        radius = 50;
    }
    if (color == undefined) {
        color = "#ff0000";
    }
    this.x = 0;
    this.y = 0;
    this.radius = radius;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.color = utils.parseColor(color);
}

Ball.prototype.draw = function (context) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.fillStyle = this.color;

    context.beginPath();
    context.arc(0, 0, this.radius, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();
    context.restore();
};

Ball.prototype.getBounds = function () {
    return {
        x: this.x - this.radius,
        y: this.y - this.radius,
        width: this.radius * 2,
        height: this.radius * 2
    };
};