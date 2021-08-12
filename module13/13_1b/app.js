// ====================================================================================
// Part Two - Movies App!
// ===================================================================================

// Build an application that uses jQuery to do the following:

// -----Contains form with two inputs "title", "rating" + submit bttn.


// -----append DOM with input values + remove bttn on each.
$('#submit').on('click', function (e) {
    $('#movieList').append(`<p>
    ${$('#title').val()}
    :    ${$('#rating').val()}/5   <button class="deleteBtn">x</button></p>`)
    e.preventDefault();
})

// -----remove is clicked, remove each title and rating from the DOM.

$('body').on('click', '.deleteBtn', function () {
    // body needed unless you have a large-enough field
    $(this).parent().remove()
    // must identify "This" and "parent"
})