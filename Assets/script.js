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
const rightA = document.getElementById("rezRight")
const wrongA = document.getElementById("rezWrong")
//end screen locations
const endCard = document.getElementById("endForm")
const endScore = document.getElementById("score")
const inputName = document.getElementById("inputName")
const scoreSend = document.getElementById("sendName")
//global variables for this page
let qNum = 0
let nScore = 5

//Listeners
stBtn.addEventListener("click", startQuiz);
scoreSend.addEventListener("click", addScore);
qCard.addEventListener("click", parseAnswer);

//Start button: hide splash card, show question card, start timer
function startQuiz() {
    event.preventDefault()
    titleCard.classList.add("d-none")
    timeBar.parentElement.classList.remove("d-none")
    qCard.classList.remove("d-none")
    startClock()
    quizCards()
}

//Function to start timer, holds interval for countdown
function startClock() {
    let t = 75
    let tPercent = 100
    let countdown = setInterval(function () {
        t--
        timeText.innerHTML = t
        tPercent = t / 75 * 100
        timeBar.setAttribute("aria-valuenow", t)
        timeBar.style = "width:" + tPercent + "%"
        if (t <= 0) {
            clearInterval(countdown)
            gameOver()
        }
    }, 1000)
}
//Function to display next question
function quizCards() {
    //If this is the first question, shuffle question array
    if (qNum == 0) {
        // shuffle(qList)
        console.log(qList)
    }
    //Display question
    qText.textContent = qList[qNum].question
    //Get object of question's answers
    let qAnswers = qList[qNum].answers
    qAnswers = Object.entries(qAnswers)
    for (prop of qAnswers) {
        console.log(prop)
        let ansOption = document.createElement("button")
        ansOption.setAttribute("class", "btn btn-info my-1 d-block px-3")
        ansOption.setAttribute("ans", prop[0])
        ansOption.textContent = prop[1]
        qCard.appendChild(ansOption)
    }
    //Increment question number
    qNum++
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
function parseAnswer() {

}

//Ask for initials
function gameOver() {
    qCard.classList.add("d-none")
    timeBar.parentElement.classList.add("d-none")
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
        var scoreList = JSON.parse(localStorage.getItem(scoreBank))
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