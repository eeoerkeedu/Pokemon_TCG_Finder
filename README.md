# Pokemon_TCG_Finder

## Link: https://eeoerkeedu.github.io/Pokemon_TCG_Finder/

## Description

Our team was motivated to explore a hobby of one of our team members and make a webpage focused on finding information on Pokemon and the Pokemon trading card game (TCG).
We wanted to give users easy access to information on the Pokemon they liked and further info on the physical collectable cards that went with them. 
Other sites may give you details on individual pokemon or on their cards but few if none do both in a single search function.

## Usage

 - Within the header find links to retailers and info about the Pokemon TCG
 - Select a current expansion from the dropdown menu and enter the name on any Pokemon (i.e. Bellsprout, Calyrex, Gengar, 
    etc.)
    - the site will return information on that Pokemon and any cards from the selected expansion.
 - On Mobile if the Pokedex is closed, simply turn your phone to the wider screen size and it should open again.
 - See available card options listed in a column after a search.
    - each is a button that will show you that card's infomation if clicked on.
 - On page images are clickable and show you larger versions of the art or card clicked on.
 - Selecting the "market for" option on the card information panel will take you to information on the pricing and 
    availability of purchasing that card individually from: 
    https://www.cardmarket.com/en/Pokemon

## Demo Usage:
Not familiar with Pokemon or the Pokemon Trading Card game (or both)?
No worries! Here are some specific searches to try which will showcase different responses:

- Set Dropdown: "Battle Styles" & Input: "Tyranitar" for a typical search
- Set Dropdown: "Chilling Reign" & Input: "Calyrex" for a search with many results (we used a wildcard search)
- Set Dropdown: "Battle Style" & Input: "Geodude" for a search with a 200 response from API1 and a 400 response from API2
- Set Dropdown: "Battle Styles" & Input "Mustard" for a search with a 400 response from API1 and a 200 response from API2

## Screen Shots

![img](./assets/img/pageInti.png)
/--------------------------------------------------------
![img](./assets/img)
/--------------------------------------------------------
![img](./assets/img)




## Credits

Collaboration team: MVP-MVP's

Pokemon infomation provided by: https://pokeapi.co/

Pokemon Card info provided by: https://pokemontcg.io/

PokeDex formatting via html and CSS by Bidji (https://codepen.io/Bidji): https://codepen.io/Bidji/pen/MYdPwo

## Features

 - An autofill function to assist in recalling previous searches.
 - Marketplace dropdown in header.
 - Mobile friendly header and page content.
 - See enlarged art of the searched pokemon or cards.
 - Ability to search for all the cards in a given expansion set and see all of their varieties.
 - See datailed info on card returns like the artist and the pricing information.
 - "400 response" page elements.

## How to Contribute

Please leave comments for how we can improve or let us know if there is key infomation you'd like to see dispalyed via our git-hub page.

## Tests

Entering invalid names produces odd some results, also entering the names of non-pokemon but valid pokemon cards will return the cards but no info on the pokedex section.