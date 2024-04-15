<script setup>
import { ref } from "vue";
import axios from "axios";
import confetti from "canvas-confetti";

let pokemon = ref([]);
let respuesta = ref("");
let adivino = ref("no");

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

	traerPokemon(pokemonA);
})();

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
			return { backgroundColor: "#FFA500", color: "#ffffff" };
		case "attack":
			return { backgroundColor: "#FF0000", color: "#ffffff" };
		case "defense":
			return { backgroundColor: "#0000FF", color: "#ffffff" };
		case "special-attack":
			return { backgroundColor: "#800080", color: "#ffffff" };
		case "special-defense":
			return { backgroundColor: "#FFFF00", color: "#ffffff" };
		case "speed":
			return { backgroundColor: "#00FF00", color: "#ffffff" };
	}
}

function lanzarConfeti() {
	let duracion = 15 * 1000;
	let finAnimacion = Date.now() + duracion;
	let inclinacion = 1;

	function rangoRandom(min, max) {
		return Math.random() * (max - min) + min;
	}

	function colorRandom() {
		const colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];
		const randomIndice = Math.floor(Math.random() * colors.length);
		return colors[randomIndice];
	}

	(function frame() {
		var tiempoRestante = finAnimacion - Date.now();
		var ticks = Math.max(200, 500 * (tiempoRestante / duracion));
		inclinacion = Math.max(0.8, inclinacion - 0.001);

		confetti({
			particleCount: 1,
			startVelocity: 0,
			ticks: ticks,
			origin: {
				x: Math.random(),
				// since particles fall down, skew start toward the top
				y: Math.random() * inclinacion - 0.2,
			},
			colors: [colorRandom()],
			shapes: ["circle"],
			gravity: rangoRandom(0.4, 0.6),
			scalar: rangoRandom(0.4, 1),
			drift: rangoRandom(-0.4, 0.4),
		});

		if (tiempoRestante > 0) {
			requestAnimationFrame(frame);
		}
	})();
}

function verificar() {
	if (respuesta.value.toLowerCase() == pokemon.value.name) {
		adivino.value = "si";
		lanzarConfeti();
		console.log("Si es");
	} else {
		console.log("No es");
	}
}
</script>

<template>
	<div class="text-black" id="mainContenido" :style="mostrar == true ? colorTipo(pokemon.types[0].type.name) : ''">
		<main v-if="mostrar == true" id="contenido">
			<section class="row justify-around">
				<div v-for="(e, i) in pokemon.types" :key="i" :style="colorTipo(e.type.name)">
					{{ e.type.name }}
				</div>
			</section>
			<section>
				<img :src="pokemon.sprites.other['official-artwork']['front_default']" alt="Pokemon" :style="adivino == 'si' ? '' : 'filter: brightness(0%)'" />
			</section>
			<section>
				<p :style="colorBarra(pokemon.stats[0].stat.name)">{{ pokemon.stats[0].stat.name }}: {{ pokemon.stats[0]["base_stat"] }}</p>
				<p :style="colorBarra(pokemon.stats[1].stat.name)">{{ pokemon.stats[1].stat.name }}: {{ pokemon.stats[1]["base_stat"] }}</p>
				<p :style="colorBarra(pokemon.stats[5].stat.name)">{{ pokemon.stats[5].stat.name }}: {{ pokemon.stats[5]["base_stat"] }}</p>
			</section>
		</main>
		<div>
			<input type="text" v-model="respuesta" />
			<input type="button" @click="verificar()" value="Verificar" />
		</div>
	</div>
</template>

<style scoped>
#mainContenido {
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 50px;
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
	padding: 30px 0 0 0;
	width: 500px;
	height: 350px;
}

#contenido section:nth-child(3) {
	border-radius: 23rem 43rem 32rem 47rem;
	padding: 15px 0 0 0;
	width: 200px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: absolute;
	bottom: 40px;
	right: -220px;
}

#contenido section:nth-child(3) p {
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

#mainContenido div {
	display: flex;
	flex-direction: row;
	gap: 20px;
}
</style>
