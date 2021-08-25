

$("#searchBttn").on("click", async function(){
        let searchResults = await axios.get("https://api.giphy.com/v1/gifs/random",
        {params: {api_key: "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym",
    tag: `$(search).val()`}}
        )
    $("#theSpace").append(`<img src="${String(searchResults.data.data.image_url)}">`)
    $(search).val('')
})

$("#clearBttn").on("click", function(){
    $("#theSpace").html('')
})