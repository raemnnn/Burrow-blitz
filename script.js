/* ================================= */
/* BURROW BLITZ MAIN GAME FILE */
/* ================================= */




/* ================================= */
/* SCREEN SWITCHING */
/* ================================= */

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const gameOverScreen = document.getElementById("gameOverScreen");

const startBtn = document.getElementById("startBtn");
const retryBtn = document.getElementById("retryBtn");

// START GAME
startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";
});

// RESTART GAME
retryBtn.addEventListener("click", () => {
    gameOverScreen.style.display = "none";
    gameScreen.style.display = "block";
});

/* ========================================= */
/* MEMBER 2 - ENEMY & PHASE DATA             */
/* ========================================= */

// Charles -
// Enemy objects
const enemyTypes = {
    MOLE: { name: "Mole", hits: 1, bonus: 1, isHazard: false, points: 10 },
    RABBIT: { name: "Rabbit", hits: 1, bonus: 2, isHazard: false, points: 20 },
    ROBOT: { name: "Robot", hits: 3, bonus: 3, isHazard: false, points: 50 },
    TRICKSTER: { name: "Trickster", hits: 1, penalty: 2, isHazard: true, points: 0 },
    BOMB: { name: "Bomb", hits: 1, penalty: 5, isHazard: true, points: 0, resetsCombo: true }
};

// Phase objects (yung 6 Stages na Difficulty)
const gamePhases = [
    { level: 1, title: "Calm Start", theme: "Meadow", spawnRate: 2000, speed: 1500, pool: ["MOLE", "RABBIT"] },
    { level: 2, title: "Getting Busy", theme: "Meadow", spawnRate: 1500, speed: 1200, pool: ["MOLE", "RABBIT", "TRICKSTER"] },
    { level: 3, title: "Desert Heat", theme: "Desert", spawnRate: 1200, speed: 1000, pool: ["MOLE", "RABBIT", "ROBOT", "BOMB"] },
    { level: 4, title: "Tundra Chill", theme: "Tundra", spawnRate: 1000, speed: 800, pool: ["MOLE", "ROBOT", "TRICKSTER", "BOMB"] },
    { level: 5, title: "Final Frontier", theme: "Space", spawnRate: 800, speed: 600, pool: ["MOLE", "RABBIT", "ROBOT", "TRICKSTER", "BOMB"] },
    { level: 6, title: "Insane Mode", theme: "Space", spawnRate: 500, speed: 400, pool: ["ROBOT", "TRICKSTER", "BOMB"] }
];

// Power-up timers (Duration in milliseconds)
const powerUpTimers = {
    SHIELD: 5000,      // 5 seconds of hazard protection
    FREEZE: 3000,      // 3 seconds of slowed movement
    DOUBLE_POINTS: 7000 // 7 seconds of 2x score
};

/* ================================= */
/* MEMBER 1 - GAME LOGIC */
/* ================================= */

/*
Raymomd:
- Spawn system
- Hit detection
- Lives system
- Combo system
- Game states
- Timer system
*/

/* ================================= */
/* STORYLINE CONTROL (OPTIONAL) */
/* ================================= */



/* ================================= */
/* MEMBER 5 - INTEGRATION */
/* ================================= */

/*
Ylaiza:
- Connect HTML + JS
- Retry button
- Score tracking
- Browser testing
- Merge support
*/



/* ================================= */
/* INITIAL TEST */
/* ================================= */

console.log("Burrow Blitz Loaded Successfully");