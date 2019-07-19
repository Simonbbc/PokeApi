//some global variables
let pokemonDisplayList = document.querySelector(".pokemon--list");
let paginationButtons = document.querySelectorAll(".pagination-button");
let displayList = {
    from: 0,
    to: 50,
    currentPage: 1,
};
let searchInput = document.querySelector(".search--input");

window.onload = function() {
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', async function () {
            if(index === 0) {
                if(displayList.currentPage > 1){
                    if(displayList.to === 718) {
                        displayList.to -= 18;
                        displayList.from -= 50;
                    } else {
                        displayList.from -= 50;
                        displayList.to -= 50;
                    }
                    displayList.currentPage -= 1;
                    console.log("from: ", displayList.from, " to: ", displayList.to);
                    changeCurrrentSite();
                    displayPokemonList();   
                }
            } else if(index === 1) {
                if(displayList.currentPage < 15) {
                    displayList.from += 50;
                    if(displayList.from === 700) {
                        displayList.to += 18;
                    } else {
                        displayList.to += 50;
                    }
                    displayList.currentPage += 1;
                    changeCurrrentSite();
                    displayPokemonList();
                }
            }
        });
    });
};

function changeCurrrentSite() {
    const currentSiteElement = document.querySelector(".current-site");
    currentSiteElement.innerHTML = displayList.currentPage;
}

function createListItem() {
    const listItem = document.createElement("li");
    listItem.classList.add("list--item");
    pokemonDisplayList.appendChild(listItem);
    return listItem;
}

/**
 * 
 *
 */
async function displayPokemonList() {
    await clearDisplayList();
    for(let i = displayList.from; i < displayList.to; i++) {
        let dataField = await createListItem();
        dataField.innerHTML = setDataField(pokemonList[i]);
        await waitForImage();
    }
}

/**
 * This function is always called when there is a change in displaing the pokemon list.
 * That could be, when we search for a specific pokemon or when you change the current page. 
 * In first place we get the whole pokemon list.
 * After that we check if the length of the list is greater than zero, thats just some error handling, it could be removed but error handling is always nice !
 * Then we iterate over all the items in the list and call the DOM function remove. 
 * This will remove all the listitems from the list.
 */
function clearDisplayList() {
    const displayList = document.querySelectorAll(".list--item");
    if(displayList.length > 0) {
        displayList.forEach((listItem, index) => {
            listItem.remove();
        });
    }
}

/**
 * this is our main function and is called first.
 * first of all we check if some data is alredy stored in the local storage.
 * if not we call multiple functions the first gets the raw json data.
 * the secound function creates all pokemons with the json data and stores them in the pokemonList.
 * After that we put this list into the local storage, so if, the page gets reloaded we don't have to fetch from the json. This makes the hole thing faster!
 * if we alredy have something in the localstorage we fetch the data from there and display the list.
 * Last but not least we check for some search input and if it crashes somewhere in this function we print out the specific error. 
 */
async function run() {
    try {
        if(LocalStorage.length === 0) {
            let data = await getData();    
            pokemonList = await createCleanedPokemon(data);
            LocalStorage.setItem("Pokemon", JSON.stringify(pokemonList));
            debugger;
        } 
        pokemonList = await getLocalStoragePokemon();
        await displayPokemonList();
        checkForSearchInput();
    } catch (e) {
        console.log(e);
    }
}

/**
 *
 *
 * @param {*} pokemon
 * @returns
 */
function setDataField(pokemon) {
    return `<h1>${pokemon.id}</h1><img class="loading" src=${pokemon.image} alt=${pokemon.name}><h2><a href="../../templates/api/detail_page.html">${pokemon.name}</a></h2>`;
}

/**
 * This function is the opposite of the showErrorMessage function.
 * Its very simple we just grab the element and set the display to none.
 * After that we will not see the Message anymore.
 */
async function deleteErrorMessage() {
    const errorMessage = document.querySelector(".error--message");
    errorMessage.style.display = `none`;
}

/**
 *If the search function doesn't find any Pokemon in the pokemonlist, this function will be triggert.
 *First of all the function fetches the error message element and inserts a h1 element with the value of the search input.
 *Last but not least the function sets the display of the element to inline-block, so it gets visible. 
 */
function showErrorMessage() {
    const errorMessage = document.querySelector(".error--message");
    errorMessage.innerHTML = `<h1>No Matches for: ${searchInput.value}</h1>`;
    errorMessage.style.display = `inline-block`;
}

/**
 * This function is called when you first open the page and when you search for a specific pokemon, because when you first open the page the images load longer than the other content.
 * we simply remove a background image from all images, that background image is a loading screen with a pokemon theme.
 * first we are getting all the images on the screen and wait till they are fully loadet with the onload function.
 * After that we remove the loading class from all images.
 */
function waitForImage() {
    document.querySelectorAll(".loading").forEach((img) => {
        img.onload = () => {
            img.classList.remove("loading");
        }
    });
}

run();
