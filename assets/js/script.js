var nameExample = "clefairy";
//NEW VARS
var pokeName = document.getElementById("pokeName");
var pokeID = document.getElementById("pokeID");
var pokeType = document.getElementById("pokeType");
var pokeWeight = document.getElementById("pokeWeight");
var pokeHeight = document.getElementById("pokeHeight");

var requestUrl = "https://pokeapi.co/api/v2/pokemon/" + nameExample + "/";

//user input array pulled from local storage
var searchHistory = [];

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    // ADDED FOR DATA PULL
    pokeName.textContent = "Name: " + data.name.toUpperCase();
    pokeID.textContent = "ID: " + data.id;
    pokeType.textContent = "Type: " + data.types[0].type.name.toUpperCase();
    pokeWeight.textContent = "Weight: " + data.weight / 10 + " Kg";
    pokeHeight.textContent = "Height: " + data.height / 10 + " Meters";
    document.getElementById("pokeSprite").src = data.sprites.front_default;
  });

// Hidden jumbotron test code
$("#searchBtn").on("click", function (event) {
  event.preventDefault();
  console.log("hey");
  $("#jumbotron").addClass("d-none");
  $("#pokemonInfoBox").removeClass("d-none");
  $("#searchResults").removeClass("d-none");
});
// modal custom js code
$("#vendorInfoModal").on("shown.bs.modal", function () {
  $("#myInput").trigger("focus");
});

$(function () {
  var availableNames = searchHistory;
  $("#pokemonInput").autocomplete({
    source: availableNames,
  });
});
