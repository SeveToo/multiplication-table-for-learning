const timeFill = document.querySelector(".timeFill");
const nr1 = document.querySelector(".nr1");
const nr2 = document.querySelector(".nr2");
const correct = document.querySelector(".correct .value");
const wrong = document.querySelector(".wrong .value");
const options = document.querySelector(".options button");
const restart = document.querySelector(".restart");
const InputBox = document.querySelector(".InputBox input");
const body = document.querySelector("body");

let secPerRound = 5;
let availableNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let num1, num2;
let correctCounter = 0;
let wrongCounter = 0;
let correctAnswerIs;
let SetTimeOut;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNumbers() {
  num1 = availableNumbers[rand(0, availableNumbers.length - 1)];
  num2 = availableNumbers[rand(0, availableNumbers.length - 1)];
  correctAnswerIs = num1 * num2;
  nr1.textContent = num1;
  nr2.textContent = num2;
  timeFill.classList.remove("timeFillFull");
  setTimeout(() => {
    timeFill.classList.add("timeFillFull");
  }, 1);
}

function restartPoints() {
  correctCounter = 0;
  wrongCounter = 0;
  updatePoints();
}

function updatePoints() {
  correct.textContent = correctCounter;
  wrong.textContent = wrongCounter;
}

function inputFocus() {
  InputBox.focus();
}

function startGame() {
  randomNumbers();
  restartPoints();
  inputFocus();
  clearTimeout(SetTimeOut);
  SetTimeOut = setTimeout(checkAnswer, secPerRound * 1000);
}
startGame();

restart.onclick = () => {
  startGame();
};

function nextRound() {
  randomNumbers();
  inputFocus();
  clearTimeout(SetTimeOut);
  SetTimeOut = setTimeout(checkAnswer, secPerRound * 1000);
  InputBox.value = "";
}

function checkAnswer() {
  if (InputBox.value != correctAnswerIs) wrongCounter++;
  else correctCounter++;
  updatePoints();
  nextRound();
}

body.addEventListener("keydown", function (el) {
  if (el.key == "Enter" && InputBox.value != "") checkAnswer();
});
