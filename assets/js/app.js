
// console.log("hello");
const text = "ditto";
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        const pokemonSprite = data.sprites.front_default;
        document.getElementById("pokeName").textContent = data.name;
        displayPokemon.src = pokemonSprite;
        displayPokemon.style.display = "block";
        document.getElementById("dexNum").textContent = "Dex ID: " + data.id;
        document.getElementById("pokeHeight").textContent = "Height: " + data.height;
        document.getElementById("pokeWeight").textContent = "Weight: " + data.weight;
        const abilities = data.abilities.map(obj => obj.ability.name).join(", ");
        document.getElementById("pokeAbi").textContent = "Abilities: " + abilities;
        
        const abiDesc = data.abilities.map(obj => obj.ability.url);

    
        // for(i = 0; i < abiDesc.length; i++){
        //     const newDesc = await fetch(abiDesc[i].url);
        //     const newData = await newDesc.json();
        //     console.log(newData.effect_entries.effect)
        //     document.getElementById("abiDesc").textContent = newData.effect_entries.effect
        // }
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
        const pokeLinks = data.results.sort((a, b) => {
            const idA = parseInt(a.url.split("/")[6]);
            const idB = parseInt(b.url.split("/")[6]);
            return idA - idB;
        });

        
        // const pokeMon = await fetch(pokeLinks);
        // console.log(pokeLinks);
        //  console.log(pokeMon);
        // document.getElementById("pokeList").textContent = data.name + " " + datdocument.getElementById("pokeList").textContent = initalPoke;a.id;
        // initalPoke.forEach(element => {
        //     const curDiv = document.getElementById("pokeList");
        //     const newDiv = document.createElement("div");

        //     newDiv.textContent = element;
        //     curDiv.appendChild(newDiv);
        // });
        const container = document.getElementById("pokeList");

        for(let i = 0; i < pokeLinks.length; i++) {
            // await sleep(100);

            const response = await fetch(pokeLinks[i].url);
            const newData = await response.json();

            
            const card = document.createElement("div");
            card.classList.add("pokemon-card");

            console.log(newData);
            // const curDiv = document.getElementById("pokeList");
            const newDiv = document.createElement("p");

            newDiv.textContent = newData.name;
            // curDiv.appendChild(newDiv);

            // const curImg = document.getElementById("pokePic");
            const newImg = document.createElement("img");

            newImg.src = newData.sprites.front_default;
            
            // newImg.style.width = "80px";     // 🔥 shrink so they fit side-by-side
            // newImg.style.height = "80px";
            // newImg.style.margin = "4px";
            newImg.style.display = "block";

            card.appendChild(newDiv);
            card.appendChild(newImg);

            container.appendChild(card);
            // curImg.appendChild(newImg);

        }

        return data;
    }
    catch(error){
        console.error(error);
    }
}

displayData();



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
