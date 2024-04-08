<script setup>
import { ref } from "vue";
import axios from "axios";

let pokemon = ref([]);

let mostrar = ref(false);

async function traerPokemon(id) {
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const infoPokemon = await axios.get(url);
        pokemon.value = infoPokemon.data;
        mostrar.value = true;
        console.log(pokemon.value);
    } catch (error) {
        console.log(error);
    }
}

(function pokemonAleatorio() {
    const pokemonA = Math.floor(Math.random() * 1025) + 1;

    traerPokemon(pokemonA)
})()

function colorTipo(tipo) {
    switch (tipo) {
        case "steel":
            return { backgroundColor: "#60a2b9", color: "#ffffff" };
        case "water":
            return { backgroundColor: "#2481ef", color: "#ffffff" };
        case "bug":
            return { backgroundColor: "#92a212", color: "#ffffff" };
        case "dragon":
            return { backgroundColor: "#4f60e2", color: "#ffffff" };
        case "electric":
            return { backgroundColor: "#fac100", color: "#ffffff" };
        case "ghost":
            return { backgroundColor: "#703f70", color: "#ffffff" };
        case "fire":
            return { backgroundColor: "#e72324", color: "#ffffff" };
        case "fairy":
            return { backgroundColor: "#ef70ef", color: "#ffffff" };
        case "ice":
            return { backgroundColor: "#3dd9ff", color: "#ffffff" };
        case "fighting":
            return { backgroundColor: "#ff8100", color: "#ffffff" };
        case "normal":
            return { backgroundColor: "#a0a2a0", color: "#ffffff" };
        case "grass":
            return { backgroundColor: "#3da224", color: "#ffffff" };
        case "psychic":
            return { backgroundColor: "#ef3f7a", color: "#ffffff" };
        case "rock":
            return { backgroundColor: "#b0aa82", color: "#ffffff" };
        case "dark":
            return { backgroundColor: "#4f3f3d", color: "#ffffff" };
        case "ground":
            return { backgroundColor: "#92501b", color: "#ffffff" };
        case "poison":
            return { backgroundColor: "#923fcc", color: "#ffffff" };
        case "flying":
            return { backgroundColor: "#82baef", color: "#ffffff" };
    }
}
</script>

<template>
    <div class="text-black" id="mainContenido" :style="mostrar == true ? colorTipo(pokemon.types[0].type.name) : ''">
        <main v-if="mostrar == true" id="contenido">
            <section class="row justify-around">
                <div v-for="(e, i) in pokemon.types" :key="i" :style="colorTipo(e.type.name)" id="tipoPokemon">
                    {{ e.type.name }}
                </div>
            </section>
            <section>
                <img :src="pokemon.sprites.other['official-artwork']['front_default']" alt="Pokemon" style="filter: brightness(0%)">
            </section>
            <section>
                <p>{{ pokemon.stats[0].stat.name }}: {{ pokemon.stats[0]['base_stat'] }}</p>
                <p>{{ pokemon.stats[1].stat.name }}: {{ pokemon.stats[1]['base_stat'] }}</p>
                <p>{{ pokemon.stats[5].stat.name }}: {{ pokemon.stats[5]['base_stat'] }}</p>
            </section>
        </main>
        <input type="text">
    </div>
</template>

<style scoped>
#mainContenido {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
    justify-content: center;
    align-items: center;
}

#contenido {
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    position: relative;
}

#contenido section {
    background-color: #ffffff;

}

img {
    max-width: 300px;
}

#contenido section:nth-child(1) {
    border-radius: 30rem 20rem 25rem 20rem;
    padding: 0 20px 0 20px;
    width: 200px;
    height: 100px;
    align-items: center;
    position: absolute;
    top: -10px;
    left: -220px;
}

#contenido section:nth-child(1) div {
    padding: 2px 10px;
    border-radius: 12px;
    height: 25px;
}

#contenido section:nth-child(2) {
    border-radius: 12rem 10rem 19rem 15rem;
    width: 500px;
    height: 350px;
}

#contenido section:nth-child(3) {
    border-radius: 23rem 43rem 32rem 47rem;
    padding: 13px 0 0 0;
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 40px;
    right: -220px;
}

#contenido section:nth-child(3) div {
    padding: 2px 10px;
    border-radius: 12px;
    height: 25px;
}

input {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
}

input:focus,
input:focus-visible {
  outline: 0;
}
</style>