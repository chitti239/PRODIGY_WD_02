const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

function formatTime(ms) {

    let hours = Math.floor(ms / 3600000);

    let minutes = Math.floor(
        (ms % 3600000) / 60000
    );

    let seconds = Math.floor(
        (ms % 60000) / 1000
    );

    let centiseconds = Math.floor(
        (ms % 1000) / 10
    );

    return (
        String(hours).padStart(2, "0") +
        ":" +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0") +
        "." +
        String(centiseconds).padStart(2, "0")
    );
}

function updateDisplay() {

    elapsedTime =
        Date.now() - startTime;

    display.textContent =
        formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {

    if (!running) {

        startTime =
            Date.now() - elapsedTime;

        timerInterval =
            setInterval(updateDisplay, 10);

        running = true;

        startBtn.textContent = "Pause";

    } else {

        clearInterval(timerInterval);

        running = false;

        startBtn.textContent = "Start";
    }
});

resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    running = false;

    startTime = 0;
    elapsedTime = 0;
    lapCount = 1;

    display.textContent =
        "00:00:00.00";

    laps.innerHTML = "";

    startBtn.textContent = "Start";
});

lapBtn.addEventListener("click", () => {

    if (!running) return;

    const li =
        document.createElement("li");

    li.textContent =
        `Lap ${lapCount++} - ${display.textContent}`;

    laps.prepend(li);
});