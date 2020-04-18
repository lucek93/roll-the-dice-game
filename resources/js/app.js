let score;
let currentScore;
let activePlayer;
let playingGame = false;
let finalScore;

const dice = document.querySelector('.dice');

const startBtn = document.querySelector('.btn-new');
const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');

const score1 = document.getElementById('score-1');
const score2 = document.getElementById('score-2');
const currentScore1 = document.getElementById('current-1');
const currentScore2 = document.getElementById('current-2');

const input = document.querySelector('.final-score');

dice.style.display = 'none';

// Initialization of the game
function initialization() {
    score = [0, 0];
    currentScore = [0, 0];
    score1.textContent = 0;
    score2.textContent = 0;
    activePlayer = 0;
    playingGame = true;
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-2-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-2-panel').classList.remove('winner');

    document.getElementById('name-1').textContent = 'Player 1';
    document.getElementById('name-2').textContent = 'Player 2';

    if (input.value > 0) {
        finalScore = input.value;
    } else {
        finalScore = 50;
    }
}

initialization();

// Roll dice button
rollBtn.addEventListener('click', function () {
    if (playingGame) {
        const randomNumber = Math.floor(Math.random() * 6) + 1;

        dice.src = `resources/images/dice-${randomNumber}.png`;
        dice.style.display = 'block';

        document.getElementById(`current-${activePlayer + 1}`).textContent = currentScore[activePlayer] += randomNumber;

        if (randomNumber === 1) {
            document.getElementById(`current-${activePlayer + 1}`).textContent = currentScore[activePlayer] = 0;
            nextPlayer();
        }
    }
});

// Hold points button
holdBtn.addEventListener('click', function () {
    if (playingGame) {
        document.getElementById(`score-${activePlayer + 1}`).textContent = score[activePlayer] += currentScore[activePlayer];

        document.getElementById(`current-${activePlayer + 1}`).textContent = currentScore[activePlayer] = 0;

        if (score[activePlayer] >= finalScore) {
            document.querySelector('.dice').style.display = 'none';
            document.querySelector(`#name-${activePlayer + 1}`).textContent = 'Winner!';
            document.querySelector(`.player-${activePlayer + 1}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer + 1}-panel`).classList.remove('active');
            playingGame = false;
        } else {
            nextPlayer();
        }
    }
});

// New game button
startBtn.addEventListener('click', function () {
    initialization();
    input.value = 0;
});

// Next player function
function nextPlayer() {
    dice.style.display = 'none';

    if (activePlayer === 0) {
        activePlayer = 1;
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-2-panel').classList.toggle('active');

    } else {
        activePlayer = 0;
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.player-2-panel').classList.toggle('active');
    }
}