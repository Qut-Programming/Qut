const fs = require('fs')
const functions = require('./functions.js')

function main(filename) {
    var file = false

    try {
        file = fs.readFileSync(filename, 'utf8')
    } catch (err) {
        console.error("File does not exist / is corrupted")
    }

    var variables = {}
    for (const line in file.split("\n")) {
        data = file.split("\n")[line]
        if (data && !data.startsWith("\\\\")) {
            const command = data.split(" ")[0];
            if (command == "print") {
                var value = data.substring(6)
                if (functions.isVar(value.substring(0, value.length - 1))) {
                    value = variables[value.substring(0, value.length - 1)]
                } else {
                    value = value.substring(1, value.length - 2)
                }
                console.log(value)
            } else if (command == "set") {
                const values = data.substring(4).split("\\")
                const value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                variables[value1] = value2
            } else if (command == "resetvar") {
                var value = data.substring(9)
                console.log(value)
                if (variables[value]) {
                    variables[value] = undefined
                    console.log(variables)
                }
            } else if (command == "add") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value1)) {
                    value1 = variables[value1]
                } else {
                    value1 = value1.substring(1, value1.length - 1)
                }
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                if (functions.isSameType(value1, value2) == 'number') {
                    console.log(parseInt(value1) + parseInt(value2))
                } else {
                    console.log(value1 + value2)
                }
            } else if (command == "mul") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value1)) {
                    value1 = variables[value1]
                } else {
                    value1 = value1.substring(1, value1.length - 1)
                }
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                console.log(parseInt(value1) * parseInt(value2))
            } else if (command == "sub") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value1)) {
                    value1 = variables[value1]
                } else {
                    value1 = value1.substring(1, value1.length - 1)
                }
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                console.log(parseInt(value1) - parseInt(value2))
            } else if (command == "div") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value1)) {
                    value1 = variables[value1]
                } else {
                    value1 = value1.substring(1, value1.length - 1)
                }
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                console.log(parseInt(value1) / parseInt(value2))
            } else if (command == "pow") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value1)) {
                    value1 = variables[value1]
                } else {
                    value1 = value1.substring(1, value1.length - 1)
                }
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                console.log(parseInt(value1) ** parseInt(value2))
            } else if (command == "mod") {
                const values = data.substring(4).split("\\")
                var value1 = values[0]
                var value2 = values[1]
                if (functions.isVar(value1)) {
                    value1 = variables[value1]
                } else {
                    value1 = value1.substring(1, value1.length - 1)
                }
                if (functions.isVar(value2.substring(0, value2.length - 1))) {
                    value2 = variables[value2.substring(0, value2.length - 1)]
                } else {
                    value2 = value2.substring(1, value2.length - 2)
                }
                console.log(parseInt(value1) % parseInt(value2))
            } else if (command == "sleep") {
                var value = data.substring(6)
                if (functions.isVar(value.substring(0, value.length - 1))) {
                    value = variables[value.substring(0, value.length - 1)]
                } else {
                    value = value.substring(1, value.length - 2)
                }
                const date = Date.now();
                let currentDate = null;
                do {
                    currentDate = Date.now();
                } while (currentDate - date < parseInt(value));
            } else if (command == "run") {
                var value = data.substring(4)
                if (functions.isVar(value.substring(0, value.length - 1))) {
                    value = variables[value.substring(0, value.length - 1)]
                } else {
                    value = value.substring(1, value.length - 2)
                }
                main(value)
            } else {
                console.warn("Invalid Command! (Line "+line+")")
            }
        }
    }
}

main('./built-in/test.qut')
