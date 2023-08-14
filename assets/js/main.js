const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5;
let offset = 0

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
}    

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemonItens(offset, limit)
})

/*-> SAME as below

        const listItens = []

        for (let i = 0; i < pokemons.length; i++) {
            const pokemon = pokemons[i];
            listItens.push(convertPokemonToHtml)(pokemon)
        }
        
        console.log(listItens)
    
    */
        

/* STANDARD TRY (then in this case) - CATCH - FINALLY Block
 fetch(url)
    .then(function (response) {       // FetchAPI manipulates the response - SUCCESS
        return response.json()
    })
    .then(function (jsonBody) {
        console.log(jsonBody)
    })
    .catch(function (error) {          // Catch manipulates error - FAIL
        console.error(error)
    })
    .finally(function () {
        console.log("Request concluded!")   // It does not depend on Success or Fail
    })
*/