//Declare locations, global variable for score list
const scoreArea = document.getElementById("scoreList")
const backBtn = document.getElementById("backBtn")
const resetBtn = document.getElementById("resetBtn")
let scoreList = []
//Pull scores from storage, if they exist
if (localStorage.getItem('scoreBank') === null) {
    scoreArea.innerHTML = "<p> </p>"
} else {
    scoreList = JSON.parse(localStorage.getItem('scoreBank'))
    printScores()
}

//Print existing scores to page
function printScores() {
    //Sort highest to lowest
    scoreList.sort(function (a, b) {
        return b.score - a.score;
    })
    //Loop to print each on the page
    for (x of scoreList) {
        let scoreRow = document.createElement("p")
        scoreRow.textContent = x.score + " - " + x.name
        scoreArea.appendChild(scoreRow)
    }
}

//Listeners
resetBtn.addEventListener("click", clearScores);
backBtn.addEventListener("click", function () {
    //Kick to quiz page
    location.replace("index.html")
});

//Clear existing scores
function clearScores() {
    scoreList = ""
    localStorage.removeItem('scoreBank')
    scoreArea.innerHTML = "<p> </p>"
}