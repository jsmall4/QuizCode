// global variables & constants
// interface
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElements = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

// timer
const startingTime = 1; // starting time 1 min
let time = startingTime * 60; // converting time to seconds
const timerEl = document.getElementById("timer"); // ref HTML id timer

// highscores
let currentQuestion = {};
let acceptance = true;
let score = 0;
let questionCounter = 0;
let remainingQuestions = [];
const incorrectPenalty = // look up how to do minus 10sec
  // when clicked execute fucnction to start game, and execute next question on click
  startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  startTimer(); // added to listen for click on start?
  setNext();
});

// call this function to start the game, on click hide the start button as the game has started, logic for shuffling questions. calls next question after answering current question
function startGame() {
  //   console.log("start");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNext();
  // startTimer();
}

// timer settings to start & reset timer func
function startTimer() {
  console.log("start timer"); // not logging until first question is answered
  timerEl = setInterval(startTimer, 1000); // issue here !!!!!!!! - execution of function continously - how often is going to call the function 1000 milliseconds = 1 sec
  // runs continous error - needs else statement? - but timer doesnt start??
  const minutes = Math.floor(time / 60); // coverting back to minutes, using math floor to round down to nearest integer
  let seconds = time % 60; // time is equal to 60 - 1min, but anything less is seconds
  seconds = seconds < 10 ? "0" + seconds : seconds; // ternary operator -- look up!! - like an if statement? - check condition ? do this : do that
  timerEl.innerHTML = `${minutes}:${seconds}`;

  time--;
}

function resetTimer() {}

// function to show next shuffled question
function setNext() {
  // console.log('setnext');
  resetQuestion();
  //   console.log('resetQuestion')
  showQuestion(shuffledQuestions[currentQuestionIndex]);
  //   console.log('showQuestion')
}

// settings to get next question
function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElements.appendChild(button);
  });
}

// function to reset the display for the next question included putting the body back to a neutral color
function resetQuestion() {
  clearQuestion(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElements.firstChild) {
    answerButtonsElements.removeChild(answerButtonsElements.firstChild);
  }
}

//  function for applying logic to picking a correct or wrong answer from a shuffled array of questions & answers. Also the ability to restart the quiz.
function selectAnswer(e) {
  //   console.log("selectAnswer");
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setQuestion(document.body, correct);
  Array.from(answerButtonsElements.children).forEach((button) => {
    setQuestion(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

// settings for applying the correct or wrong color scheme when the user picks and answer
function setQuestion(elememt, correct) {
  clearQuestion(elememt);
  if (correct) {
    elememt.classList.add("correct");
  } else {
    elememt.classList.add("wrong");
  }
}

// resets colors back to normal when next question is called
function clearQuestion(elememt) {
  elememt.classList.remove("correct");
  elememt.classList.remove("wrong");
}

// array of questions to be called
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "Higher Type Message Linguistics", correct: false },
      { text: "Hungry Tigers Might Levitate", correct: false },
      { text: "Hollow Trees May Lean", correct: false },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Central Standard Sample", correct: false },
      { text: "Credit Super Standard", correct: false },
      { text: "Cascading Style Sheet", correct: true },
      { text: "Cancel Send System", correct: false },
    ],
  },
  {
    question:
      "According to w3schools, What's the worlds most popular popular programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Python", correct: false },
    ],
  },
  {
    question:
      "Which is the correct syntax for a block of code declared a variable?",
    answers: [
      { text: "funtion", correct: false },
      { text: "const", correct: false },
      { text: "var", correct: false },
      { text: "let", correct: true },
    ],
  },
];
