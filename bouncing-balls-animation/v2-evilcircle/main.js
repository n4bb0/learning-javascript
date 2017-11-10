// tutorial from MDN: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice

// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// ball counter
var para = document.querySelector('p');
var count = 0;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// generic shape constructor

function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// ball constructor

function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

// make Ball.prototype inherit from Shape.prototype

Ball.prototype = Object.create(Shape.prototype);  // now Ball.prototype.constructor = Shape --> wrong
Ball.prototype.constructor = Ball; // --> correct

// Ball's methods

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
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';

        /*// make the balls bounce on collision - it doesn't work well, it's weird lol, it's suggested to use a library
        this.velX = - (this.velX);
        this.velY = - (this.velY);
        balls[j].velX = - (balls[j].velX)
        balls[j].velY = - (balls[j].velY)*/
      }
    }
  }
}

// evilCircle constructor

function EvilCircle(x, y, exists) {
  Shape.call(this, x, y, exists);
  this.color = 'white';
  this.size = 10;
  this.velX = 20;
  this.velY = 20;
}

// make EvilCircle.prototype inherit from Shape.prototype

EvilCircle.prototype = Object.create(Shape.prototype);  // now EvilCircle.prototype.constructor = Shape --> wrong
EvilCircle.prototype.constructor = Ball; // --> correct

// EvilCircle's methods

// draw the Evilcircle

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
  ctx.lineWidth = 3;
  ctx.stroke();
}

// cant't go out of bounds

EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= width) {
    this.x = this.x - this.size;
  }
  if ((this.x - this.size) <= 0) {
    this.x = this.x + this.size;
  }
  if ((this.y + this.size) >= height) {
    this.y = this.y - this.size;
  }
  if ((this.y - this.size) <= 0) {
    this.y = this.y + this.size;
  }
}

//  EvilCircle constrols - move with wasd

EvilCircle.prototype.setControls = function() {
  var _this = this;
  window.onkeydown = function(e) {
    if (e.keyCode === 65) {  // key a
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {  // key d
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {  // key w
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {  // key s
      _this.y += _this.velY;
    }
  }
}

//  detect collisions

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists === true) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx*dx + dy*dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
        count--;
        para.textContent = 'Ball count: ' + count;
        //balls[j].color = 'rgba(0,0,0,0)';

        /*// make the balls bounce on collision - it doesn't work well, it's weird lol, it's suggested to use a library
        this.velX = - (this.velX);
        this.velY = - (this.velY);
        balls[j].velX = - (balls[j].velX)
        balls[j].velY = - (balls[j].velY)*/
      }
    }
  }
}

// array to store the ball objects

var balls = [];

var evilCircle = new EvilCircle(random(0,width), random(0,height), true)
evilCircle.setControls();

// animate using a function that calls itself and uses requestAnimationFrame(function)

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; // less opacity -> more tail
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    // fill the balls array
    var ball = new Ball(
      random(0, width),
      random(0, height),
      random(-7, 7),
      random(-7, 7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
    count++;
    para.textContent = 'Ball count: ' + count;
  }

  // draw, move and detect collision for every ball

  for (var i = 0; i < balls.length; i++) {
    if(balls[i].exists === true) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilCircle.draw();
  evilCircle.checkBounds();
  evilCircle.collisionDetect();

  requestAnimationFrame(loop);
}

loop();
