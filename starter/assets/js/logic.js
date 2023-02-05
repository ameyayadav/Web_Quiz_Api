const quizButton =  document.querySelector("#start");
const quesButton = document.querySelector ("#questions");
const questTitle = document.querySelector ("#question-title");
const hideButton = document.querySelector(".hide");
const choicesButton = document.querySelector("#choices");
const screenButton = document.querySelector("#end-screen");
const subButton = document.querySelector("#submit");
const timeButton = document.querySelector("#time");
const intialsUser =  document.querySelector("#intials");
const screenEl =  document.querySelector("#start-screen");
const resultEl =  document.querySelector("#ans-result");
const resEl = document.querySelector("#result");
const feedbackEL =  document.querySelector("#feedback");
const choiceList = choicesButton.childNodes;
const finalEl = document.querySelector("#fianl-score");

 
let timer;
let currentQuestions = 0;
let timeLeft = 60;
var isCorrect = false;
let userInput = "";
let correctCounter = 0;
// quizButton.addEventListener("click");


// function startQuiz() {
//     quizButton.style.display = "none";
//     quesbutton.classList.remove("hide");
//     showQuestion();
//     timeButton.textContent = timeLeft;
//  timer = setInterval(function() {
//     timeLeft--;
//     timeButton.textContent = 60;

//     if (timeLeft === 0) {
//       endQuiz();
//     }
//   }, 1000);
// }
// function showQuestion() {
//     if (currentQuestions === totalQuestions.length) {
//       endQuiz();
//       return;
//     }
// }

function hideScreen() {
  screenEl.setAttribute("class", "hide");
}

// this function starts the question


function startedQuiz() {
  // hide the start screen
  hideScreen();
  // start the timer
  startsTimer();
  // show current question
  showQuestion(currentQuestions);
  console.log("Current question is [" + currentQuestions + "]");
  
}

// function showQuestion(i) {
//   questbutton.classList.add("show");
//   questbutton.innerHTML = totalQuestions[i].question;
//   Object.entries(totalQuestions[i].answers).forEach(([key, value]) => {
//       const userChoice = document.createElement("p");
//       userChoice.innerHTML = `${key}: ${value}`;
//       choicesButton.appendChild(userChoice);
//   });
//   choiceList.forEach((choice, index) => {
//     choice.addEventListener("click",userChoice);
//   });
// }

function showQuestion(i){
  quesButton.setAttribute("class", "show");
  questTitle.textContent = totalQuestions[i].questions;
  for(const [key, value] of Object.entries(totalQuestions[i].answers)) {
      //console.log(key + ": " + value);
      var choiceBlock = document.createElement("p");
      choiceBlock.textContent = key + ": " + value;
      choicesButton.appendChild(choiceBlock);
  }
  for(let i = 0; i < choiceList.length; i++) {
    choiceList[i].addEventListener("click", clickOption)  
  }
}
// to show the end screen

function endScreen() {
  quesButton.classList.add("hide");
  resultEl.classList.add("hide");
  screenButton.classList.add("show");
  finalEl.innerHTML = correctCounter;
}
// clear the questions
function clearpreviousQuestion(){
  quesButton.textContent = "";
  choicesButton.textContent = "";

} 

function userChoice() {
  if(userInput === totalQuestions[currentQuestions].correctAnswer) {
      console.log("You choose the right answer!");
      correctCounter++;
      isCorrect = true;

  } else {
      
      console.log("You choose the wrong answer!");
      isCorrect = false;
      // if the answer is wrong, 10 seconds will be substracted from the timer
      timerCount = timeLeft - 10;
      
  }
}
// created function to dsiplay result

function displayResult() {
  resultEl.classList.add("result");
  resEl.innerHTML = isCorrect ? "Correct answer!" : "Wrong answer!";
}

function hideResult() {
 resultEl.setAttribute("class", "hide")
}


function clickOption(event) {
  let quizChoice = event.target.textContent[0];
  console.log(`User choose ${quizChoice}`);
  console.log(`The right answer is ${totalQuestions[currentQuestions].correctAnswer}`);

  userChoice();
  clearpreviousQuestion();
  displayResult();

  if (currentQuestions < totalQuestions.length - 1) {
    currentQuestions++;
      endScreen();
      console.log(`Current question is No. ${currentQuestions}`);
  } else {
      setTimeout(hideResult, 1500);
      currentQuestions++;
      showQuestion(currentQuestions);
      console.log(`Current question is [${currentQuestions}]`);
  }
}
// function is created to set the timer and time interval

function startsTimer() {
  // Sets timer
  timer = setInterval(function() {
    timeLeft--;
    timeButton.textContent = timeLeft;
    if (timeLeft > 0 && currentQuestions === totalQuestions.length) {
      // Time runs out it clears the interval
     clearInterval (timer)
     timeButton.textContent = 0;
    }
    
    if(timeLeft <= 0) {
      clearInterval(timer);
      timeButton.textContent = 0;
      endScreen();
    }
  }, 1000);
}

// checking checkInitials

function checkInitials(input) {
  let pattern = /^[A-Z]+$/;
  let isValid = pattern.test(input.value);
  if (!isValid) {
    alert("Sorry, only capital characters valid!");
  }
  return isValid;
}

function saveScore(event) {
  event.preventDefault();

  let isValidInitials = checkInitials(intialsUser);
  if (!isValidInitials) {
    return;
  }


let newScore = {
  initials: intialsUser.value,
  score: correctCounter
};

let highScoresArr = JSON.parse(localStorage.getItem("highScores")) || [];
let duplicateIndex = highScoresArr.findIndex(score => score.initials === newScore.initials);

if (duplicateIndex === -1) {
  highScoresArr.push(newScore);
} else {
  highScoresArr[duplicateIndex] = newScore.score > highScoresArr[duplicateIndex].score
    ? newScore
    : highScoresArr[duplicateIndex];
}

localStorage.setItem("highScores", JSON.stringify(highScoresArr));
}
screenButton.setAttribute("class", "hide");
feedbackEL.setAttribute("class", "feedback show");

quizButton.addEventListener("click",startedQuiz);

