// Event Listeners
//
//
document.querySelector("button").addEventListener("click", gradeQuiz);

// Global Variables
//
//
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ5Choices();
displayQ9Choices();


// Functions
//
//
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i=0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += `<input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
            value = "${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
}

function displayQ5Choices() {
    let q5ChoicesArray = ["Kansas", "Missouri", "Oklahoma", "Colorado"];
    q5ChoicesArray = _.shuffle(q5ChoicesArray);
    for (let i=0; i < q5ChoicesArray.length; i++) {
        document.querySelector("#q5Choices").innerHTML += `<input type="checkbox" name="q5" id= "${q5ChoicesArray[i]}"
            value = "${q5ChoicesArray[i]}"> <label for="${q5ChoicesArray[i]}"> ${q5ChoicesArray[i]}</label>`;
    }
}

function displayQ9Choices() {
    let q9ChoicesArray = [
        { id: "pointPleasant", label: "Point Pleasant, West Virginia" },
        { id: "lakeChamplain", label: "Lake Champlain, Vermont" },
        { id: "bishopville", label: "Bishopville, South Carolina" },
        { id: "lakeOkanagan", label: "Lake Okanagan, Washington" }
    ];
    q9ChoicesArray = _.shuffle(q9ChoicesArray);
    for (let i = 0; i < q9ChoicesArray.length; i++) {
        document.querySelector("#q9Choices").innerHTML += `
            <input type="checkbox" name="q9" id="${q9ChoicesArray[i].id}" value="${q9ChoicesArray[i].label}">
            <label for="${q9ChoicesArray[i].id}">${q9ChoicesArray[i].label}</label>
        `;
    }
}



function isFormValid() {
    let isValid = true;
    if(document.querySelector("#q1").value == "") {
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
}

function rightAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='Checkmark'>";
    score += 10;
}

function wrongAnswer(index) {
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
    console.log("Grading quiz…");
    document.querySelector("#validationFdbk").innerHTML = ""; // resets validation feedback
    if (!isFormValid()) {
        return;
    }

    // Variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    let q7Response = document.querySelector("#q7").value.toLowerCase();
    let q8Response = document.querySelector("#q8").value;
    let q9Response = document.querySelector("input[name=q9]:checked").value;
    let q10Response = document.querySelector("input[name=q10]:checked")?.value || "";



    console.log(q1Response);
    console.log(q2Response);
    console.log(q6Response);



    // Grading question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }

    // Grading Question 2
    if(q2Response == "mo") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }

    // Grading Question 3
    if(document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked && !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }

    // Grading Question 4
    if(q4Response == "Rhode Island") {
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }

    // Grading Question 5
    if(document.querySelector("#Kansas").checked && document.querySelector("#Missouri").checked && !document.querySelector("#Colorado").checked && !document.querySelector("#Oklahoma").checked) {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }

    // Grading question 6
    if (q6Response == "vermont") {
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }

    // Grading question 7
    if (q7Response == "maine") {
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }

    // Grading Question 8
    if(q8Response == "ys") {
        rightAnswer(8);
    }
    else {
        wrongAnswer(8);
    }

    // Grading Question 9
    if (
    document.querySelector("#pointPleasant").checked &&
    document.querySelector("#lakeChamplain").checked &&
    document.querySelector("#bishopville").checked &&
    document.querySelector("#lakeOkanagan").checked
)   {
        rightAnswer(9);
    }
    else {
        wrongAnswer(9);
    }

    // Grading Question 10 (True/False)
    if (q10Response === "true") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }


    
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = (`Total Attempts: ${++attempts}`);
    localStorage.setItem("total_attempts", attempts);

    if(score ==100){
    document.querySelector("#validationFdbk").textContent = "Congratulations! You got all the answers right!";
    document.querySelector("#validationFdbk").style.color = "#128d02be";
    document.querySelector("#totalScore").style.color = "#128d02be";
    }
    else if(score >= 80 && score <= 99){
    document.querySelector("#validationFdbk").textContent = "You're almost there!! Over 80 pts!!";
    document.querySelector("#validationFdbk").style.color = "#128d02be";
    document.querySelector("#totalScore").style.color = "#128d02be";
    }
    else {
        document.querySelector("#totalScore").style.color = "red";
    }
}
