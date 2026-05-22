const screens = document.querySelectorAll(".screen");

const startScreen = document.getElementById("startScreen");
const storyScreen = document.getElementById("storyScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const phaseText = document.getElementById("phaseText");

const startBtn = document.getElementById("startBtn");
const nextStoryBtn = document.getElementById("nextStoryBtn");
const retryBtn = document.getElementById("retryBtn");

const moles = gameScreen.querySelectorAll(".mole");

const scoreValue = document.getElementById("scoreValue");
const comboValue = document.getElementById("comboValue");
const timerValue = document.getElementById("timerValue");
const timerBar = document.getElementById("timerBar");

const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");

let score = 0;
let combo = 0;
let time = 100;
let timer;
const maxTime = 100;
let lives = 3;
let moleInterval;
let phase = 1;
let spawnSpeed = 800;
let activeMole = null;
let canMiss = false;
let lostLifeThisPhase = false;


const critterTypes = [
    { type: "normal", score: 10, penalty: 0 },
    { type: "fake", score: 0, penalty: 1 },
    { type: "bonus", score: 20, penalty: 0 }
];

/* STORY DATA */
const stories = [
    {
        image: "story1.png",
        title: "Scientist",
        text: "After years of research, my cloning machine is finally complete. It was designed to revolutionize science and safely duplicate organic matter."
    },

    {
        image: "story2.png",
        title: "Experiment Start",
        text: "Everything is ready. I will begin the first controlled test using a simple sample object."
    },

    {
        image: "story3.png",
        title: "Mistake",
        text: "A real mole unexpectedly enters the lab and gets inside the machine during the test sequence."
    },

    {
        image: "story4.png",
        title: "Malfunction",
        text: "The system misreads the mole as the test sample and starts cloning it uncontrollably."
    },

    {
        image: "story5.png",
        title: "Outbreak",
        text: "The machine overloads and releases countless cloned moles, spreading rapidly beyond control."
    },

    {
        image: "story6.png",
        title: "Global Crisis",
        text: "The cloned mole swarm has escaped containment… and is now spreading across the world."
    }
];


let currentStory = 0;

function showScreen(screenToShow) {

    screens.forEach(screen => {
        screen.style.display = "none";
    });

    screenToShow.style.display = "flex";
}

/* SCREEN FLOW */
startBtn.onclick = () => {

    startScreen.style.display = "none";
    showScreen(storyScreen);
    console.log("Game Starting...");

    updateStory();
};

/* NEXT STORY */
nextStoryBtn.onclick = () => {

    currentStory++;

    if(currentStory < stories.length){

        updateStory();

    } else {

        storyScreen.style.display = "none";
        showScreen(gameScreen);

        startGame();
    }
};

retryBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    showScreen(storyScreen);
    resetGame();
};

/* UPDATE STORY */
function updateStory(){

    storyScreen.style.backgroundImage =
        `url("${stories[currentStory].image}")`;

    storyTitle.textContent =
        stories[currentStory].title;

    storyText.textContent =
        stories[currentStory].text;
}

function updatePhase() {
    let newPhase = 1;

    if (score >= 200) newPhase = 4;
    else if (score >= 100) newPhase = 3;
    else if (score >= 50) newPhase = 2;

    if (newPhase === phase) return;

    phase = newPhase;

    gameScreen.classList.remove("phase-meadow", "phase-desert", "phase-snow", "phase-space");

    if (phase === 1) {
        gameScreen.classList.add("phase-meadow");
        phaseText.textContent = "PHASE 1 - MEADOW";
        spawnSpeed = 1100;
    } else if (phase === 2) {
        gameScreen.classList.add("phase-desert");
        phaseText.textContent = "PHASE 2 - DESERT";
        spawnSpeed = 950;
    } else if (phase === 3) {
        gameScreen.classList.add("phase-snow");
        phaseText.textContent = "PHASE 3 - SNOW";
        spawnSpeed = 850;
    } else {
        gameScreen.classList.add("phase-space");
        phaseText.textContent = "PHASE 4 - SPACE";
        spawnSpeed = 750;
    }

    clearInterval(moleInterval);
    randomMole();
    moleInterval = setInterval(randomMole, spawnSpeed);

    console.log("Phase:", phase);
}


/* MOLE CLICK */
moles.forEach(mole => {
    mole.addEventListener("click", () => {

        if (mole === activeMole && mole.classList.contains("active")) {

            // HIT
            mole.classList.remove("active");
            mole.classList.add("matched");

            mole.dataset.missed = "false";
            clearTimeout(mole._timeout);
            activeMole = null;

            score += Number(mole.dataset.score);

            const penalty = Number(mole.dataset.penalty);
            lives -= penalty;

            if (penalty > 0) {
                lostLifeThisPhase = true;
            }

            combo++;

            updatePhase();

            scoreValue.textContent = score;
            comboValue.textContent = combo;

            setTimeout(() => {
                mole.classList.remove("matched");
            }, 150);

            console.log("Combo:", combo);
            console.log("Hit!");

        } else if (!mole.classList.contains("matched")) {

            combo = 0;
            comboValue.textContent = combo;

            console.log("Miss Click!");
        }

    });
});

/* SPAWN MOLES */
function randomMole() {
    console.log("SPAWNING MOLE");

    // clear previous mole
    moles.forEach(m => {
        m.classList.remove("active");
        m.classList.remove("matched");
        m.dataset.missed = "true";
        clearTimeout(m._timeout);
    });


    const index = Math.floor(Math.random() * moles.length);
    const mole = moles[index];

    activeMole = mole;

    let critterPool = [];

    if (phase === 1) critterPool = [critterTypes[0]];
    else if (phase === 2) critterPool = [critterTypes[0], critterTypes[1]];
    else critterPool = critterTypes;

    const critter = critterPool[Math.floor(Math.random() * critterPool.length)];

    mole.dataset.score = critter.score;
    mole.dataset.penalty = critter.penalty;

    mole.classList.add("active");
    mole.dataset.missed = "true";

    //MISSED MOLE
    mole._timeout = setTimeout(() => {

        if (mole.classList.contains("active") && mole.dataset.missed === "true") {

            mole.classList.remove("active");

            lives--;
            lostLifeThisPhase = true;
            combo = 0;
            comboValue.textContent = combo;

            console.log("Missed. Lives:", lives);

            if (lives <= 0) {
                gameOver();
            }
        }

    }, spawnSpeed - 40);
}

/* GAME LOOP */
function startGame() {
    console.log("START GAME TRIGGERED");

    clearInterval(moleInterval);
    clearInterval(timer);

    spawnSpeed = 800;
    randomMole();
    moleInterval = setInterval(randomMole, spawnSpeed);


    timer = setInterval(() => {

        time--;
        const timePercent = (time / maxTime) * 100;
        timerBar.style.width = timePercent + "%";

        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        timerValue.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (time < 30) {
            timerBar.classList.add("warning");
        }

        if (time <= 0) {

            clearInterval(timer);

            gameOver();
        }

    }, 1000);
}

/* GAME OVER */
function gameOver() {

    clearInterval(moleInterval);
    clearInterval(timer);

    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
}

/* RESET */
function resetGame() {

    score = 0;
    combo = 0;
    time = 100;
    lives = 3;
    phase = 1;

    spawnSpeed = 800;
    gameScreen.classList.remove("phase-desert", "phase-snow", "phase-space");
    gameScreen.classList.add("phase-meadow");
    phaseText.textContent = "PHASE 1 - MEADOW";


    scoreValue.textContent = 0;
    comboValue.textContent = 0;

    timerBar.style.width = "100%";
    timerValue.textContent = "00:00";

    clearInterval(moleInterval);

    moles.forEach(m => {
        m.classList.remove("active");
        m.classList.remove("matched");
    });

    console.log("Game Reset Complete");
}