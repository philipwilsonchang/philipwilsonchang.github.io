// INTERACTIVE CODE
var totalMade = 0;
var totalShot = 0;
var percentage = 0.0;
document.getElementById('percentDisplay').innerHTML = percentage + "%";
document.getElementById('fractionDisplay').innerHTML = totalMade + "/" + totalShot;

function madeButton() {
  totalMade = totalMade + 1;
  totalShot = totalShot + 1;
  recalculate();
}

function missButton() {
  totalShot = totalShot + 1;
  recalculate();
}

function zeroButton() {
  totalMade = 0;
  totalShot = 0;
  percentage = 0.0;
  document.getElementById('percentDisplay').innerHTML = percentage + "%";
  document.getElementById('fractionDisplay').innerHTML = totalMade + "/" + totalShot;
}

function recalculate() {
  percentage = (totalMade / totalShot * 100.0).toFixed(1);
  document.getElementById('percentDisplay').innerHTML = percentage + "%";
  document.getElementById('fractionDisplay').innerHTML = totalMade + "/" + totalShot;
}
