function displayResults(responseJSON) {
  let results = $(".results");
  console.log(responseJSON.items);
  var pageToken = responseJSON.items.nextPageToken;
  $.each(responseJSON.items, function() {
    $(
      results.append(
        `
        <a href="https://www.youtube.com/watch?v=${this.id.videoId}">
        <h2> ${this.snippet.title}</h2> 
        </a>
        <a href="https://www.youtube.com/watch?v=${this.id.videoId}">
        <img src="${this.snippet.thumbnails.medium.url}"/>
        </a>
        `
      )
    );
  });
  $(
    results.append(
      `
      <div class="button">
        <button type="button"> Next </button>
        <button type="button"> Previous  </button>
      </div>
    `
    )
  );
}
function fetchVideos() {
  let url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCK17iXix09rlMz4C_qtg3YrkqNH8AvsyY&maxResults=10&q=";
  let text = $("#text").val();
  url += text;
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
