async function checkForSearchInput() {
    searchInput.addEventListener('keyup', async event => {
        debugger;
        let filteredList = pokemonList.filter(pokemon => pokemon.name.toUpperCase().includes(searchInput.value.toUpperCase()));
        if(filteredList.length > 0 && filteredList.length < 721) {
            await deleteErrorMessage();
            await clearDisplayList();
            for(let i = 0; i < filteredList.length; i++) {
                let dataField = await createListItem();
                dataField.innerHTML = setDataField(filteredList[i]);
                await waitForImage();
            }
        } else if(filteredList.length === 0) {
            await clearDisplayList();
            showErrorMessage();
        //We add this case to prevent loading 721 pokemon objects.
        } else {
            await deleteErrorMessage();
            displayPokemonList();
        }

    });
}