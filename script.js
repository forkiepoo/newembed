// Phases of Pomodoro
const phases = [
  { label: "Focus", time: 25 * 60 },
  { label: "Short Break", time: 5 * 60 },
  { label: "Focus", time: 25 * 60 },
  { label: "Short Break", time: 5 * 60 },
  { label: "Focus", time: 25 * 60 },
  { label: "Long Break", time: 15 * 60 },
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

// Choose default character
characterEl.src = characters.bear;

// Live clock (header)
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  clockEl.textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Format seconds -> mm:ss or hh:mm:ss
function formatTime(sec) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Update countdown display
function renderCountdown() {
  countdownEl.textContent = formatTime(timeLeft);
  titleEl.textContent = phases[phaseIndex].label;
}

// Tick
function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    renderCountdown();
  } else {
    // Phase finished -> move to next
    phaseIndex = (phaseIndex + 1) % phases.length;
    timeLeft = phases[phaseIndex].time;
    renderCountdown();
    bounceCharacter();
  }
}

// Start / stop on character click
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

// Small bounce effect
function bounceCharacter() {
  characterEl.style.transform = "scale(1.2)";
  setTimeout(() => {
    characterEl.style.transform = "scale(1)";
  }, 300);
}

// Init
renderCountdown();
