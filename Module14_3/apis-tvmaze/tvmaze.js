/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
let searchResults = await axios.get(`https://api.tvmaze.com/search/shows?q=:${$("#search-query").val()}`)

  // return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary: "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>",
  //     image: "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]

return searchResults.data
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {

    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.show.id}">
         <div class="card" data-show-id="${show.show.id}">
           <div class="card-body">
           <img src = ${show.show.image.medium}
           alt = ${'https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300'}>
             <h5 class="card-title">${show.show.name}</h5>
             <p class="card-text">${show.show.summary}</p>
             <button>Episodes</button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}
/** Handle search form submission: 
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);
  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
      let epList = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
      let episodeRay = []
      for (episode of epList.data) {
        epList.id
episodeRay.push({id: episode.id, name: episode.name, season: episode.season, number: episode.number})
      }
  // TODO: return array-of-episode-info, as described in docstring above
  return episodeRay
}

$("#shows-list").on("click", "button", async function(e){
  $("#episodes-list").html('')
  let $showId = Number($(e.target.parentElement.parentElement).data("showId"))
  const episodesList = await getEpisodes($showId)
  $("#episodes-area").show()
  for (let episode of episodesList){
    $("#episodes-list").append(`<li data-id = "${episode.id}">${episode.name} (Season ${episode.season}, Episode ${episode.number})</li>`)
  }
})