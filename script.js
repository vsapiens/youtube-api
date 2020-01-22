function displayResults(responseJSON) {
  let results = $(".results");
  console.log(responseJSON.items);
  $.each(responseJSON.items, function() {
    $(
      results.append(
        `<div class="video">
        <h2> ${this.snippet.title}</h2> <img src="${this.snippet.thumbnails.medium.url}"/>
        </div`
      )
    );
  });
}
function fetchVideos() {
  let url =
    "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCK17iXix09rlMz4C_qtg3YrkqNH8AvsyY&q=";
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
