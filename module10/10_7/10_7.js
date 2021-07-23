
// Quick Question #1: What does the following code return?
// ------------------------------------------------------------------
// new Set([1,1,2,2,3,4])
// ------------------------------------------------------------------
//  [1,2,3,4]


// Quick Question #2: What does the following code return?
// ------------------------------------------------------------------
// [...new Set("referee")].join("")
// ------------------------------------------------------------------
// "refr"


// Quick Questions #3: What does the Map m look like after running the following code?
// ------------------------------------------------------------------
// let m = new Map();
// m.set([1, 2, 3], true);
// m.set([1, 2, 3], false);
// ------------------------------------------------------------------
// Map {
//   0: key:  [1, 2, 3], value: true
//   1: key: [1, 2, 3], value: false
// }


// Write a function called hasDuplicate
// accepts an array 
// returns true or false if that array contains a duplicate

function hasDuplicate(ray) {
    let uniqueChar = new set(ray)
    if (uniqueChar.length === ray.length) {
        return false
    }
    return true
}

// Write a function called vowelCount
// accepts a string
// returns a map where the keys are numbers and
// values are the count of the vowels in the string.
function vowelCount(str) {
    let lowerStr = str.toLowerCase()
    const vowels = "aeiou";
    let mapReturn = new Map();

    for (let t = 0; t < str.length; t++) {
        if (vowels.includes(`${lowerStr[t]}`) === true) {
            if (mapReturn.has(`${lowerStr[t]}`) === true) {
                mapReturn.set(`${lowerStr[t]}`, (mapReturn.get(`${lowerStr[t]}`) + 1))
            }

            else {
                mapReturn.set(`${lowerStr[t]}`, 1)
            };
        };
    };

    return mapReturn;
}


