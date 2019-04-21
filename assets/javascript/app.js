let topics = [
  "tacos",
  "hamburgers",
  "french fries",
  "pizza",
  "hot dogs",
  "quesadilla",
  "kfc",
  "apples",
  "bananas"
];

$.each(topics, function(_, food) {
  $(".buttons").append(
    $("<button>")
      .text(food)
      .addClass("button")
      .attr("value", food)
  );
});

$(document).on("click", ".button", requestAPI);

function requestAPI() {
  $(".gifdump").empty();

  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    $(this).val() +
    "&limit=10&rating=g&api_key=iEDFIwNeXtpxGTMckg0Oo79DtSZrJFii";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    for (let i = 0; i < response.data.length; i++) {
      let newGif = $("<img>");
      newGif
        .attr("src", response.data[i].images.original_still.url)
        .attr("data-state", "still")
        .attr("data-still", response.data[i].images.original_still.url)
        .attr("data-animate", response.data[i].images.original.url)
        .addClass("gif");
      $(".gifdump").append(newGif);
    }
  });
}

$(document).on("click", ".gif", pausePlay);

function pausePlay() {
  if ($(this).attr("data-state") === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}
