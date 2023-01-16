let startContent = document.querySelector(".startContent");
let endQuestion = document.querySelector(".endQuestion");
let nextQuestion = document.querySelector(".next-question");
let studentNameInput = document.querySelector(".student-name");
let startTest = document.querySelector(".start-test");
let questions = document.querySelector(".questions");
let question = document.querySelector(".question");
let StopQuestion = document.querySelector(".stop-question");
let variants = document.querySelector(".variants");
let studentNameTester = document.querySelector(".name");
let questionIdx = 0;
let point = 0;
let isYourAnswerCorrect;

// --------------------------------
// --------------------------------
// --------------------------------

let tens = 0;
let seconds = 0;
let Interval;
let running = false;
let interval2;
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");

function start() {
  clearInterval(Interval);
  if (!running) {
    running = true;
    Interval = setInterval(startTimer, 1000);
  } else {
    running = false;
  }
}
function reset() {
  clearInterval(Interval);
  running = false;
}
function startTimer() {
  tens++;
  if (tens <= 9) {
    appendTens.innerHTML = `0${tens}`;
  }

  if (tens > 9) {
    appendTens.innerHTML = tens;
  }

  if (tens > 59) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + tens;
  }

  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
}

// --------------------------------
// --------------------------------
// --------------------------------

window.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    startQuestion();
  }
});

startTest.addEventListener("click", () => {
  startQuestion();
});

function startQuestion() {
  let studentName = studentNameInput.value;
  if (!studentName) {
    studentNameInput.placeholder = "Input Empty!";
  } else {
    startContent.classList.add("hide");
    questions.classList.remove("hide");
    start();
    renderQuestion();
  }
}

let conguralations = document.querySelector(".conguralations");
let resultQuestion = document.querySelector(".result-question");
let againTestBtn = document.querySelector(".again-test");
let spinnerTest = document.querySelector(".spinner-test");

const spinner = (time) => {
  questions.classList.add("hide");
  spinnerTest.classList.remove("hide");
  setTimeout(() => {
    console.log("Kirdim...");
    questions.classList.remove("hide");
    spinnerTest.classList.add("hide");
  }, 1000);
};

againTestBtn.addEventListener("click", tryAgain);
function renderQuestion() {
  isYourAnswerCorrect = undefined;
  if (questionIdx == data.length) {
    reset();
    let isLevel = "";
    level.forEach((item) => {
      if (item.min_score <= point && item.max_score > point) {
        isLevel = item.level_name;
      }
    });
    questions.classList.add("hide");
    endQuestion.classList.remove("hide");
    conguralations.textContent = `${studentNameInput.value} , Your level is ${isLevel}`;
    resultQuestion.textContent = `${point} / ${data.length}`;
  } else {
    studentNameTester.classList.remove("hide");
    studentNameTester.textContent = `${studentNameInput.value.slice(0, 14)}`;
    spinner();
    variants.textContent = "";
    let oneQuestion = data[questionIdx];
    question.textContent = `Q${oneQuestion.id}. ${oneQuestion.question}`;
    oneQuestion.answers.forEach((item) => {
      let NewButton = document.createElement("button");
      NewButton.className = "variant";
      NewButton.textContent = item.answer;
      NewButton.dataset.id = item.correct;
      if (questionIdx == data.length - 1) {
        nextQuestion.textContent = "Finish Test!";
      } else {
        nextQuestion.textContent = "Next Question";
      }
      variants.append(NewButton);
    });
    let variant = document.querySelectorAll(".variant");
    variant.forEach((item) => {
      item.addEventListener("click", () => {
        buttonDisabled(variant);
        buttonActived(item);
        isYourAnswerCorrect = item.dataset.id;
      });
    });
  }
}

let modal_stop = document.querySelector(".question-stop-madal");
let noConfirm = document.querySelector(".no__confirm");
let yesConfirm = document.querySelector(".yes__confirm");

noConfirm.addEventListener("click", () => {
  modal_stop.classList.add("question-stop-madal-disabled");
});
yesConfirm.addEventListener("click", () => {
  questionIdx = data.length;
  modal_stop.classList.add("question-stop-madal-disabled");
  renderQuestion();
});

StopQuestion.addEventListener("click", () => {
  modal_stop.classList.remove("question-stop-madal-disabled");
});

function tryAgain() {
  appendTens.innerHTML = "00";
  appendSeconds.innerHTML = "00";
  tens = 0;
  seconds = 0;
  point = 0;
  questionIdx = 0;
  startContent.classList.remove("hide");
  endQuestion.classList.add("hide");
  questions.classList.add("hide");
  studentNameInput.value = "";
  studentNameTester.classList.add("hide");
}
function buttonDisabled(items) {
  items.forEach((item) => {
    item.classList.remove("active");
  });
}
function buttonActived(item) {
  item.classList.add("active");
}
nextQuestion.addEventListener("click", () => {
  if (!(isYourAnswerCorrect == undefined)) {
    if (isYourAnswerCorrect === "true") {
      point += 1;
      isYourAnswerCorrect = false;
    }

    console.log(point);

    questionIdx += 1;
    renderQuestion();
  }
});
