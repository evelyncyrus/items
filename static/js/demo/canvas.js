function Rect(ele) {
  //浏览器兼容
  if(ele.getContext) {
    var content = ele.getContext("2d");

    //路径
    content.fillStyle = 'lightblue';
    content.save();
    content.fillRect(30, 30, 100, 100); //正方形

    content.fillStyle = 'green';
    content.fillRect(150, 150, 80, 80); //正方形

    content.restore();
    content.fillRect(250, 250, 200, 200); //正方形

    content.clearRect(100, 100, 200, 200);
    content.strokeStyle = 'yellowgreen';
    content.lineWidth = '5';
    content.strokeRect(25, 25, 450, 450);
  }
}


function Triangle(ele) {

  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    //路径
    ctx.fillStyle = 'lightblue';
    ctx.beginPath();
    ctx.moveTo(450, 65);
    ctx.lineTo(400, 105);
    ctx.lineTo(400, 25);
    ctx.fill();
  }

}


function smile(ele) {

  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    //路径
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false); // Mouth (clockwise)
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Left eye
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Right eye
    ctx.stroke();
  }

}


function twoTri(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    // Filled triangle
    ctx.beginPath();
    ctx.moveTo(25, 25);
    ctx.lineTo(105, 25);
    ctx.lineTo(25, 105);
    ctx.fill();

    // Stroked triangle
    ctx.beginPath();
    ctx.moveTo(125, 125);
    ctx.lineTo(125, 45);
    ctx.lineTo(45, 125);
    ctx.closePath();
    ctx.stroke();
  }
}


function circle(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    for(var i = 0; i < 4; i++) {
      for(var j = 0; j < 3; j++) {
        ctx.beginPath();
        var x = 50 + j * 100; // x coordinate
        var y = 50 + i * 100; // y coordinate
        var radius = 40; // Arc radius
        var startAngle = 0; // Starting point on circle
        var endAngle = Math.PI + (Math.PI * j) / 2; // End point on circle
        var anticlockwise = i % 2 == 0 ? false : true; // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if(i > 1) {
          ctx.fill();
        } else {
          ctx.stroke();
        }
      }
    }
  }
}

function dialog(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(75, 25);
    ctx.quadraticCurveTo(25, 25, 25, 62.5);
    ctx.quadraticCurveTo(25, 100, 50, 100);
    ctx.quadraticCurveTo(50, 120, 30, 125);
    ctx.quadraticCurveTo(60, 120, 65, 100);
    ctx.quadraticCurveTo(125, 100, 125, 62.5);
    ctx.quadraticCurveTo(125, 25, 75, 25);
    ctx.stroke();

    // Quadratric curves example
    ctx.beginPath();
    ctx.moveTo(255, 25);
    ctx.lineTo(170, 25);
    ctx.quadraticCurveTo(155, 25, 155, 40);
    ctx.lineTo(155, 100);
    ctx.quadraticCurveTo(155, 115, 170, 115);
    ctx.lineTo(175, 115);
    ctx.quadraticCurveTo(175, 145, 155, 145);
    ctx.quadraticCurveTo(185, 145, 195, 115);
    ctx.lineTo(255, 115);
    ctx.quadraticCurveTo(270, 115, 270, 100);
    ctx.lineTo(270, 40);
    ctx.quadraticCurveTo(270, 25, 255, 25);
    ctx.stroke();
  }
}

function heartBroken(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    // Cubic curves example
    ctx.beginPath();
    ctx.moveTo(75, 40);
    ctx.bezierCurveTo(75, 37, 75, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.lineTo(80, 110);
    ctx.lineTo(70, 100);
    ctx.lineTo(80, 90);
    ctx.lineTo(70, 80);
    ctx.lineTo(80, 70);
    ctx.lineTo(70, 60);
    ctx.lineTo(80, 50);
    ctx.lineTo(75, 40);
    ctx.fill();

    //half heart
    ctx.beginPath();
    ctx.moveTo(80, 40);
    ctx.bezierCurveTo(80, 37, 80, 25, 105, 25);
    ctx.bezierCurveTo(135, 25, 135, 62.5, 135, 62.5);
    ctx.bezierCurveTo(135, 80, 115, 102, 80, 120);
    ctx.lineTo(85, 110);
    ctx.lineTo(75, 100);
    ctx.lineTo(85, 90);
    ctx.lineTo(75, 80);
    ctx.lineTo(85, 70);
    ctx.lineTo(75, 60);
    ctx.lineTo(85, 50);
    ctx.lineTo(80, 40);
    ctx.fill();
  }
}


function draw(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    roundedRect(ctx, 12, 12, 200, 170, 15);
    roundedRect(ctx, 19, 19, 200, 170, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);

    ctx.beginPath();
    ctx.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false);
    ctx.lineTo(31, 37);
    ctx.fill();

    for(var i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 35, 4, 4);
    }

    for(i = 0; i < 6; i++) {
      ctx.fillRect(115, 51 + i * 16, 4, 4);
    }

    for(i = 0; i < 8; i++) {
      ctx.fillRect(51 + i * 16, 99, 4, 4);
    }

    ctx.beginPath();
    ctx.moveTo(83, 116);
    ctx.lineTo(83, 102);
    ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
    ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
    ctx.lineTo(111, 116);
    ctx.lineTo(106.333, 111.333);
    ctx.lineTo(101.666, 116);
    ctx.lineTo(97, 111.333);
    ctx.lineTo(92.333, 116);
    ctx.lineTo(87.666, 111.333);
    ctx.lineTo(83, 116);
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(91, 96);
    ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
    ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
    ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
    ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
    ctx.moveTo(103, 96);
    ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
    ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
    ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
    ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
    ctx.fill();
  }
}


// A utility function to draw a rectangle with rounded corners.
function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.lineTo(x, y + height - radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.lineTo(x + width - radius, y + height);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.lineTo(x + width, y + radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.lineTo(x + radius, y);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}

// multicolor
function color(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');
    for(var i = 0; i < 6; i++) {
      for(var j = 0; j < 6; j++) {
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
          Math.floor(255 - 42.5 * j) + ',0)';
        ctx.fillRect(j * 50, i * 50, 50, 50);
      }
    }
  }
}

//animation
function animatLine(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');
    var offset = 0;

    function draw() {
      ctx.clearRect(0, 0, ele.width, ele.height);
      ctx.setLineDash([4, 2]);
      ctx.lineDashOffset = -offset;
      ctx.strokeRect(10, 10, 100, 100);
    }

    function march() {
      offset++;
      if(offset > 16) {
        offset = 0;
      }
      draw();
      setTimeout(march, 20);
    }
    march();
  }
}


//gradient
function gradient(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    // Create gradients
    var lingrad = ctx.createLinearGradient(0, 0, 0, 150);
    lingrad.addColorStop(0, 'lightblue');
    lingrad.addColorStop(0.5, 'white');

    var radgrad2 = ctx.createRadialGradient(100, 100, 20, 100, 100, 50);
    radgrad2.addColorStop(0, '#FFbbee');
    radgrad2.addColorStop(0.2, '#FF99ee');
    radgrad2.addColorStop(1, 'rgba(252,252,10,0)');

    // assign gradients to fill and stroke styles
    ctx.fillStyle = lingrad;

    // draw shapes
    ctx.fillRect(0, 0, 200, 200);
    ctx.fillStyle = radgrad2;
    ctx.fillRect(50, 50, 100, 100);
  }
}

// createPattern
function pattern(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    // create new image object to use as pattern
    var img = new Image();
    img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';

    // to make sure the image is loaded before it is assigned to the pattern
    img.onload = function() {

      // create pattern
      var ptrn = ctx.createPattern(img, 'repeat');
      ctx.fillStyle = ptrn;
      ctx.fillRect(10, 10, 300, 300);

    }
  }
}


//text shadow
function shadow(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');

    ctx.shadowOffsetY = 2;
    ctx.shadowOffsetX = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = 'rgba(0,0,0,.5)';

    ctx.font = '50px Microsoft Yahei';
    ctx.fillStyle = 'black';
    ctx.strokeText('嘻嘻哈哈哈', 30, 80);
    ctx.textBaseline = 'hanging'
  }
}

//fill
function fill(ele) {
  if(ele.getContext) {
    var ctx = ele.getContext('2d');
    ctx.beginPath();
    ctx.arc(50, 50, 30, 0, Math.PI * 2, true);
    ctx.arc(50, 50, 15, 0, Math.PI * 2, true);
    ctx.fill("evenodd");
  }
}

function paint() {

  // Loop through all images
  for(var i = 0; i < document.images.length; i++) {
    console.log(document.images.length)
      // Don't add a canvas for the frame image
    if(document.images[i].getAttribute('id') != 'frame') {

      // Create canvas element
      canvas = document.createElement('canvas');
      canvas.setAttribute('width', 132);
      canvas.setAttribute('height', 150);

      // Insert before the image
      document.images[i].parentNode.insertBefore(canvas, document.images[i]);

      ctx = canvas.getContext('2d');

      // ctx.mozImageSmoothingEnabled = false;
      // ctx.webkitImageSmoothingEnabled = false;
      // ctx.msImageSmoothingEnabled = false;
      // ctx.imageSmoothingEnabled = false;

      // Draw image to canvas
      ctx.drawImage(document.images[i], 15, 20);

      // Add frame
      ctx.drawImage(document.getElementById('frame'), 0, 0);

    }
  }
}



function animate() {
  var sun = new Image();
  var moon = new Image();
  var earth = new Image();

  function init() {
    sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
    moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
    earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
    window.requestAnimationFrame(draw);
  }

  function draw() {
    var ctx = document.getElementById('myCanvas').getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 300, 300); // clear canvas

    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.strokeStyle = 'rgba(0,153,255,0.4)';
    ctx.save();
    ctx.translate(150, 150);

    // Earth
    var time = new Date();
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.translate(105, 0);
    ctx.fillRect(0, -12, 50, 24); // Shadow
    ctx.drawImage(earth, -12, -12);

    // Moon
    ctx.save();
    ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
    ctx.translate(0, 28.5);
    ctx.drawImage(moon, -3.5, -3.5);
    ctx.restore();

    ctx.restore();

    ctx.beginPath();
    ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
    ctx.stroke();

    ctx.drawImage(sun, 0, 0, 300, 300);

    window.requestAnimationFrame(draw);
  }

  init();
}


function ball() {
  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var raf;

  var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 1,
    radius: 25,
    color: 'yellowgreen',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };

  function clear() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function draw() {
    clear();
    ball.draw();

    ball.x += ball.vx;
    ball.y += ball.vy;

    if(ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
    if(ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx;
    }

    raf = window.requestAnimationFrame(draw);
  }

  canvas.addEventListener('mouseover', function(e) {
    raf = window.requestAnimationFrame(draw);
  });

  canvas.addEventListener("mouseout", function(e) {
    window.cancelAnimationFrame(raf);
  });


  ball.draw();
}