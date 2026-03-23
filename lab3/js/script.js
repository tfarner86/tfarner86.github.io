// Event Listeners
window.addEventListener("load", loadStates);
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
});
document.querySelector("#password").addEventListener("focus", showSuggestedPassword);




// Functions
async function loadStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    let stateSelect = document.querySelector("#state");

    // Clear existing options except "Select One"
    stateSelect.innerHTML = "<option>Select One</option>";

    // Populate states
    data.forEach(item => {
        stateSelect.innerHTML += `<option value="${item.usps.toLowerCase()}">${item.state}</option>`;
    });
}


// Displaying city from Web API after entering zip code
async function displayCity() {
    // alert(document.querySelector("#zip").value);
    let zipCode = document.querySelector("#zip").value;
    console.log(zipCode)
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    let zipError = document.querySelector("#zipError");

    // Clear previous error
    zipError.innerHTML = "";
    zipError.style.color = "red";

    // If ZIP not found
    if (!data.city) {
        zipError.innerHTML = "ZIP not found.";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        return;
    }
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#longitude").innerHTML = data.longitude;
}

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>";
    for (let i=0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError")
    if(data.available) {
        usernameError.innerHTML = "Username available!";
        usernameError.style.color = "green";
    }
    else {
        usernameError.innerHTML = "Username taken";
        usernameError.style.color = "red";
    }
}

function generateSuggestedPassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let pwd = "";
    for (let i = 0; i < 8; i++) {
        pwd += chars[Math.floor(Math.random() * chars.length)];
    }
    return pwd;
}

function showSuggestedPassword() {
    let suggestion = generateSuggestedPassword();
    let span = document.querySelector("#suggestedPwd");

    span.innerHTML = `Suggested password: <strong>${suggestion}</strong>`;
    span.style.color = "blue";

    // Optional: clicking the suggestion fills the password fields
    span.style.cursor = "pointer";
    span.onclick = function () {
        document.querySelector("#password").value = suggestion;
        document.querySelector("#passwordAgain").value = suggestion;
        span.innerHTML = "Password applied!";
        span.style.color = "green";
    };
}



function validateForm(e) {
    e.preventDefault();

    let pwd = document.querySelector("#password").value;
    let pwdAgain = document.querySelector("#passwordAgain").value;
    let passwordError = document.querySelector("#passwordError");

    passwordError.innerHTML = "";   // clear old messages
    passwordError.style.color = "red";

    // Check length
    if (pwd.length < 6) {
        passwordError.innerHTML = "Password must be at least 6 characters.";
        return false;
    }

    // Check match
    if (pwd !== pwdAgain) {
        passwordError.innerHTML = "Passwords do not match.";
        return false;
    }

    // If everything is valid, submit the form
    document.querySelector("#signupForm").submit();
}


