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

function generateButtons() {
  $.each(topics, function(_, topic) {
    $(".buttons").append(
      $("<button>")
        .text(topic)
        .addClass("button")
        .attr("value", topic)
    );
  });
}

generateButtons();

$(document).on("click", ".button", requestAPI);

function requestAPI() {
  $(".message").hide();
  $(".gifdump").empty();

  let queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    $(this).val() +
    "&limit=10&rating=pg&api_key=iEDFIwNeXtpxGTMckg0Oo79DtSZrJFii";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (let i = 0; i < response.data.length; i++) {
      let newGifDiv = $("<div>").addClass("gifdiv");
      let newGif = $("<img>");
      newGif
        .attr("src", response.data[i].images.original_still.url)
        .attr("data-state", "still")
        .attr("data-still", response.data[i].images.original_still.url)
        .attr("data-animate", response.data[i].images.original.url)
        .addClass("gif");
      newGifDiv.append(newGif);
      newGifDiv.append(
        "<h5 class='rating'> Rating: " + response.data[i].rating + "</h5>"
      );
      $(".gifdump").append(newGifDiv);
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

function addTopic() {
  event.preventDefault();

  let newTopic = $("#topic-input").val();
  topics.push(newTopic);

  $(".buttons").empty();

  generateButtons();
}
