// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }
function filterOutOdds(...nums) {
    return nums.filter((num) => num % 2 === 0);
};

// Write a function called findMin returns the smallest argument.

const findMin = (...nums) => Math.min(...nums);

// Write function mergeObjects that accepts two obj, returns new obj which contains all of both
const mergeObjects = (firstObj, secondObj) => ({ ...firstObj, ...secondObj });

// function called doubleAndReturnArgs accepts Ray and variable args, returns newRay data + args
const doubleAndReturnArgs = (ray, ...args) => [...ray, ...args];

// as => functions

/** remove a random element in the items array
and return a new array without that item. */
const removeRandom = (...items) => items.splice(Math.floor(Math.random() * items.length), 1)
// .splice((Math.floor(Math.random()) * items.length), 1)]

// function removeRandom(items) {
//     const newRay = [...items]
//     return newRay.remove(newRay[Math.floor.random() * items.length])
// }

// /** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2];

// /** Return a new object with all the keys and values
// from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => ({ ...obj, [key]: val });

// /** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    let newObj = { ...obj };
    delete newObj[key];
    return newObj;
}


// /** Combine two objects and return a new object. */

const combine = (obj1, obj2) => ({ ...obj1, ...obj2 })


// /** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    let newObj = { ...obj };
    newObj[key] = val;
    return newObj
};
