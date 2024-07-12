const form = document.querySelector(".form");
const inputField = document.querySelector(".guessField");
const submitBtn = document.querySelector(".guessSubmit");
const previousGuesses = document.querySelector(".guesses");
const result = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const restartBtn = document.querySelector(".restart-game");
let randomNumber;
let round = 1;

function createRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function handleResult(userInput) {
  if (userInput === randomNumber) {
    result.style.backgroundColor = "green";
    result.textContent = "Congratulations! You got it right!";
  } else {
    result.style.backgroundColor = "red";
    result.textContent = "Wrong!";
  }
}

function baseConfig(userInput) {
  if (round === 1) {
    previousGuesses.textContent = "Previous guesses:";
    lowOrHi.textContent = "Last guess was to ";
  }
  previousGuesses.textContent = `${previousGuesses.textContent} ${userInput}`;
}

function handleLowOrHigh(userInput) {
  const lowInput = "Last guess was too low!";
  const highInput = "Last guess was too high!";

  if (userInput > randomNumber) {
    lowOrHi.textContent = highInput;
  } else if (userInput < randomNumber) {
    lowOrHi.textContent = lowInput;
  } else {
    lowOrHi.textContent = "You are the winner!";
    restartBtn.style.display = "block";
  }
}

function rightOrWrong(userInput) {
  baseConfig(userInput);
  handleResult(userInput);
  handleLowOrHigh(userInput);
  handleRound();

  inputField.value = "";
  round++;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  rightOrWrong(Number(inputField.value));
});

restartBtn.addEventListener("click", restartGame);

function start() {
  randomNumber = createRandomNumber();
}

function restartGame() {
  restartBtn.style.display = "none";
  previousGuesses.textContent = "";
  result.textContent = "";
  lowOrHi.textContent = "";
  result.style.backgroundColor = "white";
  submitBtn.disabled = false;
  round = 1;
  start();
}

function handleRound() {
  if (round >= 10) {
    restartBtn.style.display = "block";
    submitBtn.disabled = true;
    lowOrHi.textContent = "You ran out of time!!!!";
  }
}

start();
