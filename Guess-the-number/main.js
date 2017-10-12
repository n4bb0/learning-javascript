let randomNumber = Math.ceil(Math.random()*100);

let guessField = document.querySelector('.guessField');
let guessSubmit = document.querySelector('.guessSubmit');

let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHigh = document.querySelector('.lowOrHigh');

let resetGame = document.querySelector('.resetGame');

let guessCount = 1;

guessField.focus();

guessSubmit.addEventListener('click', checkGuess);

function checkGuess() {
  let numberInput = Number(guessField.value);
  if (numberInput === randomNumber) {
    lastResult.textContent = 'SUCCESS !!!';
    lastResult.style.backgroundColor = 'green';
    lowOrHigh.textContent = '';
    guessSubmit.disabled = 'true';
    guessField.disabled = 'true';
  }
  else if (guessCount === 10) {
    lastResult.textContent = '! ! ! GAME OVER ! ! !';
    lastResult.style.backgroundColor = 'red';
    lowOrHigh.textContent = '';
    guessSubmit.disabled = true;
    guessField.disabled = true;
  }
  else {
    lastResult.textContent = 'WRONG ! Try Again';
    lastResult.style.backgroundColor = 'red';
    if (numberInput>randomNumber) {
      lowOrHigh.textContent = 'guess lower';
    }
    else {
      lowOrHigh.textContent = 'guess higher';
    }
  }
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ' +numberInput + ' ';
  }
  else {
    guesses.textContent += numberInput + ' ';
  }
  guessCount++
  guessField.focus();
  guessField.value = '';
}

resetGame.addEventListener('click', restart);

function restart() {
  randomNumber = Math.ceil(Math.random()*100);
  lastResult.textContent = '';
  lowOrHigh.textContent = '';
  guesses.textContent = '';
  guessSubmit.disabled = false;
  guessField.disabled = false;
  lastResult.style.backgroundColor = null;
}
