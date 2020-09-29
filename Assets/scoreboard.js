//Declare locations, global variable for score list
const scoreArea = document.getElementById("scoreList")
const backBtn = document.getElementById("backBtn")
const resetBtn = document.getElementById("resetBtn")
let scoreList = []
//Pull scores from storage, if they exist
if (localStorage.getItem('scoreBank') === null) {
    scoreArea.innerHTML = '<p class="text-muted font-italic">No scores saved.</p>'
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
    //Print labels for name/score
    let scoreRow = document.createElement("row")
    scoreArea.appendChild(scoreRow)
    let nameCol = document.createElement("div")
    nameCol.classList.add("col-6", "text-right", "font-weight-bold", "float-left", "pb-2")
    nameCol.textContent = "Name"
    scoreRow.appendChild(nameCol)
    let scoreCol = document.createElement("div")
    scoreCol.classList.add("col-6", "text-left", "font-weight-bold", "float-left", "pb-2")
    scoreCol.textContent = "Score"
    scoreRow.appendChild(scoreCol)

    //Loop to print each score on the page
    for (x of scoreList) {
        let scoreRow = document.createElement("row")
        scoreArea.appendChild(scoreRow)
        let nameCol = document.createElement("div")
        nameCol.classList.add("col-6", "text-right", "float-left", "pb-2")
        nameCol.textContent = x.name
        scoreRow.appendChild(nameCol)
        let scoreCol = document.createElement("div")
        scoreCol.classList.add("col-6", "text-left", "float-left", "pb-2")
        scoreCol.textContent = x.score
        scoreRow.appendChild(scoreCol)
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
    scoreArea.innerHTML = '<p class="text-muted font-italic">No scores saved.</p>'
}