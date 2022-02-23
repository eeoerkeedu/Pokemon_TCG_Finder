var pokeName = "clefairy";

var requestUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeName + "/";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// modal custom js code
$("#vendorInfoModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});
