// // categories is the main data structure for the app; it looks like this:

// //  [
// //    { title: "Math",
// //      clues: [
// //        {question: "2+2", answer: 4, showing: null},
// //        {question: "1+1", answer: 2, showing: null}
// //        ...
// //      ],
// //    },
// //    { title: "Literature",
// //      clues: [
// //        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
// //        {question: "Bell Jar Author", answer: "Plath", showing: null},
// //        ...
// //      ],
// //    },
// //    ...
// //  ]

// let categories = [];


// /** Get NUM_CATEGORIES random category from API.
//  *
//  * Returns array of category ids
//  */

// function getCategoryIds() {
// }

// /** Return object with data about a category:
//  *
//  *  Returns { title: "Math", clues: clue-array }
//  *
//  * Where clue-array is:
//  *   [
//  *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//  *      {question: "Bell Jar Author", answer: "Plath", showing: null},
//  *      ...
//  *   ]
//  */

// function getCategory(catId) {
// }

// /** Fill the HTML table#jeopardy with the categories & cells for questions.
//  *
//  * - The <thead> should be filled w/a <tr>, and a <td> for each category
//  * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
//  *   each with a question for each category in a <td>
//  *   (initally, just show a "?" where the question/answer would go.)
//  */

// async function fillTable() {
// }

// /** Handle clicking on a clue: show the question or answer.
//  *
//  * Uses .showing property on clue to determine what to show:
//  * - if currently null, show question & set .showing to "question"
//  * - if currently "question", show answer & set .showing to "answer"
//  * - if currently "answer", ignore click
//  * */

// function handleClick(evt) {
// }

// /** Wipe the current Jeopardy board, show the loading spinner,
//  * and update the button used to fetch data.
//  */

// function showLoadingView() {

// }

// /** Remove the loading spinner and update the button used to fetch data. */

// function hideLoadingView() {
// }

// /** Start game:
//  *
//  * - get random category Ids
//  * - get data for each category
//  * - create HTML table
//  * */

// async function setupAndStart() {
// }

// /** On click of start / restart button, set up game. */

// // TODO

// /** On page load, add event handler for clicking clues */

// // TODO






// class Game {

//     method
// }







// =================================================================================================================
class JepGame {
    constructor(obj){
        // currGame instead of Local save
        this.NumOfCategories = obj.NumOfCategories
        this.NumOfQuestions = obj.NumOfQuestions
        this.Categories = obj.Categories
        this.Questions = obj.Questions
        this.CellClass = obj.CellClass
        this.ActiveQuestion = undefined

    }
            //  -----Methods----- 
    async GetQuestions (){
        if(localStorage.getItem('jServiceOffset') === undefined || 
        localStorage.getItem('jServiceOffset') === null){
            jServiceOffset = 0
        }
        this.Questions = []
        this.CellClass = {}
        let categoryData = await axios.get("https://jservice.io/api/categories", 
        {params: {count: this.NumOfCategories, offset: jServiceOffset}})
        this.Categories = categoryData.data
        // Retrieving the questions by category
        for (let i = 0; i < this.Categories.length; i++) {
        let rawQuestions = await axios.get("https://jservice.io/api/clues", 
        {params: {category: this.Categories[i].id}})
        this.Questions.push(rawQuestions.data)
        };
        // Tons of New Categories
        jServiceOffset += this.NumOfCategories
        localStorage.setItem("jServiceOffset", jServiceOffset)
        // Turn on your button again
        newGameBttn.addEventListener("click", newGame)
        this.BuildBoard()
    }

    BuildBoard (){
        // make and hide questionWindow
        let questionWindow = document.createElement("div")
       questionWindow.id="questionWindow"
       questionWindow.className="questionWindowClosed"
       board.append(questionWindow)
      $("#questionWindow").hide()
      $('#questionWindow').html(`<div id="aniOverlay" class="closed"><div id="bottomTxt">
      <div id="qWinCategory"></div>
      <div id="question"></div>
       <div>Who is or what is...</div>
       <div><input type="text" id="response"><button id="answerBttn">Answer</button></div>
       </div></div>`)
       $('#bottomTxt').hide()
      let answerBttn = document.getElementById('answerBttn')
       answerBttn.addEventListener('click', this.CheckAnswer)

      //generate DOM for categories and question
      for (let c = 0; c< this.NumOfCategories; c++){
       $('#board').append(`<div id = ${c} class='answerGroup'>
       <div class='category'>${this.Categories[c].title}</div></div>`)
        for (let q = 0; q < this.NumOfQuestions; q++){
            // Setting the old game board
            if(currentGame.CellClass[`cell${c}${q}`] !== undefined){
            $(`#${c}`).append(
                `<div id = 'cell${c}${q}' data-question= '${q}'  data-category= '${c}'
                 data-answer= "${this.Questions[c][q].answer}"
                 class = '${this.CellClass[`cell${c}${q}`]}'>${this.Questions[c][q].answer}</div>`)

            }
            // Setting a new game board
            else {
                $(`#${c}`).append(
                    `<div id = 'cell${c}${q}' data-question= '${q}'  data-category= '${c}'
                     data-answer= "${this.Questions[c][q].answer}"
                     class = 'unanswered'>???</div>`)
            }
            };
        };
    };

    AskQuestion (e){
            e.target.className = 'activeQuestion'
            $("#qWinCategory").text(`Category: ${this.Categories[e.target.dataset.category].title}`)
            $("#question").text(`${this.Questions[e.target.dataset.category][e.target.dataset.question].question}`)
            $('#questionWindow').show()
            $('#aniOverlay').show()
            $('#questionWindow').removeClass('closed').addClass('questionWindowOpen')
            $('#aniOverlay').removeClass('closed').addClass('questionWindowOpen')
            setTimeout(function(){$('#bottomTxt').show()}, 750)
        }

    CheckAnswer(){
        //I had to store info on the DOM elements in order to bypass
        // the whole "Event Target" forget ordeal while also
        // having to have constructor information available in nested functions
        let response = document.getElementById('response').value.toLowerCase()
        // let lcResponse = response.toLowerCase()
        let activeQuestion = document.getElementsByClassName("activeQuestion")[0]
        let answer = activeQuestion.dataset['answer'].toLowerCase()
        let questionWindow = document.getElementById('questionWindow')
        let aniOverlay = document.getElementById('aniOverlay')
        // Poor accuracy in catching right questions, "The" vs "the" vs "" 
        //   are all counted as wrong, and it seems that jservice does not have
        //   a standardized approach to answers.
        // Not sure what to do here
        if(response !== ''){
        if(answer.includes(response) == true){
            activeQuestion.innerText = `${activeQuestion.dataset.answer}`
            activeQuestion.className = "right"
            setTimeout(function(){questionWindow.className = "questionWindowRight"}, 250)
            setTimeout(function(){questionWindow.className="closed"}, 2250)
            setTimeout(function(){aniOverlay.className="closed"}, 2250)
            setTimeout(function(){$('#bottomTxt').hide()}, 2250)
            setTimeout(function(){$('#questionWindow').hide()}, 2750)
            }

        else{
            activeQuestion.innerText =`${activeQuestion.dataset['answer']}`
            activeQuestion.className = "wrong"
            setTimeout(function(){questionWindow.className = "questionWindowWrong"}, 250)
            setTimeout(function(){questionWindow.className="closed"}, 1500)
            setTimeout(function(){aniOverlay.className="closed"}, 1500)
            setTimeout(function(){$('#bottomTxt').hide()}, 1500)
            setTimeout(function(){$('#questionWindow').hide()}, 2000)
            };
        };
         // this.CellClass is not available because it's nested?
        currentGame.CellClass[`${activeQuestion.id}`] = activeQuestion.className
        let saveInfo = JSON.stringify(currentGame)
        localStorage.setItem("currentGame", saveInfo)
    };

};

// This is the in-browser offset for drawing new categories
// I am aware this will eventually hit the end of jServiceOffset.io
// however, that is only after 5000+ games. I think for a homework project it should be fine.
let jServiceOffset = 0

const newGameBttn = document.getElementById("newGame")
newGameBttn.addEventListener("click", newGame)
let localSave = localStorage.getItem("currentGame")
let currentGame = undefined;

function newGame (){
    $('#board').html('');
    newGameBttn.removeEventListener('click', newGame)
    newGameObj = {NumOfCategories: 6, NumOfQuestions: 5, Categories: undefined, Questions: []}
    currentGame = new JepGame(newGameObj)
    currentGame.GetQuestions()
    let saveInfo = JSON.stringify(currentGame)
    localStorage.setItem("currentGame", saveInfo)
    console.log(currentGame)
}

if (localSave !== undefined || localSave !== null){
    let localSaveObj = JSON.parse(localSave)
    if(localSaveObj.Questions !== [] && localSaveObj.Categories !== undefined){
    currentGame = new JepGame(localSaveObj)
    currentGame.BuildBoard()
    }
}


$("#board").on("click", ".unanswered", function(e){
currentGame.AskQuestion(e);
});