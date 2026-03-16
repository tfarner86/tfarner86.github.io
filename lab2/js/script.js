// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

// Added Enter button functionality for the Guess and Reset buttons
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const guessBtn = document.querySelector("#guessBtn");
        const resetBtn = document.querySelector("#resetBtn");

        if (guessBtn.style.display !== "none") {
            guessBtn.click();
        } else if (resetBtn.style.display !== "none") {
            resetBtn.click();
        }
    }
});


// Global Variables
let randomNumber;
let attempts = 0;
let wins = 0;
let loses = 0;

document.querySelector("#wins").textContent = wins;
document.querySelector("#loses").textContent = loses;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) +1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    // hiding the reset button
    document.querySelector("#resetBtn"). style.display = "none";

    // showing the guess button
    document.querySelector("#guessBtn"). style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value = ""; // clear the textbox
    let feedback = document.querySelector("#feedback");
    feedback.style.display = "none";  // hide it again
    feedback.textContent = "";
    document.querySelector("#guesses").textContent = "";
    document.querySelector("#remaining").textContent = 7;
}

function checkGuess() {
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player Guess: " + guess);
    let feedback = document.querySelector("#feedback");
    feedback.style.display = "block";   // show it
    feedback.textContent = "";
    if(guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a value between 1 and 99!";
        feedback.style.color = "#b40c0cbe";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if(guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "#128d02be";
        wins++;
        document.querySelector("#wins").textContent = wins;
        gameOver();
    }
    else {
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#remaining").textContent --;

        // Added clearing the input after a wrong guess
        document.querySelector("#playerGuess").value = "";
        document.querySelector("#playerGuess").focus();

        if(attempts == 7) {
            feedback.textContent = "Sorry, you lost!";
            feedback.style.color = "red";
            loses++;
            document.querySelector("#loses").textContent = loses;
            gameOver();
        }
        else if (guess > randomNumber) {
            feedback.textContent = "Guess was high!";
        }
        else {
            feedback.textContent = "Guess was low!";
        }
    }
}

function gameOver() {
    guessBtn = document.querySelector("#guessBtn");
    resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; // hides guess button
    resetBtn.style.display = "inline"; // show reset button
}