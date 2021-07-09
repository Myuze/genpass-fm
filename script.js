// Assignment Code
var generateBtn = document.querySelector("#generate");

// Prompt Messages
var messages = {
    chooseLenght: "Select a password lenght. Must be 8 to 128 characters.",
    includeLower: "Include Lowercase?",
    includeUpper: "Include Uppercase?",
    includeNumeric: "Include Numeric?",
    includeSpecialChar: "Include Special Characters?",
    mustSelectOne: "You must select at least one character type."
}

// Default Choices
var choices = {
    length: 128,
    includeLower: true,
    includeUpper: true,
    includeNumeric: true,
    includeSpecialChar: true
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

function promptUser(message) {

}


function generatePassword() {
    var genPass = "derp";
    return genPass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
