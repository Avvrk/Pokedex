<script setup>
import { ref } from "vue";
import axios from "axios";

let pokemon = ref([]);
let pokemonEnTexto = ref('');

let mostrar = ref(false);

async function traerPokemon(id_o_nombre) {
    try {
        let url;
        if (parseInt(id_o_nombre) === id_o_nombre) {
            url = `https://pokeapi.co/api/v2/pokemon/${id_o_nombre}`
        } else {
            url = `https://pokeapi.co/api/v2/pokemon/${id_o_nombre.toLowerCase()}`
        }
        const infoPokemon = await axios.get(url);
        pokemon.value = infoPokemon.data;
        mostrar.value = true;
    } catch (error) {
        console.log(error);
    }
}

function pokemonAleatorio() {
    const pokemonA = Math.floor(Math.random() * 1025) + 1;

    traerPokemon(pokemonA)
}

function pokemonPersonalizado() {
    const pokemonName = pokemonEnTexto.value.trim();

    traerPokemon(pokemonName);
}

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

function colorBarra(tipo) {
    /*     switch (tipo) {
        case 'hp':
            return { color: '#21BA45'};
        case 'attack':
            return { color: '#C10015'};
        case 'defense':
            return { color: '#1976D2'};
        case 'special-attack':
            return { color: '#9C27B0'};
        case 'special-defense':
            return { color: '#31CCEC'};
        case 'speed':
            return { color: '#F2C037'};
    } */

    switch (tipo) {
        case "hp":
            return { color: "#FFA500" };
        case "attack":
            return { color: "#FF0000" };
        case "defense":
            return { color: "#0000FF" };
        case "special-attack":
            return { color: "#800080" };
        case "special-defense":
            return { color: "#FFFF00" };
        case "speed":
            return { color: "#00FF00" };
    }
}
</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-transparent text-white">
            <q-toolbar>
                <q-toolbar-title class="row float-left">
                    <q-img src="./img/Logo.png" style="width: 130px; margin: 5px 0 5px 10px" />
                </q-toolbar-title>
                <q-div id="cositasHeader">
                    <p id="señal">Por favor, asegúrate de escribir el nombre o la ID del personaje correctamente para evitar errores.</p>
                    <input type="text" v-model="pokemonEnTexto" @input="pokemonPersonalizado()" placeholder="Escribe aqui el nombre o la ID">
                    <button @click="pokemonAleatorio()">¡Sorprendeme!</button>
                </q-div>
            </q-toolbar>
        </q-header>
        <q-page-container class="row flex-center" :style="mostrar == true ? colorTipo(pokemon.types[0].type.name) : ''" style="height: 100vh;">
            <q-card flat bordered id="card1" v-if="mostrar" :style="colorTipo(pokemon.types[0].type.name)">
                <q-card-section id="contenedorImgPokemon">
                    <img id="imgPrincipal" :src="pokemon.sprites.other.home['front_default']" alt="Pokemon" />
                </q-card-section>
                <q-card-section id="infoPKM">
                    <div class="text-h4 text-capitalize" style="color: black">
                        {{ pokemon.name }}
                    </div>
                    <q-card-section class="row justify-around">
                        <div v-for="(e, i) in pokemon.types" :key="i" :style="colorTipo(e.type.name)" id="tipoPokemon">
                            {{ e.type.name }}
                        </div>
                    </q-card-section>
                </q-card-section>
                <div>
                    <img :src="pokemon.sprites.other['showdown']['front_default']
                    " alt="Pokemon" />
                    <img :src="pokemon.sprites.other['showdown']['back_default']" alt="Pokemon" />
                </div>
            </q-card>
            <div id="card2Padre" v-if="mostrar" :style="colorTipo(pokemon.types[0].type.name)">
                <q-card flat bordered id="card2">
                    <div class="q-pa-md" id="card2H">
                        <label :for="`ID${i}`" :id="`ID${i}`" style="color: black" v-for="(e, i) in pokemon.stats" :key="i">{{
                    e.stat.name }}
                            <q-linear-progress :id="`ID${i}`" :value="Number(`0.${e.base_stat}`)"
                                :style="colorBarra(e.stat.name)" rounded size="15px" />
                            <!-- :buffer="Number(`0.${e.base_stat + 10 <= 100 ? e.base_stat : e.base_stat + 10 <= 70 ? e.base_stat + 4 : e.base_stat + 15}`)" -->
                        </label>
                        <q-card-section class="row justify-around">
                            <div style="color: black" class="column">
                                <p class="pokemonInfo">{{ pokemon.weight }}</p>
                                <p class="pokemonNombreInfo">Weight</p>
                            </div>
                            <div style="color: black">
                                <p class="pokemonInfo">{{ pokemon.height }}</p>
                                <p class="pokemonNombreInfo">Height</p>
                            </div>
                        </q-card-section>
                    </div>
                </q-card>
            </div>
            <p v-if="mostrar == false">C:</p>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
* {
    text-align: center;
}

button {
    background-color: #000000;
    font-size: 15px;
    padding: 9px 18px 9px 18px;
    border-radius: 8px;
}

input {
    background-color: #000000;
    font-size: 15px;
    padding: 9px 18px 9px 18px;
    border-radius: 8px;
    border: 0;
    width: 20rem;
}

#cositasHeader {
    position: relative;
    display: flex;
    gap: 10rem;
}

#señal {
    position: absolute;
    width: 306px;
    right: 41rem;
    opacity: 0.6;
}

#infoPKM {
    width: 20rem;
    border-radius: 20rem 10rem 20rem 10rem;
    margin: 0 0 10px 0;
    border: 0;
    background-color: #ffffff;
}

#card1 {
    width: 20rem;
    border-radius: 0;
    border: 0;
}

#card2Padre {
    background-color: #ffffff;
}

#card2 {
    width: 40rem;
    padding: 0 30px 0 50px;
    border-radius: 9rem 15rem 10rem 20rem;
    border: 0;
}

#card2 div {
    margin-top: 5px;
    margin-bottom: 10px;
}

#card2H {
    padding: 20px 30px 0 20px;
    margin: 0 0 0 0;
}

#imgPrincipal {
    width: 200px;
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
}

#tipoPokemon {
    padding: 2px 10px 2px 10px;
    border-radius: 12px;
}

.pokemonInfo {
    font-weight: 700;
    margin: 0;
    font-size: 20px;
    color: #000000;
}

.pokemonNombreInfo {
    font-weight: 500;
    margin: 0;
    font-size: 15px;
    color: #353535;
}

@media (max-width: 1185px) {
    #señal {
        right: 19.05rem;
        top: 3.5rem;
    }
}
</style>
