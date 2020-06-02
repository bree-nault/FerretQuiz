const STORE =  [//1
  {
    question: "What is a group of ferrets called?",
    answers: [
      "A Clowder", 
      "A Business", 
      "A Scurry", 
      "A Rhumba"
    ],
    correctAnswer: "A Business"
  },
  //2
  {
    question: "A ferret’s diet makes them an…",
    answers: [
      "Omnivore",
      "Herbivore", 
      "Obligated Carnivore",
      "Carnivore"
    ],
    correctAnswer: "Obligated Carnivore"
  },
  //3
  {
    question: "Out of these four facts which is false?",
    answers: [
      "Ferrets are used to run wire through tunnels and pipes.", 
      "Ferrets sleep 14 – 18 hours a day.", 
      "Ferrets were domesticated for hunting.", 
      "Ferrets teeth continue to grow throughout their life."
    ],
    correctAnswer: "Ferrets teeth continue to grow throughout their life."
  },
  //4
  {
    question: "What Family are Ferrets part of?", 
    answers: [
      "Mustelidae", 
      "Cervidae", 
      "Leporidae", 
      "Elapidae"],
    correctAnswer: "Mustelidae"
  },
  //5
  {
    question: "What disease can ferrets catch and spread?",
    answers: [
      "The Common Cold", 
      "Influenza", 
      "Lyme Disease", 
      "Ebola"
    ],
    correctAnswer: "Influenza"
}
];

// when a user clicks on start quiz button 
function startQuiz() {
$('.startQuiz').on('click', '.startButton', function (event) {
  $('.startQuiz').hide();
  $('.currentQuestion').text(1);
  $('.questionBox').show();
  $('.questionBox').prepend(renderQuestion());
}); 
}

//variables to store the quiz score and question number information
let currentQuestion = 0;
let score = 0;

//template to generate each question
function renderQuestion() {
if (currentQuestion < STORE.length) {
  return createQuestion(currentQuestion);
} else {
  $('.questionBox').hide();
  finalScore();
  $('.currentQuestion').text(STORE.length);
}
}

//creates question form
function createQuestion(questionIndex) {
let formMaker = $(`<form>
  <fieldset>
    <legend class="questionText"><h2>${STORE[questionIndex].question}</h2></legend>
  </fieldset>
</form>`)

let fieldSelector = $(formMaker).find('fieldset');

STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
  $(`<label for="${answerIndex}">
      <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
      <span>${answerValue}</span>
    </label>
    `).appendTo(fieldSelector);
});
$(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
return formMaker;
}

//submits a selected answer and checks it against the correct answer
function submitAnswer() {
$('.questionBox').on('submit', function (event) {
  event.preventDefault();
  $('.questionBox').hide();
  $('.response').show();
  let selected = $('input:checked');
  let answer = selected.val();
  let correct = STORE[currentQuestion].correctAnswer;
  if (answer === correct) {
    correctAnswer();
  } else {
    wrongAnswer();
  }
});
}

//increments user score by one
function correctAnswer() {
$('.response').html(
  `<h3>Correct!</h3>
  <img src="images/ferretdance.gif" alt="ferret excitedly dancing" class="gif" >
  <p>You got this!</p>
    <button type="button" class="nextButton button">Next</button>`
);
updateScore();
}

function updateScore() {
score++;
$('.score').text(score);
}

// generates feedback for wrong answer
function wrongAnswer() {
$('.response').html(
  `<h3>Nope!</h3>
  <img src="images/ferretfail.gif" alt="ferret jumping to table but falling" class="gif">
  <p>Correct answer is:</p>
  <p>${STORE[currentQuestion].correctAnswer}</p>
  <button type="button" class="nextButton button">Next</button>`
);
}

// updates question number
function updateQuestionNumber() {
currentQuestion++;
$('.currentQuestion').text(currentQuestion + 1);
}

//generates the next question
function nextQuestion() {
$('.container').on('click', '.nextButton', function (event) {
  $('.response').hide();
  $('.questionBox').show();
  updateQuestionNumber();
  $('.questionBox form').replaceWith(renderQuestion());
});
}

//gives final score
function finalScore() {
$('.final').show();

const great = [
  'Great job!',
  'images/reading.jpg',
  'ferret sleeping in open book',
  'Take a break from studying.'
];

const good = [
  'Good job!',
  'images/ferrettongue.jpg',
  'ferret sticking tongue out',
  'You know a little something about ferrets!'
];

const bad = [
  'For shame!',
  'images/ferretsleeping.jpg',
  'ferret with sleeping folded up',
  `You should probably not show your face for awhile`
];

if (score >= 4) {
  array = great;
} else if (score < 4 && score >= 2) {
  array = good;
} else {
  array = bad;
}
return $('.final').html(
  `<h3>${array[0]}</h3>
    <img src="${array[1]}" alt="${array[2]}" class="images">
      <h3>Your score is ${score} correct out of ${STORE.length}</h3>
      <p class="sizeMe">${array[3]}</p>
      <button type="submit" class="restartButton button">Restart</button>`
);
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
$('.container').on('click', '.restartButton', function (event) {
  event.preventDefault();
  resetStats();
  $('.altBox').hide();
  $('.startQuiz').show();
});
}

//resets the quiz variables
function resetStats() {
score = 0;
currentQuestion = 0;
$('.score').text(0);
$('.currentQuestion').text(0);
}

//runs the functions
function handleQuizApp() {
startQuiz();
submitAnswer()
nextQuestion();
restartQuiz()
}

$(handleQuizApp);