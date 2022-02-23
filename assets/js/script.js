// modal custom js code
$("#vendorInfoModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});








// Hidden jumbotron test code
$('#searchBtn').on('click', function(event) {

  event.preventDefault();
  console.log('hey');
  $('#jumbotron').addClass('d-none');
  $('#pokemonInfoBox').removeClass('d-none');

})

