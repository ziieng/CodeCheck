//Declare locations, global variables
const stBtn = document.getElementById("startBtn")
const titleCard = document.getElementById("titlePage")
const qCard = document.getElementById("quizBody")
const endCard = document.getElementById("endForm")
const timeText = document.getElementById("timeLeft")
const timeBar = document.getElementById("timeProg")
const qText = document.getElementById("questionText")
const rightA = document.getElementById("rezRight")
const wrongA = document.getElementById("rezWrong")
const scoreSend = document.getElementById("sendName")
const inputName = document.getElementById("inputName")
let qNum = 0
let nScore = 5

//Start button: hide splash card, show question card, start timer
function startQuiz() {
    titleCard.classList.add("d-none")
    timeBar.parentElement.classList.remove("d-none")
    qCard.classList.remove("d-none")
    startClock()
    quizCards()
}

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
//Do a quiz
function quizCards() {
    shuffle(qList)
    
}

//Ask for initials
function gameOver() {
    qCard.classList.add("d-none")
    timeBar.parentElement.classList.add("d-none")
    endCard.classList.remove("d-none")
}
//Report high score to storage
function addScore() {
    let scoreList = JSON.parse(localStorage.getItem(scoreBank))
    if (scoreList != "") {
        let newScore = {
            score: nScore,
            name: inputName.value
        };
        scoreList.push(newScore)
        scoreList = JSON.stringify(scoreList)
        localStorage.setItem("scoreBank", scoreList)
    } else {
        scoreList = {
            score: nScore,
            name: inputName.value
        }
        scoreList = JSON.stringify(scoreList)
        localStorage.setItem("scoreBank", scoreList)
    }
    //Kick to scoreboard page
    location.replace("scoreboard.html")
}


//Listeners
stBtn.addEventListener("click", startQuiz);
scoreSend.addEventListener("click", addScore);

//Question Array!
const qList = [{
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