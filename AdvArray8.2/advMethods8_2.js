// hasOddNumber takes an array
function hasOddNumber(ray) {
    return ray.some(function (n) {
        return n % 2 !== 0
    })
}

// hasAZero (takes a number)
function hasAZero(num) {
    useNum = Array.from(`${num}`)
    return useNum.some(function (digit) {
        return digit == 0;
    })
}

// hasOnlyOddNumbers takes an array
function hasOnlyOddNumbers(ray) {
    return ray.every(function (n) {
        return n % 2 !== 0
    })
}

// hasNoDuplicates takes an array
function hasNoDuplicates(ray) {
    const reps = Number(ray.length) - 1
    const newArray = [];
    return ray.every(function () {
        for (let i = 0; i <= reps; i++) {
            if (newArray.indexOf(ray[i]) === -1) {
                newArray.push(ray[i])
            };
        }
        return ray.length == newArray.length;
    })
}

// hasCertainKey takes an array of objects
function hasCertainKey(ray, key) {
    return ray.every(function (obj) {
        return obj[key] !== undefined
    })
}

// hasCertainValue an array of objects
function hasCertainValue(ray, key, value) {
    return ray.every(function (obj) {
        return obj[key] === value
    })
}

