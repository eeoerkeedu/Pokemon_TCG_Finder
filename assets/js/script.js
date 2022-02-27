// var nameExample = "clefairy";
//NEW VARS
var pokeName = document.getElementById("pokeName");
var pokeID = document.getElementById("pokeID");
var pokeType = document.getElementById("pokeType");
var pokeWeight = document.getElementById("pokeWeight");
var pokeHeight = document.getElementById("pokeHeight");
var setAlertModal = document.getElementById('setAlert')


//user input array pulled from local storage
var searchHistory = [];

// Index variable for cardFetch function
var y = 0;

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
  $("#resultsDisplay").removeClass("d-none");
}

//runs functions of the search button when it's clicked
function handleSearchClick(event) {
  event.preventDefault();
  var setDropdown = $("#sets");
  var setSelect = setDropdown.val();
  console.log(setSelect);

  if (setSelect === null) {
    // alert("Please select a Set first, please change me!!!!!!!!!!!!!!!!");
    $('#setAlert').modal('show');
    return;
  }

  var searchFieldInput = $("#pokemonInput");
  var userInput = $(searchFieldInput).val();
  userInput = userInput.toLowerCase();
  
  // Austin - Added Function Call for Card Fetch
  localStorage.setItem('searchString', userInput);
  localStorage.setItem('setString', setSelect);
  cardFetch();
  // End Austin Adds

  //fetch for data fields and sprite pic
  var requestUrl = "https://pokeapi.co/api/v2/pokemon/" + userInput + "/";
  pokeID.textContent = "";
  pokeType.textContent = "";
  pokeWeight.textContent = "";
  pokeHeight.textContent = "";

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
      localStorage.setItem("largePokeArt", data.sprites.other.home.front_default);
      
    })
    .catch(function () {
      pokeName.textContent =
      "Uh oh, it looks like we don't have that particular Pokemon. Did you spell everything correctly?";
      document.getElementById("pokeSprite").src =
      "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80";
    });
    // runs actual search function ***
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
  var cardInfoEl = $("#pokemonCardInfoBox");
  var cardSearchResultsEl = $("#cardSearchResults");
  var cardUrlQuery = "https://api.pokemontcg.io/v2/cards?q=";
  var searchInput = "name:" + localStorage.getItem("searchString");
  var setSelect = localStorage.getItem("setString");
  var setSelectURL = " set.id:" + setSelect;
  var formattedURL = cardUrlQuery + searchInput + setSelectURL;

  console.log()
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
    
    localStorage.setItem('largeCardArt', response.data[y].images.large);
    console.log(response.data[y].images.small);

    // Populate Pokemon Card Info Box 
    cardInfoEl.empty();
    console.log("Card Fetch Ran")
    cardInfoEl.css("width", "auto");
    cardInfoEl
      .append(
        "<img id='pokemonCardPic' src='" +
          response.data[y].images.small +
          "'></img>"
      )
      .append("<p>Card: " + response.data[y].name + "</p>")
      .append("<p>By Artist: " + response.data[y].artist + "</p>")
      .append(
        "<p>Set: " +
          response.data[y].set.series +
          " - " +
          response.data[y].set.name +
          "</p>"
      )
      .append("<p>Rarity: " + response.data[y].rarity);


      if (response.data[y].cardmarket != undefined && response.data[y].cardmarket != null){
        cardInfoEl.append("<p>Average Price: $" +
        response.data[y].cardmarket.prices.averageSellPrice +
        "</p>")
        .append("<a href='" +
        response.data[y].cardmarket.url +
        "' target ='_blank'> Market for " +
        response.data[y].name +
        "</a>")
      }


      console.log("Made it to line 185");
      
      $("#pokemonCardPic").on("click", handleLargeCardModal)

      cardSearchResultsEl.empty();
      cardSearchResultsEl.append("<h4>Card Variants</h4>");
      cardSearchResultsEl.children("h4").css("text-align", "center");
      
      for (let i = 0; i < response.data.length; i++) {
        cardSearchResultsEl.append("<button class = 'cardOption' value='" + 
        i + 
        "' type = 'button'>" + 
        response.data[i].name +
        " ID: " +
        response.data[i].id +
        " " +
        response.data[i].rarity +
        "</button>")
      }

      cardSearchResultsEl.on('click', '.cardOption', function(event){
        event.preventDefault();
        let targetButton = $(event.target);
        y = targetButton.val();
        cardFetch();
      })
    })
    
    .catch(function(){
      cardInfoEl.empty();
      cardSearchResultsEl.empty();
      cardInfoEl.css("width", "50vw");
      cardInfoEl.append("<h3>Oops! We couldn't find any cards matching that search! Double check that you spelled the card correctly, and that it's from the set you selected</h3>")
    });
}


//shows a larger version of the selected card art when the card picture is clicked

function handleLargeCardModal() {
  var largeCardArtHolder = $("#pokemonCardPicLrg");
  var largeCardArt = localStorage.getItem("largeCardArt")
  largeCardArtHolder.attr("src", largeCardArt);
  console.log(localStorage.getItem("largeCardArt"));
  $('#cardImgModal').modal('show');
};

//shows a larger version of the pokedex art when the picture is clicked
$("#pokeSprite").on("click", function handlePokeArtModal() {
  var largePokeArtHolder = $("#pokeSpriteLrg");
  var largePokeArt = localStorage.getItem("largePokeArt")
  largePokeArtHolder.attr("src", largePokeArt);
  console.log(localStorage.getItem("largeCardArt"));
  $('#pokedexImgModal').modal('show');
});

// makes search button tie into JS functions when clicked
$("#searchBtn").on("click", handleSearchClick);

//calls the init function on page load
init();
