/**
 * Created by irmo on 16/12/10.
 */

window.onload = function () {
    var canvas = document.getElementById("canvas"),
        context = canvas.getContext('2d'),
        ball = new Ball(100, 0, 20);
    var gravity = 0.2,
        bounce = -0.6;
    var lines = [];
    lines[0] = new Line(100, 100, 250, 8);
    lines[1] = new Line(400, 200, 250, -10);
    lines[2] = new Line(100, 220, 250, 12);
    lines[3] = new Line(400, 350, 300, -20);
    lines[4] = new Line(120, 500, 300, 6);
    lines[5] = new Line(500, 650, 250, -4);

    function drawLine(line) {
        checkLine(line);
        line.draw(context);
    }

    function drawBall(ball) {
        ball.draw(context);
    }

    function checkLine(line) {
        var bounds = line.getBounds();
        if (ball.x + ball.radius > bounds.x && ball.x - ball.radius < bounds.x + bounds.width
            && ball.y + ball.radius > bounds.y && ball.y - ball.radius < bounds.y + bounds.height) {
            var sin = Math.sin(line.rotation),
                cos = Math.cos(line.rotation),
                x1 = ball.x - line.x1,
                y1 = ball.y - line.y1,
                y_r = cos * y1 - sin * x1,
                vy_r = cos * ball.vy - sin * ball.vx;
            console.log(y_r);
            if (y_r > -ball.radius && y_r < vy_r) {
                console.log('Change');
                var x2 = cos * x1 + sin * y1,
                    vx_r = cos * ball.vx + sin * ball.vy;
                y_r = -ball.radius;
                vy_r *= bounce;
                x1 = cos * x2 - sin * y_r;
                y1 = cos * y_r + sin * x2;
                ball.vx = cos * vx_r - sin * vy_r;
                ball.vy = cos * vy_r + sin * vx_r;
                ball.x = line.x1 + x1;
                ball.y = line.y1 + y1;
            }
        }
    }

    function checkBorder() {
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
    }

    function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball.vy += gravity;
        ball.x += ball.vx;
        ball.y += ball.vy;

        checkBorder();
        lines.forEach(drawLine);
        drawBall(ball);
    }

    drawFrame();
};

