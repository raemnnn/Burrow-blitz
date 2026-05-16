/* ================================= */
/* SCRIPT.JS */
/* ================================= */

/* ================================= */
/* SCREENS */
/* ================================= */

const startScreen = document.getElementById("startScreen");

const storyScreen = document.getElementById("storyScreen");

const gameScreen = document.getElementById("gameScreen");

const gameOverScreen = document.getElementById("gameOverScreen");

/* ================================= */
/* BUTTONS */
/* ================================= */

const startBtn = document.getElementById("startBtn");

const nextStoryBtn = document.getElementById("nextStoryBtn");

const retryBtn = document.getElementById("retryBtn");

/* ================================= */
/* START BUTTON */
/* ================================= */

startBtn.addEventListener("click", () => {

    startScreen.style.display = "none";

    storyScreen.style.display = "flex";

});

/* ================================= */
/* STORY NEXT BUTTON */
/* ================================= */

nextStoryBtn.addEventListener("click", () => {

    storyScreen.style.display = "none";

    gameScreen.style.display = "flex";

});

/* ================================= */
/* RETRY BUTTON */
/* ================================= */

retryBtn.addEventListener("click", () => {

    gameOverScreen.style.display = "none";

    gameScreen.style.display = "flex";

});

/* ================================= */
/* SAMPLE PHASE SWITCH */
/* ================================= */

const phaseText = document.getElementById("phaseText");

/* SAMPLE ONLY */

setTimeout(() => {

    gameScreen.classList.remove("phase-meadow");

    gameScreen.classList.add("phase-desert");

    phaseText.textContent = "PHASE 2 - DESERT";

}, 10000);

/* ================================= */
/* SAMPLE GAME OVER */
/* ================================= */

/*
REMOVE THIS LATER
*/

setTimeout(() => {

    gameScreen.style.display = "none";

    gameOverScreen.style.display = "flex";

}, 30000);

console.log("Burrow Blitz Loaded Successfully");