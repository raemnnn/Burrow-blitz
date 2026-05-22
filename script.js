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

const storyTitle = document.getElementById("storyTitle");
const storyText = document.getElementById("storyText");

let score = 0;
let combo = 0;
let time = 100;

/* STORY DATA */
const stories = [
    {
        image: "story1.png",
        title: "Scientist",
        text: "My mole cloning machine is almost complete! With this, I can create an army of moles to take over the world!"
    },

    {
        image: "story2.png",
        title: "Scientist",
        text: "Nobody can stop me now. Soon every city will belong to my mole empire!"
    },

    {
        image: "story3.png",
        title: "Hero Mole",
        text: "I have to stop the scientist before everything is destroyed!"
    },

    {
        image: "story4.png",
        title: "Scientist",
        text: "Guards! Capture that mole immediately!"
    },

    {
        image: "story5.png",
        title: "Hero Mole",
        text: "I will fight through every obstacle to save the underground kingdom!"
    },

    {
        image: "story6.png",
        title: "Narrator",
        text: "The adventure begins..."
    }
];

let currentStory = 0;

/* SCREEN FLOW */
startBtn.onclick = () => {

    startScreen.style.display = "none";
    storyScreen.style.display = "flex";

    updateStory();
};

/* NEXT STORY */
nextStoryBtn.onclick = () => {

    currentStory++;

    if(currentStory < stories.length){

        updateStory();

    } else {

        storyScreen.style.display = "none";
        gameScreen.style.display = "flex";

        startGame();
    }
};

retryBtn.onclick = () => {
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "flex";
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

/* MOLE CLICK */
moles.forEach(mole => {
    mole.addEventListener("click", () => {

        if (mole.classList.contains("active")) {

            mole.classList.remove("active");
            mole.classList.add("matched");

            score += 10;
            combo++;

            scoreValue.textContent = score;
            comboValue.textContent = combo;

            setTimeout(() => {
                mole.classList.remove("matched");
            }, 400);
        }
    });
});

/* SPAWN MOLES */
function randomMole() {

    moles.forEach(m => m.classList.remove("active"));

    const index = Math.floor(Math.random() * moles.length);

    moles[index].classList.add("active", "shuffling");

    setTimeout(() => {
        moles[index].classList.remove("shuffling");
    }, 500);
}

/* GAME LOOP */
function startGame() {

    setInterval(randomMole, 800);

    let timer = setInterval(() => {

        time--;

        timerBar.style.width = time + "%";

        if (time < 30) {
            timerBar.classList.add("warning");
        }

        if (time <= 0) {

            clearInterval(timer);

            gameOver();
        }

    }, 500);
}

/* GAME OVER */
function gameOver() {

    gameScreen.style.display = "none";
    gameOverScreen.style.display = "flex";
}

/* RESET */
function resetGame() {

    score = 0;
    combo = 0;
    time = 100;

    scoreValue.textContent = 0;
    comboValue.textContent = 0;

    timerBar.style.width = "100%";
}