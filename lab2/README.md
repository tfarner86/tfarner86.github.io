# Pseudocode
Let's start by sketching out the steps to develop this game
    1. Create a web page in which the player can submit a guess. Display a message prompting the player to guess a number between 1 and 99.
    2. Generate a random number between 1 and 99 and store it as the target number.
    3. Get the player's input as their guess.
        a. Create a text box
        b. Create a "Guess" button
        c. Add an event listener to the button
        d. Display player's guesses (append it to previous guesses)
    4. Create a function to validate the player's input: Display an error message if the number is outside of the 1-99 range.
    5. Create a variable to store the player's number of attempts and set it to 0. 
    6. Create two variables to store the player's total wins and losses and set them to 0.
    7. If the player's input is valid, increase the number of attempts by 1.
    8. Compare the player's guess with the target number
        If the guess is equal to the target number:
            i. Display a congratulatory message along with the number of attempts taken.
            ii. Increase the variable that keeps track of total wins and display it
            iii. Disable/Hide Guess button, display "Play Again" button
    9. Check the number of attempts, if it's greater than 7:
        i. Display a "You Lost" message
        ii. Increase the variable that keeps track of the total losses and display its value
        iii. Disable/Hide Guess button, display the "Play Again" button
    10. If the guess is lower than the target number:
            i. Display a message prompting the player to enter a higher number.
        If the guess is greater than the target number:
            i. Display a message prompting the player to enter a lower number.
    11. Create an event listener for the "Reset" button
        i. Clear previous guesses
        ii. Reset number of attempts
        iii. Generate a new random number
        iv. Enable/Show Guess button, hide "Reset" button
    12. Style the web page so it looks nice.