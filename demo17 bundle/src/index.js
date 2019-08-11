import * as _ from "lodash";

class Greeter {
    greeting: string
    constructor (message: string) {
        this.greeting = message
    }
    greet() {
        return _.join(this.greeting)
    }
}

let greeter = new Greeter('world22')

console.log(greeter.greet())
