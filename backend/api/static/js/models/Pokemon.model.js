/**
 * This is our Pokemon model.
 * it gets its values from the passed JSON object.
 * @param {*} pokemon JSON object
 */
function Pokemon(pokemon) {
    this.id = pokemon.number;
    this.name = pokemon.name;
    this.image = pokemon.image;
    this.description = pokemon.description;
    this.evolution = pokemon.evolutions;
}