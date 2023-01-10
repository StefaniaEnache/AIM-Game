const start = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector(".time-list");
const board = document.querySelector("#board");
const timer = document.querySelector("#time");
let interval = null;

let time = 0;
let score = 0;

start.addEventListener("click", () => {
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  interval = setInterval(decraseTime, 1000);
  createRandomCircle();
  setTimer(time);
}

function finishGame() {
  clearInterval(interval);
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
  timeList.parentNode.innerHTML = "";
}

function decraseTime() {
  if (time === 0) {
    finishGame();
  } else {
    --time;
    setTimer(time);
  }
}

function setTimer(value) {
  if (value < 10) {
    timer.innerHTML = `00:0${value}`;
  } else {
    timer.innerHTML = `00:${value}`;
  }
}

function createRandomCircle() {
  let circle = document.createElement("div");
  const size = getRandomNumber(10, 50);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.setAttribute("id", "color");

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function randomInteger(max) {
  return Math.floor(Math.random() * (max + 1));
}

function randomRgbColor() {
  const r = randomInteger(255);
  const g = randomInteger(255);
  const b = randomInteger(255);
  return [r, g, b];
}

function randomHexColor() {
  let [r, g, b] = randomRgbColor();
  
  let hr = r.toString(16).padStart(2, "0");
  let hg = g.toString(16).padStart(2, "0");
  let hb = b.toString(16).padStart(2, "0");

  return "#" + hr + hg + hb;
}

function changeColor() {
  let hex = randomHexColor();
  const randomCircle = document.getElementById("color");
  randomCircle.style.background = hex;
}

function clickHandler(event) {
  changeColor();
  event.preventDefault();
}

document.addEventListener("click", clickHandler);

changeColor();

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
