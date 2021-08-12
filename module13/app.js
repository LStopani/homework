
// When DOM ready, console.log(“Let’s get ready to party with jQuery!”)
$().ready(console.log("Let's get ready to party with jQuery!"));

// all images inside article, tag the class of image-center 
// (class defined inside style tag in head).
$('article img').attr('class', 'image-center');
// Single '' around nested heirarchy


// Remove last paragraph.
$('p').last().remove();

// Set fontSize of title to be random pixel size from 0 to 100.
$('#title').css('font-size', `${Math.floor(Math.random() * 100)}px`)
// .css is the key to changing visible attributes

// Add item to the list; (it can say whatever you want.)
$('ol').append('<li>Whatever you want</li>')

// Empty the aside and paragraph in apologizing for list’s existence.
$('aside').html("I apologize for the list's existence.")

// change  numbers in the bottom inputs
$('input').val('127')

// backgroundColor of body should change to match whatever values in inputs.
$('body').css('background-color', `rgb( ${$('input').first().val()}, ${$('input').eq(2).val()}, ${$('input').last().val()})`)
// use eq() to select items that aren't first or last

// Add eventListener "click" on img,  remove img from DOM.
$('img').on("click", function () { $('img').remove() })

