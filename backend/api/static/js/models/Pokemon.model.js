/**
 *
 *
 * @param {*} pokemon
 */
function Pokemon(pokemon) {
    this.id = pokemon.number;
    this.name = pokemon.name;
    this.image = pokemon.image;
    this.description = pokemon.description;
    this.evolution = pokemon.evolutions;
}