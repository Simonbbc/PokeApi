/**
 *
 *
 * @returns a parsed list from the localstorage
 */
function getLocalStoragePokemon() {
    return JSON.parse(LocalStorage.getItem("Pokemon"));
}