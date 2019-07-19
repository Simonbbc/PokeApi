async function createCleanedPokemon(list) {
    return list.map(pokemon => new Pokemon(pokemon));
}