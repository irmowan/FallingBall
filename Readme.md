## Falling Ball

JavaScript小动画

GitHub: [Falling Ball](https://github.com/irmowan/FallingBall)

Demo: [Falling Ball](http://irmo.me/FallingBall/)

#### Introduction

这是利用JavaScript写的一段小动画，模拟了一个自由下落的小球，在遇到几处倾斜木板后的碰撞、滚动行为。

#### Installation & Usage

Clone源代码，直接在Chrome浏览器执行即可。

打开网页即自动执行，刷新网页重新执行。

#### File Description

```
├── LICENSE
├── Readme.md
├── index.html
├── css
│   └── style.css
└── js
    ├── ball.js
    ├── line.js
    └── main.js

2 directories, 7 files
```

其中，`css`文件夹下是基本样式，`js`文件夹下是核心代码。

- `ball.js`定义了一个球，构造函数有三个参数，(x, y, r)以确定球的位置和大小。同时定义了绘图函数以绘制小球，定义了GetBounds函数以获得小球的矩形闭包以供判断边界使用。
- `line.js`定义了一条线，构造函数有四个参数，四个参数有很多选取办法，例如(x1, y1, x2, y2)确定一条线，这里选取了(x, y, length, rotation)作为构造参数，利用三角函数计算这条线的其余参数。类似`ball.js`，还定义了线条的绘制，以及线条的矩形闭包获得。


- `main.js`是主文件，主要承担构造场景、建立物理引擎，以及模拟真实小球下落动画的操作。

#### Algorithm

算法部分主要在`main.js` 文件中。

物理参数主要有两项，一项是`gravity`，[重力加速度](https://zh.wikipedia.org/wiki/%E9%87%8D%E5%8A%9B%E5%8A%A0%E9%80%9F%E5%BA%A6)，用于自由下落时的速度增加，另一项是`bounce`，表示非弹性碰撞的[恢复系数](https://zh.wikipedia.org/wiki/%E6%81%A2%E5%A4%8D%E7%B3%BB%E6%95%B0)，衡量在碰撞后小球的动量损失。

页面有固定的刷新频率，在每次刷新后，小球会进行一定的移动，由于有重力这一个恒力存在，默认的移动是自由落体。

```javascript
ball.vy += gravity;
ball.x += ball.vx;
ball.y += ball.vy;
```
在每次移动后，需要检查小球的位置，包括两方面：是否触碰到了边界、是否触碰到了木板。此时会用到小球和木板的矩形闭包来检查。

对于触碰到边界的检查比较容易，直接依据小球的边界和画布坐标的判断，如果小球越过了某条边界，则镜像其位置（事实上由于恢复系数的存在，镜像位置并不太准确，但是帧长很短，速率变化导致的误差可以忽略），并将小球的速度乘以恢复系数（恢复系数是负数，自动将速度向量反向）。

```javascript
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
```

而对于同木板的检查，则由于木板的倾斜性，需要变换坐标系。首先可以对小球和木板的矩形闭包进行一遍初筛，如果矩形闭包都不重叠，则一定不会相撞。

如果闭包重叠，则需要进一步计算距离。此时变换参考坐标系。以木板一端为原点，以木板平面为x轴建立参考系，变换相应的距离和速度，这样可以检测小球是否已经碰触到了木板，当新坐标系下的小球下缘的纵坐标为负时，则可知小球触碰到了木板，此时处理碰撞行为，计算小球新的位置和速度，并进行坐标系的逆变换以对应到原先的xy坐标系。

```javascript
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
    if (y_r > -ball.radius && y_r < vy_r) {
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
```

这便是整个物理引擎的大致架构，包括了加速度、碰撞、坐标系变换等内容。

#### License

MIT License

------

Author: [irmo](https://github.com/irmowan)

Date: 2016.12