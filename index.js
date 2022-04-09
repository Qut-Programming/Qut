console.log(`Qut v1.0.2\nA programming language built in JS\n`)

const fs = require('fs')
const prompt = require('prompt-sync')({sigint: true});
const functions = require('./functions.js')

function main(filename) {
    console.log("\n")
    var file = false

    try {
        file = fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error("File does not exist / is corrupted")
    }

    var variables = {}
    var line = 0
    while (file.split("\n")[line]) {
        ++line
        data = file.split("\n")[line-1]
        if (data && !data.startsWith("\\\\")) {
            const command = data.split(" ")[0];
            if (command == "print") {
                var value = data.substring(6)
                value = functions.setVar(variables, value, 1)
                console.log(value)
                variables["!before"] = value
            } else if (command == "set") {
                const values = data.substring(4).split("\\")
                const value1 = values[0]
                var value2 = values[1]
                value2 = functions.setVar(variables, value2, 1)
                if (!value1.startsWith("!")) {
                    variables[value1] = value2
                    variables["!before"] = value2
                } else {
                    console.warn(`You are not allowed to set Important Variables! (Line ${line}, File '${filename}')`)
                }
            } else if (command == "add") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                value1 = functions.setVar(variables, value1, 0)
                value2 = functions.setVar(variables, value2, 1)
                if (functions.isSameType(value1, value2) == 'number') {
                    variables["!before"] = (parseInt(value1) + parseInt(value2))
                } else {
                    variables["!before"] = (value1 + value2)
                }
            } else if (command == "mul") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                value1 = functions.setVar(variables, value1, 0)
                value2 = functions.setVar(variables, value2, 1)
                variables["!before"] = (parseInt(value1) * parseInt(value2))
            } else if (command == "sub") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                value1 = functions.setVar(variables, value1, 0)
                value2 = functions.setVar(variables, value2, 1)
                variables["!before"] = (parseInt(value1) - parseInt(value2))
            } else if (command == "div") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                value1 = functions.setVar(variables, value1, 0)
                value2 = functions.setVar(variables, value2, 1)
                variables["!before"] = (parseInt(value1) / parseInt(value2))
            } else if (command == "pow") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                value1 = functions.setVar(variables, value1, 0)
                value2 = functions.setVar(variables, value2, 1)
                variables["!before"] = (parseInt(value1) ** parseInt(value2))
            } else if (command == "mod") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                value1 = functions.setVar(variables, value1, 0)
                value2 = functions.setVar(variables, value2, 1)
                variables["!before"] = (parseInt(value1) % parseInt(value2))
            } else if (command == "sleep") {
                var value = data.substring(6)
                value = functions.setVar(variables, value, 1)
                const date = Date.now();
                let currentDate = null;
                do {
                    currentDate = Date.now();
                } while (currentDate - date < parseInt(value));
                variables["!before"] = value
            } else if (command == "run") {
                var value = data.substring(4)
                value = functions.setVar(variables, value, 1)
                main(value)
                variables["!before"] = value
            } else if (command == "goto") {
                var value = data.substring(5)
                value = functions.setVar(variables, value, 1)
                variables["!pastline"] = line
                line = parseInt(value)-1
                variables["!before"] = parseInt(value)
            } else if (command == "ask") {
                var value = data.substring(4)
                value = functions.setVar(variables, value, 1)
                const answer = prompt(`${value} `)
                variables["!before"] = answer
            
            } else {
                console.warn(`Invalid Command! (Line ${line}, File '${filename}')`)
            }
        }
    }
}

console.log("Choose a option:\n   1: Run the test file\n   2: Run a different file")
var answer = prompt("")
if (answer == 1) {
    main('./built-in/test.qut')
} else if (answer == 2) {
    answer = prompt(`Put location of qut file here: `)
    main(answer)
} else {
    console.error("Invalid option")
}
