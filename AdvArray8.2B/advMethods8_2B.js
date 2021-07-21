// findUserByUsername
function findUserByUsername(ray, search) {
    return ray.find(function (v, i, a) {
        return v.username === search;
    });
}

// removeUser
function removeUser(ray, search) {
    ray.splice(ray.findIndex(function (v) {
        return v.username === search;
    })
        , 1)
    console.log(`Removed ${search}`);
    console.log(ray);
}
