// Assignment Code
var generateBtn = document.querySelector("#generate");

// Prompt Messages
var messages = {
    chooseLenght: "Select a password lenght. Must be 8 to 128 characters.",
    mustBeLenght: "You must select a lenght between 8 and 128 characters.",
    criteriaMessage: {
        includeLower: "Include Lowercase?",
        includeUpper: "Include Uppercase?",
        includeNumeric: "Include Numeric?",
        includeSpecialChar: "Include Special Characters?"
    },   
    mustSelectOne: "You must select at least one character type."
}

// Default passCriteria
var passCriteria = {
    passLength: 0,
    includeLower: true,
    includeUpper: true,
    includeNumeric: true,
    includeSpecialChar: true
}

// Write password to the #password input
function writePassword() {
    console.log("Write Password RUN")
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

function promptUser(message) {
    var response = window.prompt(message);
    return response;
}

function randomizeCharacter() {
    console.log("Randomized RUN")
}

function getPassCriteria() {
    passCriteria.passLength = promptPassLenght();
    passCriteria = promptPassCriteria();
    console.log(passCriteria)
}

function promptPassCriteria() {
    for (var key in messages.criteriaMessage) {
        do {
            var response = promptUser(messages.criteriaMessage[key]);

        } while (!validatePassCriteria())

    }
}

function validatePassCriteria () {
    if (getPassCriteria.includeLower ||
        getPassCriteria.includeUpper ||
        getPassCriteria.includeNumeric ||
        getPassCriteria.includeSpecialChar) {
            return true;
        } else {
            alert(messages.mustSelectOne);
            return false;
        }
}

function promptPassLenght () {
    console.log("Get Pass Lenght RUN")
    var choiceLenght = passCriteria.passLength;

    do {
        choiceLenght = promptUser(messages.chooseLenght)
        if (choiceLenght == null) {
            return;
        }

        if (choiceLenght < 8 || choiceLenght > 128) {
            alert(messages.mustBeLenght)
        } else {
            alert(`${choiceLenght} chosen!`)
        }
    } while (choiceLenght < 8 || choiceLenght > 128);

    return choiceLenght;
}

function generatePassword() {
    console.log("GeneratePassword RUN")
    var genPass = "derp";
    genPass = getPassCriteria();
    return genPass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
