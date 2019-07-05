async function createCleanedPokemon(list) {
    return list.results.map(pokemon => new Pokemon(pokemon));
}