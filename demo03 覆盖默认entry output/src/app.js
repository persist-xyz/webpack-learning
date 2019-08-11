
// es6
import sum from '../vendor/sum'
console.log(`sum(1, 2):`, sum(1, 2))

// commonJS
let minus = require('../vendor/minus')
console.log(`minus(3, 4):`, minus(3, 4))

// AMD
/* require(['../vendor/multi'], function(multi) {
    console.log(`multi(5, 6):`, multi(5, 6))
}) */

