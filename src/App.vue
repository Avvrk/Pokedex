<script setup>
import { ref } from 'vue'

</script>

<template>
    <q-layout view="hHh lpR fFf">
        <q-header class="bg-transparent text-white" id="h">
            <q-toolbar>
                <q-fab id="circuloDesplegable" color="dark items-center" icon="keyboard_arrow_right" direction="down">
                <router-link to="/" class="router">
                    <img src="./img/juegos.png" alt="pokemon icono" style="width: 40px;">
                    <p id="p0">Pokedex</p>
                </router-link>
                <router-link to="/adivinaPokemon" class="router">
                    <img src="./img/avatar.png" alt="pokemon icono" style="width: 40px;">
                    <p id="p1">Adivina El Pokemon</p>
                </router-link>
            </q-fab>
                <q-toolbar-title class="row float-left">
                    <q-img src="./img/Logo.png" style="width: 130px; margin: 5px 0 5px 10px" />
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container id="contenido">
            <router-view/>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
* {
    text-align: center;
}

#circuloDesplegable {
    position: absolute;
    top: 70px;
}

#h {
    z-index: 1;
}

.router {
    display: flex;
    flex-direction: row;
}

#p0 {
    position: absolute;
    left: 3.5rem;
    top: 0.7rem;
    font-size: 20px;
    mix-blend-mode: difference;
}

#p1 {
    position: absolute;
    width: 180px;
    left: 3.5rem;
    top: 3.1rem;
    font-size: 20px;
    mix-blend-mode: difference;
}

/* #p1 {
    position: absolute;
    
    left: 3.5rem;
    top: 5.5rem;
    font-size: 20px;
    mix-blend-mode: difference;
} */

#contenido {
    height: 100vh;
}
</style>
