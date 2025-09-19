// Pomodoro phases
const phases = [
  { label: "Focus", time: 25 * 60, icon: "📘" },
  { label: "Short Break", time: 5 * 60, icon: "☕" },
  { label: "Focus", time: 25 * 60, icon: "📘" },
  { label: "Short Break", time: 5 * 60, icon: "☕" },
  { label: "Focus", time: 25 * 60, icon: "📘" },
  { label: "Long Break", time: 15 * 60, icon: "💤" },
];

let phaseIndex = 0;
let timeLeft = phases[phaseIndex].time;
let timerRunning = false;
let intervalId = null;

// Elements
const clockEl = document.getElementById("clock");
const countdownEl = document.getElementById("countdown");
const characterEl = document.getElementById("character");
const titleEl = document.querySelector(".title");
const phaseIconEl = document.querySelector(".phase-icon");

// Default character
characterEl.src = characters.bear;

// Clock in header
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Format helper
function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Render countdown + labels
function render() {
  countdownEl.textContent = formatTime(timeLeft);
  titleEl.textContent = phases[phaseIndex].label;
  phaseIconEl.textContent = phases[phaseIndex].icon;
}

// Tick function
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    render();
  } else {
    phaseIndex = (phaseIndex + 1) % phases.length;
    timeLeft = phases[phaseIndex].time;
    render();
    bounceCharacter();
  }
}

// Click to start/stop
characterEl.addEventListener("click", () => {
  if (!timerRunning) {
    timerRunning = true;
    intervalId = setInterval(tick, 1000);
    bounceCharacter();
  } else {
    timerRunning = false;
    clearInterval(intervalId);
  }
});

// Bounce effect
function bounceCharacter() {
  characterEl.classList.add("bounce");
  setTimeout(() => characterEl.classList.remove("bounce"), 600);
}

// Init render
render();

// --------------------
// PARTICLE SYSTEM
// --------------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particlesArray = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 3 + 1;
    this.speedY = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -this.size) {
      this.y = canvas.height + this.size;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.fillStyle = `rgba(255,255,255,${this.alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
