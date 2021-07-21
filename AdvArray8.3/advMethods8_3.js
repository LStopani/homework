// extractValue array of obj returns new array of obj
function extractValue(ray, key) {
    return ray.reduce(function (acu, nxtItm) {
        acu.push(nxtItm[key]);
        return acu
    }, [])
}

// vowelCount string, returns obj
function vowelCount(str) {
    const inStr = Array.from(str.toLowerCase())
    const vowels = 'aeiou'
    const outObj = {}
    inStr.reduce(function (acu, nxtItm) {
        if (vowels.indexOf(nxtItm) !== -1) {
            if (outObj[`${nxtItm}`] === undefined) {
                outObj[`${nxtItm}`] = 1
            }
            outObj[`${nxtItm}`] += 1;
        }
        else { return acu };
    }, '')
    return outObj
}

// addKeyAndValue array of obj, returns array of obj
function addKeyAndValue(objRay, key, val) {
    newObjRay = [];
    objRay.reduce(function (acu, nxtItm) {
        nxtItm[`${key}`] = val;
        newObjRay.push(nxtItm);
        return acu;
    }, [])
    return newObjRay
}

// partition array and callback, returns array with 2 arrays in it
function partition(ray, outsideFunc) {
    const trueRay = [];
    const falseRay = [];
    const grandRay = [trueRay, falseRay];
    ray.reduce(function (acu, nxtItm) {
        if (outsideFunc(nxtItm) === true) {
            trueRay.push(nxtItm);
            return acu;
        };
        falseRay.push(nxtItm);
        return acu;
    }, '')

    return grandRay
}
