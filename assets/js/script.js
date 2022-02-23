
var pokeName = "clefairy";

var requestUrl = "https://pokeapi.co/api/v2/pokemon/" + pokeName + "/";

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

// Hidden jumbotron test code
$('#searchBtn').on('click', function(event) {

  event.preventDefault();
  console.log('hey');
  $('#jumbotron').addClass('d-none');
  $('#pokemonInfoBox').removeClass('d-none');
  $('#searchResults').removeClass('d-none');

})
// modal custom js code
$("#vendorInfoModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});