// tutorial from MDN: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// constructor to create new balls

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// method to draw a ball on the canvas

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.fill();
}

// method to make the ball move

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = - (this.velX);
  }
  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }
  if ((this.y + this.size) >= height) {
    this.velY = - (this.velY);
  }
  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }
  this.x += this.velX;
  this.y += this.velY;
}

// method to detect when two balls collide and to change those balls color on collision

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx + dy*dy);

      if (distance < this.size + balls[j].size) {
        //balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

        // make the balls bounce on collision - it's weird, it's suggested to use a library
        this.velX = - (this.velX);
        this.velY = - (this.velY);
        balls[j].velX = - (balls[j].velX);
        balls[j].velY = - (balls[j].velY);
      }
    }
  }
}

// array to store the ball objects

var balls = [];

// animate using a function that calls itself and uses requestAnimationFrame(function)

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // less opacity -> more tail
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    // fill the balls array
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-6, 6),
      random(-6, 6),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }

  // draw, move and detect collision for every ball
  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
