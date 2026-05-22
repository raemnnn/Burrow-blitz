const startScreen = document.getElementById("startScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const nextStoryBtn = document.getElementById("nextStoryBtn");
const retryBtn = document.getElementById("retryBtn");

const moles = document.querySelectorAll(".mole");

const scoreValue = document.getElementById("scoreValue");
const comboValue = document.getElementById("comboValue");
const timerBar = document.getElementById("timerBar");
const timerValue = document.getElementById("timerValue");
const phaseText = document.getElementById("phaseText");
const finalScore = document.querySelector(".score-values h2");

let gameState = "Start";
let score = 0;
let combo = 0;
let time = 100;
let lives = 3;
let gameInterval;

const PHASES = [
    { name: "Easy", spawnRate: 1200 },
    { name: "Normal", spawnRate: 900 },
    { name: "Hard", spawnRate: 700 },
    { name: "Master", spawnRate: 500 },
    { name: "Insane", spawnRate: 350 }
];

let currentPhaseIndex = 0;
let spawnTimer = 0;

function updatePhase() {
    if (score > 200 && currentPhaseIndex < 4) currentPhaseIndex = 4;
    else if (score > 150 && currentPhaseIndex < 3) currentPhaseIndex = 3;
    else if (score > 100 && currentPhaseIndex < 2) currentPhaseIndex = 2;
    else if (score > 50 && currentPhaseIndex < 1) currentPhaseIndex = 1;
}

function gameLoop() {
    if (gameState !== "Playing") return;

    time--;
    updatePhase();

    if (time < 0) time = 0;

    timerBar.style.width = time + "%";
    timerValue.textContent = formatTime(time);

    if (time <= 0) {
        gameOver();
        return;
    }

    spawnTimer++;

const phase = PHASES[currentPhaseIndex];
phaseText.textContent = `PHASE ${currentPhaseIndex + 1} - ${phase.name}`;

const spawnThreshold = phase.spawnRate / 500;

if (spawnTimer >= spawnThreshold) {
    randomMole();
    spawnTimer = 0;
}
}

/* SCREEN FLOW */
startBtn.onclick = () => {
    startScreen.style.display = "none";
    storyScreen.style.display = "flex";
};

nextStoryBtn.onclick = () => {
    storyScreen.style.display = "none";
    gameScreen.style.display = "flex";
    startGame();
};

retryBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "flex";
    resetGame();
    startGame(); 
};

document.querySelectorAll(".button").forEach(btn => {
    if (!btn.id) {
        btn.onclick = () => {
            alert("Feature not implemented yet.");
        };
    }
});

/* MOLE CLICK */
moles.forEach(mole => {
    mole.addEventListener("click", () => {
        if (mole.classList.contains("active")) {
            mole.dataset.clicked = "true";
            mole.classList.remove("active");
            mole.classList.add("matched");

            combo++;

            let multiplier = 1;

            if (combo >= 10) multiplier = 2;
            else if (combo >= 5) multiplier = 1.5;

            score += 10 * multiplier;

            scoreValue.textContent = score;
            comboValue.textContent = combo;

            setTimeout(() => {
                mole.classList.remove("matched");
            }, 400);
        }
    });
});

/* TIMER */
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/* SPAWN MOLES */
function randomMole() {

    const phase = PHASES[currentPhaseIndex];

    moles.forEach(m => {
        m.classList.remove("active");
        m.dataset.clicked = "false";
    });

    const index = Math.floor(Math.random() * moles.length);
    const mole = moles[index];

    mole.classList.add("active", "shuffling");

    setTimeout(() => {

    if (mole.dataset.clicked !== "true") {
        combo = 0;
        lives--;

        console.log("Lives:", lives);

        if (lives <= 0) {
            gameOver();
            return;
        }
    }

    mole.classList.remove("active");

}, 1000);
}

/* GAME LOOP */
function startGame() {
    gameState = "Playing";

    time = 100;
    lives = 3;
    timerBar.style.width = "100%";
    timerValue.textContent = formatTime(time);
    timerBar.classList.remove("warning");

    currentPhaseIndex = 0;
    spawnTimer = 0;

    clearInterval(gameInterval);
    gameInterval = setInterval(gameLoop, 500);
}

/* GAME OVER */
function gameOver() {
    gameState = "GameOver";
    clearInterval(gameInterval);

    timerValue.textContent = formatTime(time);

    finalScore.textContent = `Score: ${score}`;

    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
}

/* RESET */
function resetGame() {
    score = 0;
    combo = 0;
    time = 100;
    lives = 3;

    scoreValue.textContent = 0;
    comboValue.textContent = 0;
    timerBar.style.width = "100%";
    timerValue.textContent = formatTime(time);

    moles.forEach(m => {
        m.classList.remove("active");
        m.classList.remove("matched");
        m.dataset.clicked = "false";
    });
}