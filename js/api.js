var timer;
var isLoading = false;

document.getElementById('pokemon').addEventListener('keyup', (element) => {

    if(!isLoading && element.target.value){
        let img = document.getElementById('pokemonImg');
        img.src = "../images/loading.gif";
        isLoading = true;
    }

    let pokemon = element.target.value.toLowerCase();
    clearTimeout(timer);
    if(pokemon) { timer = setTimeout(() => pokesearch(pokemon), 1000); }
})

const pokesearch = async (pokemon) => {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    let img = document.getElementById('pokemonImg');
    let name = document.getElementById('pokemonName');
    let number = document.getElementById('pokemonNumber');
    // Error handling
    if(response.status !== 200){
        // 404
        if(response.status == 404) {
            name.innerText = "Not found";
            number.innerText = "No. ???";
            img.src = "../images/pixel-pokeball.png";
        }

    }else{ // SUCCESS
        let data = await response.json();
        name.innerText = data.name.toUpperCase();
        number.innerText = `No. ${data.id}`;
        img.src = data.sprites.front_default;
    }
    isLoading = false;
}