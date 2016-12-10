/**
 * Created by irmo on 16/12/10.
 */

function Line(x, y, length, rotation) {
    this.x1 = x;
    this.y1 = y;
    this.rotation = rotation * Math.PI / 360;
    var cos = Math.cos(this.rotation),
        sin = Math.sin(this.rotation);
    this.x2 = this.x1 + cos * length;
    this.y2 = this.y1 + sin * length;
    this.lineWidth = 1;
}

Line.prototype.draw = function (context) {
    context.save();
    context.translate(this.x1, this.y1);
    context.rotate(this.rotation);
    context.lineWidth = this.lineWidth;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(this.x2 - this.x1, this.y2 - this.y1);
    context.closePath();
    context.stroke();
    context.restore();
};

Line.prototype.getBounds = function () {
    var cos = Math.cos(this.rotation),
        sin = Math.sin(this.rotation),
        x1r = cos * this.x1 + sin * this.y1,
        x2r = cos * this.x2 + sin * this.y2,
        y1r = cos * this.y1 + sin * this.x1,
        y2r = cos * this.y2 + sin * this.x2;
    return {
        x: Math.min(x1r, x2r),
        y: Math.min(y1r, y2r),
        width: Math.max(x1r, x2r) - Math.min(x1r, x2r),
        height: Math.max(y1r, y2r) - Math.min(y1r, y2r)
    }
};