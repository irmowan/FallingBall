/**
 * Created by irmo on 16/12/10.
 */

window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext('2d'),
        ball = new Ball(100, 50, 20);
    var gravity = 0.2,
        bounce = -0.5;
    var lines = [];
    lines[0] = new Line(0, 100, 200, 20);
    lines[1] = new Line(600, 200, 200, 160);
    lines[2] = new Line(100, 300, 250, 10);
    lines[3] = new Line(700, 400, 300, 170);
    lines[4] = new Line(120, 500, 300, 5);

    function drawLine(line) {
        line.draw(context);
    }

    function drawBall(ball) {
        ball.draw(context);
    }

    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        if (ball.x + ball.radius > canvas.width) {
            ball.x = canvas.width - ball.radius;
            ball.vx *= bounce;
        }
        else if (ball.x - ball.radius < 0) {
            ball.x = ball.radius;
            ball.vx *= bounce;
        }
        if (ball.y + ball.radius > canvas.height) {
            ball.y = canvas.height - ball.radius;
            ball.vy *= bounce;
        } else if (ball.y - ball.radius < 0) {
            ball.y = ball.radius;
            ball.vy *= bounce;
        }
        lines.forEach(drawLine);
        drawBall(ball);
    }

    drawFrame();
};

