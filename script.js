const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');

let score = 0;
let currentHole = null;

// random hole appears
function showMole() {
    if (currentHole) {
        currentHole.classList.remove('active');
    }

    const index = Math.floor(Math.random() * holes.length);
    currentHole = holes[index];
    currentHole.classList.add('active');
}

// click logic
holes.forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === currentHole) {
            score++;
            scoreDisplay.textContent = score;
            hole.classList.remove('active');
            currentHole = null;
        }
    });
});

// loop mole appearance
setInterval(showMole, 800);