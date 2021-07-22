// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }

const createInstructor = (firstName, lastName) => ({ firstName, lastName })


// Computed Property Names

// var favoriteNumber = 42;

// var instructor = {
//   firstName: "Colt"
// }

// instructor[favoriteNumber] = "That is my favorite!"
let favoriteNumber = 42

const instObj = {
    firstName: "Colt",
    [favoriteNumber]: "That is my favorite"
}


// Object Methods

// var instructor = {
//   firstName: "Colt",
//   sayHi: function(){
//     return "Hi!";
//   },
//   sayBye: function(){
//     return this.firstName + " says bye!";
//   }
// }

const instructor = {
    firstName: "Colt",
    sayHi() {
        return "Hi!";
    },
    sayBye() {
        return this.firstName + " says bye!";
    }
}
// Write a function which generates an animal object

function createAnimal(animal, utterance, sound) {
    return { species: animal, [utterance]: sound }
}
