//get all data from json api
async function getData() {
    const pokemonResponse = await fetch(`http://localhost:8000/api/pokemon/`);
    return await pokemonResponse.json();
}