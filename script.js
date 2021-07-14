// Assignment Code
var generateBtn = document.querySelector("#generate");

// Default passGenerator
var passGenerator = {
    passLength: 129,
    criteria: {
        includeLower: true,
        includeUpper: true,
        includeNumeric: true,
        includeSymbol: true,
    },

    randomizerName: {
        lower: this.getLower,
        upper: this.getUpper,
        num: this.getNum,
        sym: this.getSym
    },
    charPool: "",

    getCriteria: function () {
        this.passLength = messages.promptPassLength();
        messages.promptPassCriteria();
    },

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
        console.log(symbols)
        return symbols[Math.floor(Math.random() * symbols.length)];
    },

    generator: function () {

        var password = '';
        var typesCount = this.criteria.includeLower + this.criteria.includeUpper + this.criteria.includeNumeric + this.criteria.includeSymbol;

        console.log((typesCount));
        // for (var [key, value] of Object.entries(this.criteria)) {
        //     console.log(`${key}: ${value}`);
        // }
        // for (i = 0; i < this.passLength; i++) {

        // }

        // var typesCount = inner + upper + num + sym;

        return typesCount;
    },

    generatePassword: function () {
        this.getCriteria();
        if (this.isValid()) {
            var genPass = this.generator();
        }
        return genPass;
    },

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
    criteriaMessage: {
        includeLower: "Include Lowercase? y/n",
        includeUpper: "Include Uppercase? y/n",
        includeNumeric: "Include Numeric? y/n",
        includeSymbol: "Include Special Characters? y/n"
    },   
    invalid: "Invalid selection, must be 'y' or 'n'",
    mustSelectOne: "You must select at least one character type.",
    canceled: "Canceled Password Generation.",

    promptPassLength: function () {
        
        do {
            this.passLength = Number(prompt(this.chooseLength));
 
            // Reprompt if not at least 8 to 128
            if (this.passLength < 8 || this.passLength > 128) {
                alert(this.mustBeLength);
            } else if (isNaN(this.passLength)) {
                alert(this.mustBeNumber);
            } else {
                alert(this.canceled);
                return null;
            }
        } while (this.passLength < 8 || this.passLength > 128 || isNaN(this.passLength));
    
        return this.passLength;
    },

    promptPassCriteria: function() {
        for (var key in this.criteriaMessage) {
            
            do {
                
                var response = prompt(this.criteriaMessage[key]);
                var responseIsValid = this.isValidResponse(response)
                
                if (response === null) {
                    alert(this.canceled);
                    return;
                
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
