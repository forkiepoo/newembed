// Pomodoro settings
const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

let countdownSeconds = WORK_TIME;
let isRunning = false;
let timerInterval;
let cycleCount = 0;

const countdownEl = document.getElementById("countdown");
const characterEl = document.getElementById("character");

// Set initial character
characterEl.src = characters.bear;

// Update real-time clock
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Format seconds into MM:SS
function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

// Update countdown display
function updateCountdown() {
  countdownEl.textContent = formatTime(countdownSeconds);
}

// Handle timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (countdownSeconds > 0) {
        countdownSeconds--;
        updateCountdown();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        cycleCount++;

        // Decide next session
        if (cycleCount % 4 === 0) {
          countdownSeconds = LONG_BREAK;
          characterEl.src = characters.sleepy;
        } else if (cycleCount % 2 === 0) {
          countdownSeconds = SHORT_BREAK;
          characterEl.src = characters.sleepy;
        } else {
          countdownSeconds = WORK_TIME;
          characterEl.src = characters.bear;
        }

        updateCountdown();
        startTimer(); // auto-continue
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
  }
}

// Toggle timer on character click
characterEl.addEventListener("click", startTimer);

// Init
updateCountdown();
