var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var clockRadius = canvas.height / 2;
var mode = "clock";
var currentHandPositions = [0,0,0];
ctx.translate(clockRadius, clockRadius);
clockRadius = clockRadius * 0.90;

// window.addEventListener('keydown', keyHandler, false);
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

// INTERACTIVE CODE

function resizeCanvas() {
  canvas.width = Math.min(window.innerWidth, window.innerHeight) - 100;
  canvas.height = Math.min(window.innerWidth, window.innerHeight) - 100;
  clockRadius = canvas.height / 2;
  ctx.translate(clockRadius, clockRadius);
  clockRadius = clockRadius * 0.90;
  window.requestAnimationFrame(drawClock);
}

function pauseButton() {
    if (mode != "paused") {
        mode = "paused";
        window.requestAnimationFrame(drawClock);
    }
    else {
      mode = "clock";
      window.requestAnimationFrame(drawClock);
    }
}

function zeroButton() {
    if (mode != "zeroed") {
        mode = "zero";
        document.getElementById('zeroButton').innerHTML = "Reset";
        window.requestAnimationFrame(zeroClock);
    }
    else if (mode == "zeroed") {
      mode = "clock"
      document.getElementById('zeroButton').innerHTML = "Zero";
      window.requestAnimationFrame(drawClock);
    }
}



// DRAWING CODE

function drawClock() {
	drawFace(ctx, clockRadius);
	drawNumbers(ctx, clockRadius);
    if (mode == "clock") {
        currentHandPositions = drawHandsOnTime(ctx, clockRadius);
        window.requestAnimationFrame(drawClock);
    }
    else {
        drawHands(ctx, currentHandPositions, clockRadius);
    }
}

function zeroClock() {
  // Draw clock face and numbers
  drawFace(ctx, clockRadius);
  drawNumbers(ctx, clockRadius);
  var interHour = (0 + currentHandPositions[0]) / 1.06;
  var interMinute = (0 + currentHandPositions[1]) / 1.06;
  var interSecond = (0 + currentHandPositions[2]) / 1.06;
  drawHands(ctx, [interHour, interMinute, interSecond], clockRadius);

  console.log(interHour + interMinute + interSecond);

  if (interHour + interMinute + interSecond > 0.01) {
    currentHandPositions = [interHour, interMinute, interSecond]
    console.log("Resetting...");
    window.requestAnimationFrame(zeroClock);
  }
  else {
    console.log("Completed reset");
    mode = "zeroed";
    window.requestAnimationFrame(drawClock);
  }

}

function drawFace(ctx, clockRadius) {
	// Draw rim of clock
	ctx.arc(0, 0, clockRadius, 0, 2*Math.PI);
	ctx.fillStyle = "steelblue";
	ctx.fill();

	// Draw white face of clock over rim
	ctx.beginPath();
	ctx.arc(0, 0, clockRadius*0.95, 0, 2*Math.PI);
	ctx.fillStyle = "white"
	ctx.fill();

	// Draw central dot of clock where hands attach
	ctx.beginPath();
	ctx.arc(0, 0, clockRadius*0.075, 0, 2*Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
}

function drawNumbers(ctx, clockRadius) {
	var ang;
    var num;
    // Draw hour ticks
    for(num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.lineWidth = clockRadius * 0.03;
        ctx.lineCap = "round"
        ctx.moveTo(0, clockRadius * 0.80);
        ctx.lineTo(0, clockRadius * 0.90)
        ctx.stroke();
        ctx.rotate(-ang);
    }
    // Draw minute ticks
    for(num = 1; num < 61; num++) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.lineWidth = clockRadius * 0.01;
        ctx.lineCap = "round"
        ctx.moveTo(0, clockRadius * 0.85);
        ctx.lineTo(0, clockRadius * 0.90);
        ctx.stroke();
        ctx.rotate(-ang);
    }
}

// Draws hands at positions detailed by array handPositions ([hour, minute, second] in radians)
function drawHands(ctx, handPositions, clockRadius) {
  // Draw hour, minute, and second hands
  drawMinuteHand(ctx, handPositions[0], clockRadius * 0.5, clockRadius * 0.07);
  drawMinuteHand(ctx, handPositions[1], clockRadius * 0.8, clockRadius * 0.07);
  drawSecondHand(ctx, handPositions[2], clockRadius * 0.85, clockRadius * 0.02);
  // Redraw second hand central dot over hands
  ctx.beginPath();
  ctx.arc(0, 0, clockRadius*0.035, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

// Pulls system time and draws hands at correct positions, then returns their positions
function drawHandsOnTime(ctx, clockRadius) {
	var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var millisecond = now.getMilliseconds();

  // Get hour hand position and draw
  hour = hour % 12;
  hour = (hour * Math.PI/6) + (minute * Math.PI/(6 * 60)) + (second * Math.PI/(360 * 60));
  drawMinuteHand(ctx, hour, clockRadius * 0.5, clockRadius * 0.07);
  // Get minute hand position and draw
  minute = (minute * Math.PI/30) + (second * Math.PI/(30 * 60));
  drawMinuteHand(ctx, minute, clockRadius * 0.8, clockRadius * 0.07);
  // Get second hand position and draw
  second = (second * Math.PI/30) + (millisecond * Math.PI/(30 * 1000));
  drawSecondHand(ctx, second, clockRadius * 0.85, clockRadius * 0.02);

  // Redraw second hand central dot over hands
  ctx.beginPath();
	ctx.arc(0, 0, clockRadius*0.035, 0, 2*Math.PI);
	ctx.fillStyle = "red";
	ctx.fill();

  // Return array of recently drawn positions
  return [hour, minute, second]
}


function drawMinuteHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

function drawSecondHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = "red";
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

// ToDo:
// - create crown for adjusting time - with click in and out, and hold and drag to move crown
// - create timer function with button - slowly move hands to 12:00:00 when activated
