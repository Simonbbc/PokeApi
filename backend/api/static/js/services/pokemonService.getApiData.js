//get all data from json api
async function getData(currentPage) {
    const pokemonResponse = await fetch(`http://localhost:8000/api/pokemon/?page=${currentPage}`);
    return await pokemonResponse.json();
}