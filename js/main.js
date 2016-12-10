/**
 * Created by irmo on 16/12/10.
 */

window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext('2d'),
        ball = new Ball(20);
    ball.x = 100;
    ball.y = 50;
    ball.draw(context);
    var lines = [];
    lines[0] = new Line(100, 100, 200, 90);

    function drawLine(line) {
        line.draw(context);
    }

    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach(drawLine);
        ball.draw(context);
    }

    drawFrame();
};

