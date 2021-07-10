// Assignment Code
var generateBtn = document.querySelector("#generate");

// Default passCriteria
var passCriteria = {
    passLength: 0,
    includeLower: true,
    includeUpper: true,
    includeNumeric: true,
    includeSpecialChar: true,

    isValid: function () {
        if (this.includeLower ||
            this.includeUpper ||
            this.includeNumeric ||
            this.includeSpecialChar) {
                return true;
            } else {
                alert(messages.mustSelectOne);
                return false;
        }
    }
}

// Prompt Messages
var messages = {
    chooseLenght: "Select a password lenght. Must be 8 to 128 characters.",
    mustBeLenght: "You must select a lenght between 8 and 128 characters.",
    criteriaMessage: {
        includeLower: "Include Lowercase? y/n",
        includeUpper: "Include Uppercase? y/n",
        includeNumeric: "Include Numeric? y/n",
        includeSpecialChar: "Include Special Characters? y/n"
    },   
    invalid: "Invalid selection, must be 'y' or 'n'",
    mustSelectOne: "You must select at least one character type.",

    promptPassLenght: function () {
        do {
            choiceLenght = prompt(this.chooseLenght);
            if (choiceLenght == null) {
                return;
            }
    
            if (choiceLenght < 8 || choiceLenght > 128) {
                alert(this.mustBeLenght)
            }
        } while (choiceLenght < 8 || choiceLenght > 128);
    
        return choiceLenght;
    },

    promptPassCriteria: function() {
        for (var key in this.criteriaMessage) {
            do {
                var response = prompt(this.criteriaMessage[key]);
                var responseIsValid = this.isValidResponse(response)
                
                if (response == null) {
                    passCriteria[key] = false;
                
                } else if (
                    response.toLowerCase() == 'y' ||
                    response.toLowerCase() == 'yes'
                    ) {
                        passCriteria[key] = true;
                
                } else if (
                    response.toLowerCase() == 'n' ||
                    response.toLowerCase() == 'no'
                    ) {
                        passCriteria[key] = false;
    
                } else {
                    alert(messages.invalid);
                }
    
            } while (!responseIsValid);
        }
    },

    isValidResponse: function (response) {
        if (response == null) {
            return false;
        }
    
        if (response.toLowerCase() == 'y' ||
            response.toLowerCase() == 'yes' ||
            response.toLowerCase() == 'n' ||
            response.toLowerCase() == 'no'
            ) {
                return true;
            } else {   
                return false;
        }
    }
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}

function randomizeCharacter() {
    console.log("Randomized RUN");
}

function getPassCriteria() {
    passCriteria.passLength = messages.promptPassLenght();
    messages.promptPassCriteria();
    console.log(passCriteria.includeLower);
    console.log(passCriteria.includeUpper);
    console.log(passCriteria.includeNumeric);
    console.log(passCriteria.includeSpecialChar);
    if (passCriteria.isValid()) {
        alert("WE FIRE")
    }
}

function generatePassword() {
    var genPass = "derp";
    genPass = getPassCriteria();
    return genPass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
