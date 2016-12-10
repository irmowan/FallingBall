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
    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        ball.draw(context);
    }

    drawFrame();
};

