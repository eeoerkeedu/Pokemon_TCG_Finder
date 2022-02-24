// var nameExample = "clefairy";
//NEW VARS
var pokeName = document.getElementById("pokeName");
var pokeID = document.getElementById("pokeID");
var pokeType = document.getElementById("pokeType");
var pokeWeight = document.getElementById("pokeWeight");
var pokeHeight = document.getElementById("pokeHeight");

//user input array pulled from local storage
var searchHistory = [];

// var requestUrl = "https://pokeapi.co/api/v2/pokemon/" + nameExample + "/";

// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
  //     console.log(data);
  //     // ADDED FOR DATA PULL
//     pokeName.textContent = "Name: " + data.name.toUpperCase();
//     pokeID.textContent = "ID: " + data.id;
//     pokeType.textContent = "Type: " + data.types[0].type.name.toUpperCase();
//     pokeWeight.textContent = "Weight: " + data.weight / 10 + " Kg";
//     pokeHeight.textContent = "Height: " + data.height / 10 + " Meters";
//     document.getElementById("pokeSprite").src =
//       data.sprites.other.home.front_default;
//   });

// Hidden jumbotron test code

function hideReveal() {
  console.log("hey");
  $("#jumbotron").addClass("d-none");
  $("#pokemonInfoBox").removeClass("d-none");
  $("#searchResults").removeClass("d-none");
  $("#pokeDex").removeClass("d-none");
}

// modal custom js code
$("#pokeSprite").on("click", function () {
  $("#pokeSpriteModal").modal({
    keyboard: true,
    focus: true,
    show: true,
  });
});

//runs functions of the search button when it's clicked
function handleSearchClick(event) {
  event.preventDefault();
  var searchFieldInput = $("#pokemonInput");
  var userInput = $(searchFieldInput).val();
  userInput = userInput.toLowerCase();

  //fetch for data fields and sprite pic
  var requestUrl = "https://pokeapi.co/api/v2/pokemon/" + userInput + "/";
  
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
      document.getElementById("pokeSprite").src =
      data.sprites.other.home.front_default;
    })
    .catch(function () {
      pokeName.textContent =
      "Uh oh, it looks like we don't have that particular Pokemon. Did you spell everything correctly?";
      document.getElementById("pokeSprite").src =
      "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80";
    });
    // runs actual search function ***
    // Austin - Added Function Call for Card Fetch
    cardFetch();
  // End Austin Adds
  hideReveal();
  handleHistoryStore();
  handleAutocompleteDisplay();
  searchHistory.unshift(userInput);
  $("#pokemonInput").val("");
}

// stores user's searches in local storage to be accessed by handleAutocompleteDisplay()
function handleHistoryStore() {
  if (searchHistory.length > 10) {
    searchHistory.pop();
  }
  
  localStorage.setItem("pokeHistory", JSON.stringify(searchHistory));
}

//retrives the users' history from local storage to add back to the autocomplete
function handleAutocompleteDisplay() {
  var savedNames = JSON.parse(localStorage.getItem("pokeHistory"));
  if (savedNames !== null) {
    searchHistory = savedNames;
  }
}

// creates autocomplate function on searchbar
$(function () {
  var availableNames = searchHistory;
  $("#pokemonInput").autocomplete({
    classes: {
      "ui-autocomplete": "highlight",
    },
    source: availableNames,
    minLength: 0,
  });
});

//initializes certain aspects on page load when called
function init() {
  handleAutocompleteDisplay();
}

function cardFetch() {
  // Index variable for cardFetch function
  var y = 0;
  var cardInfoEl = $("#pokemonCardInfoBox");
  var cardSearchResultsEl = $("#cardSearchResults");
  var cardUrlQuery = "https://api.pokemontcg.io/v2/cards?q=";
  var searchBox = $("#pokemonInput");
  var searchInput = "name:" + searchBox.val();
  var setDropdown = $("#sets");
  var setSelect = setDropdown.val();
  var setSelectURL = " set.id:" + setSelect;
  var formattedURL = cardUrlQuery + searchInput + setSelectURL;

  // Setup X-API-Key and fetch
  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("X-API-Key", "9e0389d9-7d6b-4a6d-8ea8-ca0ef133a8a7");
    },
  });
  $.get({
    url: formattedURL,
  }).then(function (response) {
    console.log(response);
    
    console.log(response.data[y].images.small);

    // Populate Pokemon Card Info Box 
    cardInfoEl
      .append(
        "<img id='pokemonCardPic' src='" +
          response.data[y].images.small +
          "'></img>"
      )
      .append("<p>Card: " + response.data[y].name + "</p>")
      .append("<p>By artist: " + response.data[y].artist + "</p>")
      .append(
        "<p>Set: " +
          response.data[y].set.series +
          " - " +
          response.data[y].set.name +
          "</p>"
      )
      .append("<p>Rarity: " + response.data[y].rarity);
  });
}

// makes search button tie into JS functions when clicked
$("#searchBtn").on("click", handleSearchClick);

//calls the init function on page load
init();
