// forEach
// 
// doubleValues
console.log("loaded")
function doubleValues(arr) {
    const newArray = [];
    arr.forEach(function (val) {
        newArray.push(val * 2);
    });
    return newArray;
};

// onlyEvenValues
function onlyEvenValues(arr) {
    const newArray = [];
    arr.forEach(function (val) {
        if (val % 2 === 0) {
            newArray.push(val);
        };
    });
    return newArray;
};

// showFirstAndLast (shows only the first and last CHARACTER of array entry)
function showFirstAndLast(arr) {
    const newArr = [];
    arr.forEach(function (str) {
        newStr = `${str[0]}${str[str.length - 1]}`;
        newArr.push(newStr)
    });
    return newArr;
};

// addKeyAndValue
function addKeyAndValue(arr, key, val) {
    arr.forEach(function (obj) {
        obj[key] = val;
    });
    return arr;
};

// vowelCount
function vowelCount(str) {
    const inStr = Array.from(str.toLowerCase());
    let newObj = {};
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    inStr.forEach(function (ltr) {
        let lcLtr = ltr.toLowerCase();
        for (let i = 0; i < vowels.length; i++) {
            // console.log(`${lcLtr} ${vowels[i]}`)
            if (lcLtr === vowels[i]) {
                if (newObj[vowels[i]] == undefined) {
                    newObj[vowels[i]] = 1;
                }
                else { newObj[vowels[i]] += 1; };
            };
        };

    });
    console.log(newObj)
    return newObj;
};




// map
// 
// doubleValuesWithMap (double values)
function doubleValuesWithMap(arr) {
    const newArray = [];
    arr.map(function (val) {
        let double = val * 2;
        newArray.push(double);
    });
    return newArray;
};

// valTimesIndex(value multiplied by index)
function valTimesIndex(arr) {
    const newArray = [];
    arr.map(function (val, indx) {
        let combined = val * indx;
        newArray.push(combined);
    });
    return newArray;
};

// extractKey
function extractKey(arr, key) {
    const newArray = [];
    arr.map(function (m) {
        let nameOnly = m[key]
        newArray.push(nameOnly)
    })
    return newArray;
};

// extractFullName
function extractFullName(arr) {
    const newArray = [];
    arr.map(function (obj) {
        let passOn = `${obj.first} ${obj.last}`;
        newArray.push(passOn);
    });
    return newArray;
};



// filter
// 
// filterByValue (searches key, returns value in new array)
function filterByValue(arr, key) {
    return arr.filter(function (obj) { return obj[key] });
};

// find
function find(ray, search) {
    console.log(search)
    arr.filter(function (i) {
        // console.log(arr[i])

        return ray[i] === search;
    });
    // return undefined;
};

// findInObj
function findInObj(ray, searchKey, condition) {
    const filteredResults = ray.filter(function (e) {
        return e[searchKey] === condition;
    })
    return filteredResults
};

// removeVowels
function removeVowels(str) {
    const lowerCaseStr = str.toLowerCase()
    const vowels = "aeiou";
    const newArray = Array.from(lowerCaseStr).filter(function (letter) {
        return vowels.indexOf(letter) === -1;
    })

    return newArray.join('');
};


// doubleOddNumbers
function doubleOddNumbers(ray) {
    const newArray = ray.filter(function (num) {
        return num % 2 !== 0;
    });
    return doubleValues(newArray)
};


