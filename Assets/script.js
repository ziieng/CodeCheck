//Declare locations, global variables (questions are at bottom of js)
//title screen locations
const titleCard = document.getElementById("titlePage")
const stBtn = document.getElementById("startBtn")
//header/timer locations
const timeText = document.getElementById("timeLeft")
const timeBar = document.getElementById("timeProg")
//quiz screen locations
const qCard = document.getElementById("quizBody")
const qText = document.getElementById("questionText")
const qChoices = document.getElementById("answerZone")
const resArea = document.getElementById("quizResult")
const resText = document.getElementById("result")
//end screen locations
const endCard = document.getElementById("endForm")
const endScore = document.getElementById("score")
const inputName = document.getElementById("inputName")
const scoreSend = document.getElementById("sendName")
//global variables for this page
let qNum = 0
let nScore = 1
let time = 75
let xFade = 1

//Listeners
stBtn.addEventListener("click", startQuiz);
scoreSend.addEventListener("click", addScore);
qChoices.addEventListener("click", function () {
    var element = event.target
    parseAnswer(element)
});

//Start button: hide splash card, show question card, start timer
function startQuiz() {
    titleCard.classList.add("d-none")
    timeBar.parentElement.classList.remove("invisible")
    qCard.classList.remove("d-none")
    resArea.classList.add("invisible")
    startClock()
    quizCards()
}

//Function to start timer, holds interval for countdown
function startClock() {
    let tPercent = 100
    let countdown = setInterval(function () {
        time--
        timeText.innerHTML = time
        tPercent = time / 75 * 100
        timeBar.setAttribute("aria-valuenow", time)
        timeBar.style = "width:" + tPercent + "%"
        if (time <= 0) {
            clearInterval(countdown)
            timeText.innerHTML = "0"
            gameOver()
        }
    }, 1000)
}
//Function to display next question
function quizCards() {
    //If this is the first question, shuffle question array
    if (qNum == 0) {
        shuffle(qList)
    }
    //Display question
    qText.textContent = qList[qNum].question
    //Get object of question's answers
    let qAnswers = qList[qNum].answers
    qAnswers = Object.entries(qAnswers)
    for (prop of qAnswers) {
        let ansOption = document.createElement("button")
        ansOption.setAttribute("class", "btn btn-info my-1 d-block px-3")
        ansOption.setAttribute("ans", prop[0])
        ansOption.textContent = prop[1]
        qChoices.appendChild(ansOption)
    }
}

//Shuffle array function from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//Check answer, call to show next question
function parseAnswer(element) {
    let ansPick = element.getAttribute("ans")
    console.log(ansPick)
    if (ansPick == qList[qNum].correctAnswer) {
        nScore += 3
        resArea.classList.remove("invisible")
        resText.textContent = "Correct!"
        fadeHandler()
    } else {
        time -= 6
        resArea.classList.remove("invisible")
        resText.textContent = "Wrong!"
        fadeHandler()
    }
    qChoices.innerHTML = ""
    //Increment question number
    qNum++
    //If we're out of questions, start over
    if (qList[qNum] == null) {
        qNum = 0
    }
    quizCards()
}

//Utility function to handle fading the right/wrong indicator
function fadeHandler() {
    xFade = 1
    let fTime = setInterval(function () {
        if (xFade <= 0) {
            resArea.classList.add("invisible")
            clearInterval(fTime)
        }
        xFade--
    }, 500)
}

//Ask for initials
function gameOver() {
    qCard.classList.add("d-none")
    timeBar.parentElement.classList.add("invisible")
    endCard.classList.remove("d-none")
    endScore.value = nScore
}
//Report high score to storage
function addScore() {
    event.preventDefault()
    if (localStorage.getItem('scoreBank') === null) {
        localStorage.setItem('scoreBank', '{}');
        var scoreList = []
    } else {
        var scoreList = JSON.parse(localStorage.getItem('scoreBank'))
    }
    let newScore = {
        score: nScore,
        name: inputName.value
    };
    scoreList.push(newScore)
    scoreList = JSON.stringify(scoreList)
    localStorage.setItem("scoreBank", scoreList)
    //Kick to scoreboard page
    location.replace("scoreboard.html")
}
//Question Array!
var qList = [{
        question: "Okay but does it work tho",
        answers: {
            a: "Yes",
            b: "No",
            c: "No",
            d: "No"
        },
        correctAnswer: "a"
    },
    {
        question: "How bout now",
        answers: {
            a: "No",
            b: "No",
            c: "Yes",
            d: "No"
        },
        correctAnswer: "c"
    },
]