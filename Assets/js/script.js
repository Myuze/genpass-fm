// Assignment Code
var generateBtn = document.querySelector("#generate");

// Password Generator Object
var passGenerator = {
    passLength: 129,
    charPool: "",

    // Password Criteria
    criteria: {
        includeLower: true,
        includeUpper: true,
        includeNumeric: true,
        includeSymbol: true,
    },

    // Get critera for password
    getCriteria: function () {

        this.passLength = messages.promptPassLength();
        
        if (this.passLength == 0) {

            return false;

        } else {

            var completed = messages.promptPassCriteria();

            if (!completed) {
                console.log("NOT COMPLETED")

                return false;
            } else {
                
                return true;
            }
        }
    },

    // Random Character Functions
    getLower: function () {

        return String.fromCharCode(Math.floor(Math.random() * 10) + 97);
    },

    getUpper: function () {

        return String.fromCharCode(Math.floor(Math.random() * 10) + 65);
    },

    getNum: function () {

        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    },

    getSym: function () {

        var symbols =  " !#$%&'()*+,-./:;<=>?@[\]^_`{|}~\"";

        return symbols[Math.floor(Math.random() * symbols.length)];
    },

    // Used to compose a password based on selected criteria
    composePass: function () {

        var password = '';
        var typesArray = [];

        // To find the amount of chosen criteria
        Object.values(this.criteria).forEach(value => {
            if (value) {
                typesArray.push(value);
            }
        });

        // Generate a random character based on selected criteria only up to the provided password length
        for (var i = 0; i < this.passLength; i += typesArray.length) {

            for ([key, value] of Object.entries(this.criteria)) {
                if (value) {

                    if (key == 'includeLower') {

                        password += this.getLower();

                    } else if (key == 'includeUpper') {

                        password += this.getUpper();

                    } else if (key == 'includeNumeric') {

                        password += this.getNum();

                    } else if (key == 'includeSymbol') {

                        password += this.getSym();
                    } 
                }
            }
        }

        return password;
    },

    // Validate password critera and generate a password
    generatePassword: function () {

        var completed = this.getCriteria();
        console.log(completed)

        if (this.isValid() && completed) {
            console.log("genPass: COMPLETED")

            var genPass = this.composePass();
        } else {

            return '';
        }

        return genPass;
    },

    // Criteria isValid if at least 1 criteria is selected
    isValid: function () {

        if (this.criteria.includeLower ||
            this.criteria.includeUpper ||
            this.criteria.includeNumeric ||
            this.criteria.includeSymbol) {

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
    mustBeNumber: "You must select a number between 8 and 128 characters.",
    invalid: "Invalid selection, must be 'y' or 'n'",
    mustSelectOne: "You must select at least one character type.",
    canceled: "Canceled Password Generation.",

    criteriaMessage: {
        includeLower: "Include Lowercase? y/n",
        includeUpper: "Include Uppercase? y/n",
        includeNumeric: "Include Numeric? y/n",
        includeSymbol: "Include Special Characters? y/n"
    },   

    promptPassLength: function () {
        
        do {

            this.passLength = Number(prompt(this.chooseLength));
 
            // Reprompt if not at least a number from 8 to 128
            if (this.passLength == 0) {

                alert(this.canceled);

                return '';

            } else if (isNaN(this.passLength)) {

                alert(this.mustBeNumber);

            } else if (this.passLength < 8 || this.passLength > 128) {

                alert(this.mustBeLength);

            }

        } while (this.passLength < 8 || this.passLength > 128 || isNaN(this.passLength));
    
        return this.passLength;
    },

    promptPassCriteria: function() {

        for (var key in this.criteriaMessage) {
            
            do {
                // Prompt for criteria and validate response
                var response = prompt(this.criteriaMessage[key]);
                var responseIsValid = this.isValidResponse(response)
                
                if (response === null) {

                    alert(this.canceled);

                    return false;
                
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

        return true;
    },

    // Validate if responses are acceptable
    isValidResponse: function (response) {

        if (response === null) {

            return null;
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
