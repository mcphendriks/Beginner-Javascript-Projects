const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let tx = window.innerWidth;
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

let mouse = { x: 0, y: 0 };
addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

const GRAVITY = 0.99;

function randomColor() {
  return `rgba(${Math.round(Math.random() * 250)}, ${Math.round(
    Math.random() * 250
  )}, ${Math.round(Math.random() * 250)}, ${
    Math.ceil(Math.random() * 10) / 10
  })`;
}

class Ball {
  constructor() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() / 5;
  }

  update() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let balls = [];
const maxBalls = 50;

function animate() {
  if (tx !== window.innerWidth || ty !== window.innerHeight) {
    tx = window.innerWidth;
    ty = window.innerHeight;
    canvas.width = tx;
    canvas.height = ty;
  }

  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, tx, ty);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    ball.update();
    ball.y += ball.dy;
    ball.x += ball.dx;

    if (ball.y + ball.radius >= ty) {
      ball.dy = -ball.dy * GRAVITY;
    } else {
      ball.dy += ball.vel;
    }

    if (ball.x + ball.radius > tx || ball.x - ball.radius < 0) {
      ball.dx = -ball.dx;
    }

    if (
      mouse.x > ball.x - 20 &&
      mouse.x < ball.x + 20 &&
      mouse.y > ball.y - 50 &&
      mouse.y < ball.y + 50 &&
      ball.radius < 70
    ) {
      ball.radius += 5;
    } else if (ball.radius > ball.startradius) {
      ball.radius -= 5;
    }
  }
}

animate();

setInterval(function () {
  if (balls.length >= maxBalls) {
    balls.shift();
  }
  balls.push(new Ball());
}, 400);
