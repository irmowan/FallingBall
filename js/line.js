/**
 * Created by irmo on 16/12/10.
 */

function Line(x, y, length, rotation) {
    this.x1 = x;
    this.y1 = y;
    this.rotation = rotation * Math.PI / 180;
    var cos = Math.cos(this.rotation),
        sin = Math.sin(this.rotation);
    this.x2 = this.x1 + cos * length;
    this.y2 = this.y1 + sin * length;
    this.lineWidth = 1;
}

Line.prototype.draw = function (context) {
    context.save();
    context.translate(this.x1, this.y1);
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.x2 - this.x1, this.y2 - this.y1);
    context.closePath();
    context.stroke();
    context.restore();
};

Line.prototype.getBounds = function () {
    return {
        x: Math.min(this.x1, this.x2),
        y: Math.min(this.y1, this.y2),
        width: Math.max(this.x1, this.x2) - Math.min(this.x1, this.x2),
        height: Math.max(this.y1, this.y2) - Math.min(this.y1, this.y2)
    }
};