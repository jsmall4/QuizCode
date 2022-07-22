// global variables
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElements = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

// when clicked execute fucnction to start game, and execute next question on click
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
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
}

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
