
// console.log("hello");
const text = "ditto";

async function fetchData(){
    const pokemonSearch = document.getElementById("pokemonSearch").value.toLowerCase();
    const displayPokemon = document.getElementById("pokemonPicture");
    try{

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearch}`);
        if(!response.ok){
            throw new Error("Could not fetch resources");
        }
        // console.log("hello");
        // console.log(response);
        const data = await response.json();
        console.log(data);
        const pokemonSprite = data.sprites.front_default;
        document.getElementById("pokeName").textContent = data.name;
        displayPokemon.src = pokemonSprite;
        displayPokemon.style.display = "block";
        document.getElementById("dexNum").textContent = "Dex ID: " + data.id;
        document.getElementById("pokeHeight").textContent = "Height: " + data.height;
        document.getElementById("pokeWeight").textContent = "Weight: " + data.weight;
        const abilities = data.abilities.map(obj => obj.ability.name).join(", ");
        document.getElementById("pokeAbi").textContent = "Abilities: " + abilities;
        return data;
    }
    catch(error){
        console.error(error);
    }

}

async function displayData(){

    try{
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000&offset=0`);
        if(!response.ok){
            throw new Error("Could not fetch resources");
        }
        // console.log("hello");
        // console.log(response);
        const data = await response.json();
        const initalPoke = data.results.map(obj => obj.name);
        const pokeLinks = data.results.map(obj => obj.url);
        // const pokeMon = await fetch(pokeLinks);
        // console.log(pokeLinks);
        //  console.log(pokeMon);
        console.log(data);
        // document.getElementById("pokeList").textContent = data.name + " " + datdocument.getElementById("pokeList").textContent = initalPoke;a.id;
        initalPoke.forEach(element => {
            const curDiv = document.getElementById("pokeList");
            const newDiv = document.createElement("div");

            newDiv.textContent = element;
            curDiv.appendChild(newDiv);
        });
        
        pokeLinks.forEach(async element =>  {
            const response = await fetch(element);
            const newData = await response.json();
            const curImg = document.getElementById("pokemonPicture");
            const newImg = document.createElement("img");

            newImg.src = newData.sprites.front_default;
            newImg.style.width = "60px";    // or 40px, 80px, whatever you prefer
            newImg.style.height = "60px";
            newImg.style.objectFit = "contain";
            newImg.style.display = "block";
            curImg.style.display = "block";
            curImg.appendChild(newImg);

        })

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
