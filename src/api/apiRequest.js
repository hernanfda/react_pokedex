export async function pokeRequest(pageOffset = 0) {
    let { results } = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${pageOffset}`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    return results;
}

export async function pokeDetails(id = 1) {
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => response.json())
        .catch((error) => console.log(error));
    return data;
}
