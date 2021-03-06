const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let reiniciar = false;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('dblclick', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
    if(reiniciar)
    {
        location.reload();
    }
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    
    button.addEventListener('dblclick', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Haga doble click para terminar'
  reiniciar= true;
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Cual de estos es un nombre?  (Haga doble click para seleccionar la respuesta)',
    answers: [
      { text: 'josue', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Cual es un nombre de mujer?  (Haga doble click para seleccionar la respuesta)',
    answers: [
      { text: 'Daniel', correct: false },
      { text: 'Daniela', correct: true },
      { text: 'Emmanuel', correct: false },
      { text: 'Roberto', correct: false }
    ]
  },
  {
    question: 'cual de estos es un color?  (Haga doble click para seleccionar la respuesta)',
    answers: [
      { text: '1', correct: false },
      { text: 'rojo', correct: true },
      { text: '7', correct: false },
      { text: '9', correct: false }
    ]
  }
 
]