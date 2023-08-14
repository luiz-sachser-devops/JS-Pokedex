
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types        // Type 1 is the default

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {      // List of Pokemons request
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
    .then((response) => response.json())        // Gets the response and converts to JSON
    .then((jsonBody) => jsonBody.results)       // With the list show only results of Pokemons
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // Convert list of pokemons in a new Details request
    .then((detailRequests) => Promise.all(detailRequests)) // Waits until all the promises finish
    .then((pokemonDetails) => pokemonDetails) // Gets the list converted to JSON with the relevant details
}


/* Promise.all([       // List of promises
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4')

]) .then((results) => {        // when all the promises above finish THEN give result list
    console.log(results)
})
*/