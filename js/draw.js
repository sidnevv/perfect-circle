function resize() {
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width = window.innerWidth;
  circle.canvas.height = window.innerHeight;
  circle.canvas.width = window.innerWidth;
}

function randomColor() {
  return Math.floor(Math.random() * 16777215).toString(16);
}

function setRandomColors() {
  const strokeStyle = `#${randomColor()}`;
  ctx.strokeStyle = strokeStyle;
  circle.strokeStyle = strokeStyle;
}

function initCanvas() {
  setRandomColors();
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  circle.lineWidth = 2;
  circle.lineCap = 'round';
}

function setPosition(event) {
  x = event.clientX;
  y = event.clientY;
}

function draw(event) {
  if (event.buttons !== 1) return;
  ctx.beginPath();
  ctx.moveTo(x, y);
  setPosition(event);
  ctx.lineTo(x, y);
  ctx.stroke();
}

let x, y;
let coordinates = [];

const canvas = document.getElementById('draw');
const circleCanvas = document.getElementById('circle')
const ctx = canvas.getContext('2d');
const circle = circleCanvas.getContext('2d');

resize();
initCanvas();

window.addEventListener('resize', resize);
canvas.addEventListener('mousemove', event => {
  if (event.buttons === 1) {
    draw(event);
    coordinates.push([x, y]);
  }
  setPosition(event);
});

canvas.addEventListener('mouseup', event => {
  let [a, b] = getPoints(coordinates);
  let centreCoordinates = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let radius = Math.hypot(centreCoordinates[0] - a[0], centreCoordinates[1] - a[1]);

  circle.beginPath()
  circle.arc(centreCoordinates[0], centreCoordinates[1], radius, 0, 2 * Math.PI);
  circle.stroke();

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  coordinates = [];

  setRandomColors();
});




