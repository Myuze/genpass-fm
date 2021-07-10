// Assignment Code
var generateBtn = document.querySelector("#generate");

// Default passCriteria
var passCriteria = {
    passLength: 128,
    includeLower: true,
    includeUpper: true,
    includeNumeric: true,
    includeSpecialChar: true,

    get: function () {
        this.passLength = messages.promptPassLength();
        messages.promptPassCriteria();
        
        // Debug logging
        console.log(this.includeLower);
        console.log(this.includeUpper);
        console.log(this.includeNumeric);
        console.log(this.includeSpecialChar);
    },

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
    chooseLength: "Select a password length. Must be 8 to 128 characters.",
    mustBeLength: "You must select a length between 8 and 128 characters.",
    criteriaMessage: {
        includeLower: "Include Lowercase? y/n",
        includeUpper: "Include Uppercase? y/n",
        includeNumeric: "Include Numeric? y/n",
        includeSpecialChar: "Include Special Characters? y/n"
    },   
    invalid: "Invalid selection, must be 'y' or 'n'",
    mustSelectOne: "You must select at least one character type.",

    promptPassLength: function () {
        do {
            choiceLength = prompt(this.chooseLength);
            if (choiceLength == null) {
                return;
            }
    
            if (choiceLength < 8 || choiceLength > 128) {
                alert(this.mustBeLength)
            }
        } while (choiceLength < 8 || choiceLength > 128);
    
        return choiceLength;
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

var generator = {
    password: "",

    randomizeCharacter: function () {
        console.log("Randomized RUN");
        return "I am a randomized password."
    }
}

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
}



function generatePassword() {
    passCriteria.get();
    if (passCriteria.isValid()) {
        genPass = generator.randomizeCharacter();
    }
    return genPass;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
