// Set countdown start time (2 hours)
let countdownSeconds = 2 * 60 * 60;

// Update real-time clock (top)
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();

// Update countdown (bottom)
function updateCountdown() {
  if (countdownSeconds >= 0) {
    const h = String(Math.floor(countdownSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((countdownSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(countdownSeconds % 60).padStart(2, "0");
    document.getElementById("countdown").textContent = `${h}:${m}:${s}`;
    countdownSeconds--;
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Example: pick bear face
document.getElementById("character").src = characters.bear;
