// INTERACTIVE CODE
var totalMade = 0;
var totalShot = 0;
var threeMade = 0;
var threeShot = 0;
var percentage = 0.0;
var threepercentage = 0.0;
recalculate();

function madeButton() {
  totalMade = totalMade + 1;
  totalShot = totalShot + 1;
  recalculate();
}

function missButton() {
  totalShot = totalShot + 1;
  recalculate();
}

function madeThreeButton() {
  threeMade = threeMade + 1;
  threeShot = threeShot + 1;
  totalMade = totalMade + 1;
  totalShot = totalShot + 1;
  recalculate();
}

function missThreeButton() {
  threeShot = threeShot + 1;
  totalShot = totalShot + 1;
  recalculate();
}

function zeroButton() {
  totalMade = 0;
  totalShot = 0;
  threeMade = 0;
  threeShot = 0;
  recalculate();
}

function recalculate() {
  if (totalShot == 0) {
    percentage = 0.0;
  }
  else {
    percentage = (totalMade / totalShot * 100.0).toFixed(1);
  }
  if (threeShot == 0) {
    threepercentage = 0.0;
  }
  else {
    threepercentage = (threeMade / threeShot * 100.0).toFixed(1);
  }
  document.getElementById('percentDisplay').innerHTML = percentage + "%";
  document.getElementById('fractionDisplay').innerHTML = totalMade + "/" + totalShot;
  document.getElementById('percentThreeDisplay').innerHTML = threepercentage + "%";
  document.getElementById('fractionThreeDisplay').innerHTML = threeMade + "/" + threeShot;
}
