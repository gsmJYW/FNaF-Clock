var timer;

var sumTicks = 0;
var startDate = new Date();

var ticking = false;

const toggleButton = document.getElementById('toggle-button');
const canvas = document.getElementById('canvas');
const timerText = document.getElementById('timer-text');
const minutes = document.getElementById('minutes')
const seconds = document.getElementById('seconds')
const hundredths = document.getElementById('hundredths');
const buttonDiv = document.getElementById('button-div');
const buttons = document.getElementsByClassName('button');
const imgs = document.getElementsByTagName('img');
const animatronicTexts = document.getElementsByClassName('animatronic-text');
const animatronicTextEnds = document.getElementsByClassName('animatronic-text-end');
const freddy = document.getElementById('freddy');
const bonnie = document.getElementById('bonnie');
const chica = document.getElementById('chica');
const foxy = document.getElementById('foxy');
const bars = document.getElementsByClassName('ldBar')

var freddyBar = new ldBar('#freddy-bar');
var foxyBar = new ldBar('#foxy-bar');
var bonnieBar = new ldBar('#bonnie-bar');
var chicaBar = new ldBar('#chica-bar');

var relativeSize = window.innerWidth < window.innerHeight * 0.5 ? window.innerWidth : window.innerHeight * 0.5;

timerText.style.fontSize = `${relativeSize * 0.12}px`;
hundredths.style.fontSize = `${relativeSize * 0.07}px`;
buttonDiv.style.width = `${relativeSize * 0.53}px`;
buttonDiv.style.marginTop = `${relativeSize * 0.02}px`;

for (var button of buttons) {
  button.style.padding = `${relativeSize * 0.02}px 0px`;
  button.style.fontSize = `${relativeSize * 0.07}px`;
}

for (var img of imgs) {
  img.style.width = `${relativeSize * 0.15}px`;
  img.style.height = `${relativeSize * 0.15}px`;
}

for (var animatronicText of animatronicTexts) {
  animatronicText.style.fontSize = `${relativeSize * 0.05}px`;
  animatronicText.style.margin = `${relativeSize * 0.05}px`;
}

for (var animatronicTextEnd of animatronicTextEnds) {
  animatronicTextEnd.style.margin = `0px 0px 0px ${relativeSize * 0.05}px`;
}

canvas.width = relativeSize;
canvas.height = relativeSize;
document.querySelector('button').addEventListener('click', () => {
  document.querySelector('.progress .bar').style.transitionDuration = '10s';
  document.querySelector('.progress').className += ' complete';
});

function setTimer() {
  var tempTicks = Math.floor((new Date() - startDate) / 10);
  var ticks = sumTicks + tempTicks;

  if (ticks >= 53500) {
    ticks = 53500;
    stop();
    
    toggleButton.hidden = true;
  }

  progress = ticks / 100 / 535;

  hundredths.innerHTML = ('0' + ticks % 100).slice(-2);
  seconds.innerHTML = ('0' + Math.floor(ticks / 100) % 60).slice(-2);
  minutes.innerHTML = ('0' + Math.floor(ticks / 100 / 60)).slice(-2);
  freddy.innerHTML = ((302 -  ticks % 302) / 100).toFixed(2);
  bonnie.innerHTML = ((497 -  ticks % 497) / 100).toFixed(2);
  chica.innerHTML = ((498 -  ticks % 498) / 100).toFixed(2);
  foxy.innerHTML = ((501 -  ticks % 501) / 100).toFixed(2);

  freddyBar.set((ticks % 302) / 302 * 100);
  bonnieBar.set((ticks % 497) / 497 * 100);
  chicaBar.set((ticks % 498) / 498 * 100);
  foxyBar.set((ticks % 501) / 501 * 100);
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

  hundredths.innerHTML = '00';
  seconds.innerHTML = '00';
  minutes.innerHTML = '00';

  freddy.innerHTML = '3.02';
  bonnie.innerHTML = '4.97';
  chica.innerHTML = '4.98';
  foxy.innerHTML = '5.01';

  freddyBar.set(0);
  bonnieBar.set(0);
  chicaBar.set(0);
  foxyBar.set(0);

  toggleButton.hidden = false;
}

context = canvas.getContext ('2d');
centerX = canvas.width / 2;
centerY = canvas.height / 2;
progress = 0;

function blueCircle(n) {
  context.save();
  context.beginPath();
  context.strokeStyle = '#49f';
  context.lineWidth = 6;
  context.arc(centerX, centerY, relativeSize * 0.4, -Math.PI / 2, -Math.PI / 2 + n * Math.PI * 2, false);
  context.stroke();
  context.restore();
}

function whiteCircle() {
  context.save();
  context.beginPath();
  context.strokeStyle = 'white';
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

for (var bar of bars) {
  bar.style = `width: ${relativeSize * 0.175}px; height: ${relativeSize * 0.175}px; margin: 0px ${relativeSize * 0.16}px 0px ${relativeSize * 0.013}px`;
}