//some global variables
let pokemonDisplayList = document.querySelector(".pokemon--list");
let paginationButtons = document.querySelectorAll(".pagination-button");
let displayList = {
    currentPage: 1
};
let searchInput = document.querySelector(".search--input");

window.onload = function() {
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', async function () {
            if(index === 0) {
                if(displayList.currentPage > 1){
                    displayList.currentPage -= 1;
                    let data = await getData(displayList.currentPage);
                    pokemonList = await createCleanedPokemon(data);
                    changeCurrrentSite();
                    displayPokemonList();   
                }
            } else if(index === 1) {
                if(displayList.currentPage < 36) {
                    displayList.currentPage += 1;
                    let data = await getData(displayList.currentPage);
                    pokemonList = await createCleanedPokemon(data);
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

async function displayPokemonList() {
    await clearDisplayList();
    for(let i = 0; i < pokemonList.length; i++) {
        let dataField = await createListItem();
        dataField.innerHTML = setDataField(pokemonList[i]);
        await waitForImage();
    }
}

function clearDisplayList() {
    const displayList = document.querySelectorAll(".list--item");
    if(displayList.length > 0) {
        displayList.forEach((listItem, index) => {
            listItem.remove();
        });
    }
}

async function run() {
    try { 
        if(LocalStorage.length === 0) {
            let data = await getData(displayList.currentPage);    
            pokemonList = await createCleanedPokemon(data);
            LocalStorage.setItem("Pokemon", JSON.stringify(pokemonList));
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
    return `<h1>${pokemon.id}</h1><img class="loading" src=${pokemon.image} alt=${pokemon.name}><h2><a href="{% url 'detail_view' pk=${pokemon.id} %}">${pokemon.name}</a></h2>`;
}

async function deleteErrorMessage() {
    const errorMessage = document.querySelector(".error--message");
    errorMessage.style.display = `none`;
}

function showErrorMessage() {
    const errorMessage = document.querySelector(".error--message");
    errorMessage.innerHTML = `<h1>No Matches for: ${searchInput.value}</h1>`;
    errorMessage.style.display = `inline-block`;
}

function waitForImage() {
    document.querySelectorAll(".loading").forEach((img) => {
        img.onload = () => {
            img.classList.remove("loading");
        }
    });
}

run();
