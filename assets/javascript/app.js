// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=iEDFIwNeXtpxGTMckg0Oo79DtSZrJFii";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);

  for (let i = 0; i < 10; i++) {
    let newGif = $("<img>");
    newGif.attr("src", response.data[i].images.original.url);
    $("body").append(newGif);
  }      

});