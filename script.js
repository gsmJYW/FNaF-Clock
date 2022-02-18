var timer;

var sumTicks = 0;
var startDate = new Date();

var ticking = false;

const toggleButton = document.getElementById('toggle-button');
const canvas = document.getElementById('canvas');
const timerText = document.getElementById('timer-text');
const hundredths = document.getElementById('hundredths');
const buttonDiv = document.getElementById('button-div');
const buttons = document.getElementsByClassName('button');

var relativeSize = window.innerWidth < window.innerHeight * 0.5 ? window.innerWidth : window.innerHeight * 0.5;

timerText.style.fontSize = `${relativeSize * 0.12}px`;
hundredths.style.fontSize = `${relativeSize * 0.07}px`;
buttonDiv.style.width = `${relativeSize * 0.53}px`;
buttonDiv.style.marginTop = `${relativeSize * 0.02}px`;

for (var button of buttons) {
  button.style.padding = `${relativeSize * 0.02}px 0px`;
  button.style.fontSize = `${relativeSize * 0.07}px`;
}

canvas.width = relativeSize;
canvas.height = relativeSize;

function setTimer() {
  var tempTicks = Math.floor((new Date() - startDate) / 10);
  var ticks = sumTicks + tempTicks;

  if (ticks >= 53500) {
    ticks = 53500;
    stop();
    
    toggleButton.hidden = true;
  }

  progress = ticks / 100 / 535;

  document.getElementById('hundredths').innerHTML = ('0' + ticks % 100).slice(-2);
  document.getElementById('seconds').innerHTML = ('0' + Math.floor(ticks / 100) % 60).slice(-2);
  document.getElementById('minutes').innerHTML = ('0' + Math.floor(ticks / 100 / 60)).slice(-2);
}

function start() {
    startDate = new Date();
    timer = setInterval(setTimer, 10);
    ticking = true;
    toggleButton.textContent = 'Stop';
    toggleButton.classList.toggle('start-button');
    toggleButton.classList.toggle('stop-button');
}

function stop() {
    sumTicks += Math.floor((new Date() - startDate) / 10);
    clearInterval(timer);
    ticking = false;
    toggleButton.textContent = 'Start';
    toggleButton.classList.toggle('start-button');
    toggleButton.classList.toggle('stop-button');
}

function toggle() {
    if (ticking) {
        stop();
    }
    else {
        start();
    }
}

function reset() {
  if (!ticking) {
    toggleButton.classList.toggle('start-button');
    toggleButton.classList.toggle('stop-button');
  }

  stop();
  progress = 0;
  sumTicks = 0;

  min = 0;
  sec = 0;
  c = 0;

  document.getElementById('hundredths').innerHTML = '00';
  document.getElementById('seconds').innerHTML = '00';
  document.getElementById('minutes').innerHTML = '00';

  toggleButton.hidden = false;
}

context = canvas.getContext ('2d');
centerX = canvas.width / 2;
centerY = canvas.height / 2;
progress = 0;

function blueCircle(n) {
  context.save();
  context.beginPath();
  context.strokeStyle = "#49f";
  context.lineWidth = 6;
  context.arc(centerX, centerY, relativeSize * 0.4, -Math.PI / 2, -Math.PI / 2 + n * Math.PI * 2, false);
  context.stroke();
  context.restore();
}

function whiteCircle() {
  context.save();
  context.beginPath();
  context.strokeStyle = "white";
  context.lineWidth = 6;
  context.arc(centerX, centerY, relativeSize * 0.4, 0, Math.PI * 2, false);
  context.stroke();
  context.closePath();
  context.restore();
}

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);

  whiteCircle();
  context.save();
  context.restore();
  blueCircle(progress);
}());