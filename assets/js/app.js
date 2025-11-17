
// console.log("hello");
const text = "ditto";

async function fetchData(){
    const pokemonSearch = document.getElementById("pokemonSearch").value.toLowerCase();
    try{

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`);
        if(!response.ok){
            throw new Error("Could not fetch resources");
        }
        // console.log("hello");
        // console.log(response);
        const data = await response.json();
        console.log(data);

        return data;
    }
    catch(error){
        console.error(error);
    }
}

// async function pokemonSearch(){
//     const response = await fetchData();
//     const pokemonSearch = document.getElementById("pokemonSearch").value.toLowerCase();
//     const displayPokemon = document.getElementById("Name");

//     displayPokemon.textContent = response.name;

// }

// fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
//     .then(response => {

//         if(!response.ok){
//             throw new Error("could not fetch resourse");
//         }
//         return response.json();
//     })
//     .then(data => console.log(data.name))
//     .catch(error => console.error(error));
