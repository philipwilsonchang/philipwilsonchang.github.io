var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
var mode = "clock";
var currentHandPositions = [0,0,0];
ctx.translate(radius, radius);
radius = radius * 0.90;

window.addEventListener('keydown', keyHandler, false);
window.requestAnimationFrame(drawClock);

// INTERACTIVE CODE

function keyHandler(press) {
    var keyPressed = press.keyCode;
    switch (keyPressed) {
        case 80: mode = "paused"; break;    // P
        case 82: mode = "clock"; window.requestAnimationFrame(drawClock); break;    // R
        default: mode = "clock"; window.requestAnimationFrame(drawClock);           // everything else
    }
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

function resetButton() {
    if (mode != "reset") {
        mode = "reset";
        window.requestAnimationFrame(resetClock);
    }
}



// DRAWING CODE

function drawClock() {
	drawFace(ctx, radius);
	drawNumbers(ctx, radius);
    if (mode == "clock") {
        currentHandPositions = drawHandsOnTime(ctx, radius);
        window.requestAnimationFrame(drawClock);
    }
    else if (mode == "reset"){
        currentHandPositions = drawHandsOnTime(ctx, radius);
    }
    else {
        currentHandPositions = drawHandsOnTime(ctx, radius);
    }
}

function resetClock() {
  // Draw clock face and numbers
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  var interHour = (0 + currentHandPositions[0]) / 1.06;
  drawMinuteHand(ctx, interHour, radius * 0.5, radius * 0.07);
  var interMinute = (0 + currentHandPositions[1]) / 1.06;
  drawMinuteHand(ctx, interMinute, radius * 0.8, radius * 0.07);
  var interSecond = (0 + currentHandPositions[2]) / 1.06;
  drawSecondHand(ctx, interSecond, radius * 0.85, radius * 0.02);
  // Redraw second hand central dot over hands
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.035, 0, 2*Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();

  console.log(interHour + interMinute + interSecond);

  if (interHour + interMinute + interSecond > 0.01) {
    currentHandPositions = [interHour, interMinute, interSecond]
    console.log("Resetting...");
    window.requestAnimationFrame(resetClock);
  }
  else {
    console.log("Completed reset");
    mode = "paused";
    window.requestAnimationFrame(drawClock);
  }

}

function drawFace(ctx, radius) {
	// Draw rim of clock
	ctx.arc(0, 0, radius, 0, 2*Math.PI);
	ctx.fillStyle = "steelblue";
	ctx.fill();

	// Draw white face of clock over rim
	ctx.beginPath();
	ctx.arc(0, 0, radius*0.95, 0, 2*Math.PI);
	ctx.fillStyle = "white"
	ctx.fill();

	// Draw central dot of clock where hands attach
	ctx.beginPath();
	ctx.arc(0, 0, radius*0.075, 0, 2*Math.PI);
	ctx.fillStyle = "black";
	ctx.fill();
}

function drawNumbers(ctx, radius) {
	var ang;
    var num;
    // Draw hour ticks
    for(num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.lineWidth = radius * 0.03;
        ctx.lineCap = "round"
        ctx.moveTo(0, radius * 0.80);
        ctx.lineTo(0, radius * 0.90)
        ctx.stroke();
        ctx.rotate(-ang);
    }
    // Draw minute ticks
    for(num = 1; num < 61; num++) {
        ang = num * Math.PI / 30;
        ctx.rotate(ang);
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.lineWidth = radius * 0.01;
        ctx.lineCap = "round"
        ctx.moveTo(0, radius * 0.85);
        ctx.lineTo(0, radius * 0.90);
        ctx.stroke();
        ctx.rotate(-ang);
    }
}

function drawHandsOnTime(ctx, radius) {
	var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var millisecond = now.getMilliseconds();

  if (mode == "clock") {
    // Get hour hand position and draw
    hour = hour % 12;
    hour = (hour * Math.PI/6) + (minute * Math.PI/(6 * 60)) + (second * Math.PI/(360 * 60));
    drawMinuteHand(ctx, hour, radius * 0.5, radius * 0.07);
    // Get minute hand position and draw
    minute = (minute * Math.PI/30) + (second * Math.PI/(30 * 60));
    drawMinuteHand(ctx, minute, radius * 0.8, radius * 0.07);
    // Get second hand position and draw
    second = (second * Math.PI/30) + (millisecond * Math.PI/(30 * 1000));
    drawSecondHand(ctx, second, radius * 0.85, radius * 0.02);

    // Redraw second hand central dot over hands
    ctx.beginPath();
  	ctx.arc(0, 0, radius*0.035, 0, 2*Math.PI);
  	ctx.fillStyle = "red";
  	ctx.fill();

    // Return array of recently drawn positions
    return [hour, minute, second]
  }
  else {
    drawMinuteHand(ctx, currentHandPositions[0], radius * 0.5, radius * 0.07);
    drawMinuteHand(ctx, currentHandPositions[1], radius * 0.8, radius * 0.07);
    drawSecondHand(ctx, currentHandPositions[2], radius * 0.85, radius * 0.02);

    // Redraw second hand central dot over hands
    ctx.beginPath();
  	ctx.arc(0, 0, radius*0.035, 0, 2*Math.PI);
  	ctx.fillStyle = "red";
  	ctx.fill();

    // Return array of recently drawn positions
    return currentHandPositions
  }
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
// - create reset button to adjust time back to system time
// - make crown/button touch friendly
// - make clock resize with browser size: http://stackoverflow.com/questions/4288253/html5-canvas-100-width-height-of-viewport
// - create timer function with button - slowly move hands to 12:00:00 when activated
