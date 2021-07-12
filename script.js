// Assignment Code
var generateBtn = document.querySelector("#generate");

// Default passGenerator
var passGenerator = {
    passLength: 128,
    criteria: {
        includeLower: true,
        includeUpper: true,
        includeNumeric: true,
        includeSpecialChar: true
    },

    get: function () {
        this.passLength = messages.promptPassLength();
        messages.promptPassCriteria();
        
        // Debug logging
        // console.log(this.criteria.includeLower);
        // console.log(this.criteria.includeUpper);
        // console.log(this.criteria.includeNumeric);
        // console.log(this.criteria.includeSpecialChar);
    },
    generator: function () {

        for (var [key, value] of Object.entries(this.criteria)) {

            console.log(`${key}: ${value}`);
        }
    },

    generatePassword: function () {
        this.get();
        if (this.isValid()) {
            genPass = this.generator();
        }
        return genPass;
    },

    isValid: function () {
        if (this.criteria.includeLower ||
            this.criteria.includeUpper ||
            this.criteria.includeNumeric ||
            this.criteria.includeSpecialChar) {
                return true;
            } else {
                alert(messages.mustSelectOne);
                return false;
        }
    }
};

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
                    passGenerator.criteria[key] = false;
                
                } else if (
                    response.toLowerCase() == 'y' ||
                    response.toLowerCase() == 'yes'
                    ) {
                        passGenerator.criteria[key] = true;
                
                } else if (
                    response.toLowerCase() == 'n' ||
                    response.toLowerCase() == 'no'
                    ) {
                        passGenerator.criteria[key] = false;
    
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
};

// Write password to the #password input
function writePassword() {
    var password = passGenerator.generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
