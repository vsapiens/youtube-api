var pageToken = "";
var prevToken = "";
var nextToken = "";
function displayResults(responseJSON) {
  let results = $(".results");
  console.log(responseJSON);
  $(".results").empty();
  $.each(responseJSON.items, function() {
    $(results).append(
      `
        <a href="https://www.youtube.com/watch?v=${this.id.videoId} target="_blank"">
        <h2> ${this.snippet.title}</h2> 
        </a>
        <a href="https://www.youtube.com/watch?v=${this.id.videoId} target="_blank"">
        <img src="${this.snippet.thumbnails.medium.url}"/>
        </a>
        `
    );
  });
  $(".button").empty();
  if (responseJSON.prevPageToken) {
    $(".button").append(`<button type="button" id="prev"> Previous</button>`);
    prevToken = responseJSON.prevPageToken;
    console.log(responseJSON.prevPageToken);
  }
  $(".button").append(`<button type="button" id="next"> Next</button>`);
  nextToken = responseJSON.nextPageToken;
}

$(".button").on("click", "#prev", function(e) {
  event.preventDefault();
  $(".results").empty();
  $(".button").empty();
  pageToken = `&pageToken=${prevToken}`;
  fetchVideos();
});

$(".button").on("click", "#next", function(e) {
  event.preventDefault();
  $(".results").empty();
  $(".button").empty();
  pageToken = `&pageToken=${nextToken}`;
  console.log(nextToken);
  fetchVideos();
});
function fetchVideos() {
  let url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCK17iXix09rlMz4C_qtg3YrkqNH8AvsyY&maxResults=10&type=video&q=";
  let text = $("#text").val();
  if (text === "") {
    alert("Inserte algo en la barra de busqueda.");
    return false;
  }
  url += text;
  url += pageToken;
  console.log(url);

  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function(responseJSON) {
      displayResults(responseJSON);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

function watchForm() {
  let form = document.getElementById("form");
  form.addEventListener("submit", event => {
    event.preventDefault();
    fetchVideos();
  });
}

function init() {
  watchForm();
}
init();
